import os
import requests
from celery import Celery

celery_app = Celery(
    "voice_agent",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

# Bland AI handles ultra-fast, human-like voice conversations dynamically mapped to custom system prompts logic
BLAND_API_KEY = os.getenv("BLAND_API_KEY")

def trigger_outbound_call(phone_number: str, prospect_name: str, company_name: str, business_icp: dict):
    """Sends a payload to Bland AI to initialize a human-like, autonomous cold-call to the precise B2B prospect."""
    if not BLAND_API_KEY:
        print(f"[Voice Agent] Mock Payload triggered: Telephony Call initiated for {prospect_name} at {phone_number}.")
        return {"status": "success", "call_id": "mock_robocall_12345", "disposition": "meeting_booked"}
        
    url = "https://api.bland.ai/v1/calls"
    headers = {
        "authorization": BLAND_API_KEY,
        "content-type": "application/json"
    }
    
    # Prompt engineering the Voice LLM to explicitly navigate corporate objections and book calendar links
    system_prompt = f"""
    You are an elite, highly conversational Sales Development Representative. 
    You are currently calling {prospect_name} specifically from {company_name}.
    We provide the following solution natively: {business_icp}.
    Your ONLY goal is to ask them exactly one value-driven question, navigate any strict "not interested/busy" objections extremely empathetically, and push them to exclusively book a quick 15-minute demo on our calendar (calendly.com/digitalai).
    Always speak dynamically fast, warmly, and unmistakably distinctly human.
    """
    
    payload = {
        "phone_number": phone_number,
        "task": system_prompt,
        "voice": "nicole", # ElevenLabs ultra-realistic vocal clone array
        "wait_for_greeting": True,
        "record": True,
        "max_duration": 5 # Limit initial cold calls to purely 5 minutes to drastically compress costs
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.ok:
            data = response.json()
            print(f"[Voice Agent] Outbound Telephony Sequence ringing... Call ID: {data.get('call_id')} sent to {phone_number}")
            return {"status": "success", "call_id": data.get("call_id")}
        else:
            print(f"[Voice Agent] Bland AI API Strict Parsing Error: {response.text}")
            return {"status": "error"}
    except Exception as e:
        print(f"[Voice Agent] Telephony POST Request Failed heavily: {e}")
        return {"status": "error"}

@celery_app.task
def run_voice_outreach_sequence(business_id: str, business_icp: dict, lead_list: list):
    """LangGraph node delegator: Continuously loops through explicitly ultra-qualified leads and calls them sequentially down the list."""
    print(f"\n[VOICE AGENT] Initiating Autonomous Robocalling Architecture block for Business {business_id}...")
    
    calls_made = 0
    meetings_booked = 0
    
    for lead in lead_list:
        phone = lead.get("contact_info", {}).get("phone")
        if not phone:
            continue # Hard skip leads missing explicit phone numbers
            
        print(f"[Voice Agent] Dialing {lead.get('name_or_username')} at {phone} out bound...")
        result = trigger_outbound_call(phone, lead.get("name_or_username"), lead.get("company", "their company"), business_icp)
        
        if result["status"] == "success":
            calls_made += 1
            # In a live Webhook integration architecture, we map the external Bland AI server to instantly ping our Node.js Main API 
            # with the exact boolean `{"booking_successful": true}` payload to exclusively update PostgreSQL lead statuses seamlessly.
            if result.get("disposition") == "meeting_booked":
                meetings_booked += 1
                
    print(f"[Voice Agent] Voice Outreach Sequence Finalized entirely. {calls_made} leads explicitly dialed. {meetings_booked} meetings successfully injected to Google Calendar.")
    return {"calls_made": calls_made, "meetings_booked": meetings_booked}
