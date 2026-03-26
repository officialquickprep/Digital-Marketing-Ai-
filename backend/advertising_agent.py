import os
import requests
from celery import Celery

celery_app = Celery(
    "advertising_agent",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

META_ACCESS_TOKEN = os.getenv("META_ACCESS_TOKEN")
AD_ACCOUNT_ID = os.getenv("META_AD_ACCOUNT_ID", "act_123456789")
GRAPH_API_VERSION = "v20.0"
BASE_URL = f"https://graph.facebook.com/{GRAPH_API_VERSION}/{AD_ACCOUNT_ID}"

def create_campaign(business_name: str):
    """Creates a new automated Meta Ads Campaign."""
    if not META_ACCESS_TOKEN:
        print("[Ads Agent] Mocking Campaign Creation (No Meta Token detected)")
        return "mock_campaign_id_123"
        
    payload = {
        "name": f"AI Auto-Campaign - {business_name}",
        "objective": "OUTCOME_LEADS",
        "status": "PAUSED", # Always start paused for safety against unauthorized spend
        "special_ad_categories": "[]",
        "access_token": META_ACCESS_TOKEN
    }
    
    try:
        response = requests.post(f"{BASE_URL}/campaigns", data=payload)
        if response.ok:
            return response.json().get("id")
        else:
            print(f"[Ads Agent] Campaign API Error: {response.text}")
            return None
    except Exception as e:
        print(f"[Ads Agent] Network Error: {e}")
        return None

def create_ad_set(campaign_id: str, location: str, daily_budget_cents: int = 500):
    """Creates an Ad Set with strict budget limits and geo-targeting."""
    if not META_ACCESS_TOKEN:
        return "mock_adset_id_123"
        
    payload = {
        "campaign_id": campaign_id,
        "name": f"AI Highly Targeted - {location}",
        "daily_budget": daily_budget_cents, # Hardcoded safe limit: 500 cents ($5.00/day)
        "billing_event": "IMPRESSIONS",
        "optimization_goal": "REACH",
        "bid_amount": 20,
        "targeting": f'{{"geo_locations": {{"cities": [{{"name": "{location}"}}]}}}}',
        "status": "PAUSED",
        "access_token": META_ACCESS_TOKEN
    }
    
    response = requests.post(f"{BASE_URL}/adsets", data=payload)
    return response.json().get("id") if response.ok else None

def create_ad_creative(image_url: str, caption: str, page_id: str):
    """Links the Content Agent's DALL-E image and LLM caption into a Meta Ad Creative."""
    if not META_ACCESS_TOKEN:
        return "mock_creative_id_123"
        
    payload = {
        "name": f"AI Creative Gen - {caption[:20]}",
        "object_story_spec": {
            "page_id": page_id,
            "photo_data": {
                "url": image_url,
                "caption": caption
            }
        },
        "access_token": META_ACCESS_TOKEN
    }
    
    response = requests.post(f"{BASE_URL}/adcreatives", json=payload)
    return response.json().get("id") if response.ok else None

@celery_app.task
def launch_automated_ads(business_id: str, business_name: str, location: str, approved_content: list, page_id: str):
    """Main Orchestrator task to execute a full ad funnel."""
    print(f"[Ads Agent] Initiating Meta Ads launch architecture for {business_name}...")
    
    # 1. Create Campaign
    campaign_id = create_campaign(business_name)
    if not campaign_id:
        return {"success": False, "error": "Campaign creation failed."}
        
    # 2. Create Safety-Capped Ad Set ($5/day)
    adset_id = create_ad_set(campaign_id, location, 500)
    
    # 3. Compile Ad Creatives from Content Agent Drafts
    creative_ids = []
    for content in approved_content:
        # Expecting content dict to have 'media_url' and 'body'
        creative_id = create_ad_creative(content['media_url'], content['body'], page_id)
        if creative_id:
            creative_ids.append(creative_id)
            
    print(f"[Ads Agent] Successfully drafted 1 Campaign, 1 AdSet, and {len(creative_ids)} Creatives.")
    print("[Ads Agent] Kept in PAUSED state. Dashboard UI requires human-in-the-loop to trigger LIVE mode.")
    return {"success": True, "campaign_id": campaign_id, "adset_id": adset_id, "creatives": creative_ids}
