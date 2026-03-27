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

def get_adset_performance(adset_id: str):
    """Hits Meta Graph API Insights directly to retrieve real-time Spend and Purchase ROAS metrics."""
    if not META_ACCESS_TOKEN:
        import random
        # Mock production response data if Meta Token isn't provided locally
        return {"spend": round(random.uniform(5.0, 30.0), 2), "roas": round(random.uniform(0.5, 4.0), 2)}
        
    url = f"https://graph.facebook.com/{GRAPH_API_VERSION}/{adset_id}/insights"
    params = {
        "fields": "spend,purchase_roas",
        "date_preset": "last_7d",
        "access_token": META_ACCESS_TOKEN
    }
    try:
        response = requests.get(url, params=params)
        if response.ok and response.json().get('data'):
            data = response.json()['data'][0]
            spend = float(data.get('spend', 0))
            
            # Extract ROAS from Meta's complex array payload securely
            roas_list = data.get('purchase_roas', [])
            roas = float(roas_list[0]['value']) if roas_list else 0.0
            return {"spend": spend, "roas": roas}
        return {"spend": 0.0, "roas": 0.0}
    except Exception as e:
        print(f"[Ads Agent] Advanced Insights Parsing Error: {e}")
        return {"spend": 0.0, "roas": 0.0}

def pause_adset(adset_id: str):
    """Executes a hard-stop POST request to Meta to instantly pause an underperforming Ad Set."""
    if not META_ACCESS_TOKEN:
        print(f"[Ads Agent] Auto-Kill System Mock triggered: Graph API paused AdSet {adset_id} securely.")
        return True
        
    url = f"https://graph.facebook.com/{GRAPH_API_VERSION}/{adset_id}"
    payload = {"status": "PAUSED", "access_token": META_ACCESS_TOKEN}
    try:
        response = requests.post(url, data=payload)
        return response.ok
    except:
        return False

@celery_app.task
def monitor_and_optimize_ads(active_adsets: list):
    """Cron-triggered background sweeper (runs 2x daily) to automatically isolate and kill negative ROAS ad sets."""
    print(f"[Ads Agent] Initiating Advanced Autonomous ROAS sweep globally across connected accounts...")
    
    paused_count = 0
    for adset_id in active_adsets:
        metrics = get_adset_performance(adset_id)
        spend = metrics["spend"]
        roas = metrics["roas"]
        
        print(f"[Ads Agent] Analyzing Live AdSet {adset_id[-5:]} -> Spend: ${spend:.2f} | ROAS: {roas}x")
        
        # CRITICAL AUTO-KILL LOGIC THRESHOLDS:
        # Prevent runaway budgets: If the algorithm has spent > $15 and failed to breach a 2.0x return
        if spend > 15.00 and roas < 2.0:
            print(f"   [!!!] ALGORITHMIC AUTO-KILL TRIGGERED for {adset_id}. Severing budget allocation immediately.")
            success = pause_adset(adset_id)
            if success:
                paused_count += 1
                # db.query(Ad).filter(id=adset_id).update({"status": "paused_by_ai"})
                
    print(f"[Ads Agent] Global Sweep Complete. Autonomously neutralized {paused_count} cash-burning Ad Sets.")
    return {"paused_adsets": paused_count}
