import os
import requests
from openai import OpenAI
from celery import Celery

celery_app = Celery(
    "discovery_agent",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "mock_key"))

def search_google_places(query: str, location: str):
    """Hits the Google Places API to find businesses or customers."""
    api_key = os.getenv("GOOGLE_PLACES_API_KEY")
    if not api_key:
        print("[Discovery Agent] Mocking Google Places API Response")
        return [{"name": "Mock Gym 1", "address": "Jubilee Hills"}, {"name": "Mock Gym 2", "address": "Banjara Hills"}]

    # Real implementation would be here
    endpoint = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}+in+{location}&key={api_key}"
    response = requests.get(endpoint)
    return response.json().get('results', [])

def search_instagram_apify(profile_keywords: str):
    """Hits Apify Instagram Scraper to find targeted social leads."""
    apify_token = os.getenv("APIFY_TOKEN")
    if not apify_token:
        print("[Discovery Agent] Mocking Apify Instagram Response")
        return [{"username": "fitness_junkie99", "bio": "Lover of all things health."}]
        
    # Real Apify implementation here
    return []

def score_lead(lead_data: dict, business_icp: dict):
    """Uses LLM to evaluate if a discovered lead matches the business ICP. Returns 0-100."""
    prompt = f"""
    You are an expert Lead Scoring AI.
    Business ICP: {business_icp}
    Discovered Lead Data: {lead_data}
    
    Analyze how perfectly this lead matches the ideal customer profile.
    Output ONLY a JSON object with two keys:
    1. 'score' (integer 0-100)
    2. 'reason' (short 1 sentence string)
    """
    
    if os.getenv("OPENAI_API_KEY"):
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a precise scoring generator outputting JSON."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            import json
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            return {"score": 0, "reason": f"Error: {str(e)}"}
            
    return {"score": 85, "reason": "Mocked match based on generic keywords."}

@celery_app.task
def run_discovery_loop(business_id: str, icp_data: dict, location: str):
    """Background task that finds, scores, and saves leads."""
    print(f"[Discovery Agent] Starting search loop for {business_id}...")
    
    # 1. Google Places
    places = search_google_places("competitors", location)
    
    # 2. Instagram
    ig_leads = search_instagram_apify("gym goer")
    
    all_leads = places + ig_leads
    scored_leads = []
    
    for lead in all_leads:
        score_data = score_lead(lead, icp_data)
        if score_data.get('score', 0) > 70:
            lead['ai_score'] = score_data['score']
            lead['ai_reason'] = score_data['reason']
            scored_leads.append(lead)
            
    print(f"[Discovery Agent] Found {len(scored_leads)} Highly Qualified Leads!")
    
    # Next step: Save securely to PostgreSQL
    return scored_leads
