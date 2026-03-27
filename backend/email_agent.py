import os
import requests
from openai import OpenAI
from celery import Celery

celery_app = Celery(
    "email_agent",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "mock_key"))
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("SENDER_EMAIL", "outreach@digitalai.io")

def draft_personalized_email(business_icp: dict, lead_data: dict):
    """Uses OpenAI to dynamically author a hyper-personalized B2B cold email integrating the lead's raw LinkedIn data."""
    prompt = f"""
    You are an elite B2B Sales Development Representative (SDR).
    Our Business Profile (What we sell): {business_icp}
    Target Prospect Data (Who we are emailing): {lead_data}
    
    Write a highly-converting, concise Cold Email to this very specific prospect.
    CRITICAL INSTRUCTIONS:
    - Inject their exact first name.
    - Specifically mention their exact job title and company extracted from their LinkedIn data.
    - Mention their latest pain point indirectly using an empathetic hook.
    - Provide a short Call To Action (CTA).
    - Keep it strictly under 150 words.
    
    Output ONLY a strictly valid JSON object: {{"subject": "catchy personalized subject", "body": "email HTML body formatted cleanly"}}
    """
    if not os.getenv("OPENAI_API_KEY"):
        return {"subject": f"Quick Question for {lead_data.get('name_or_username', 'you')}", "body": "Hey, loved your background. Are you open to scaling your business?"}
        
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You exclusively return JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        import json
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"[Email Agent] LLM Outbound Draft Error: {e}")
        return {"subject": "Scaling your brand", "body": f"Would love to connect regarding your role at {lead_data.get('company', 'your company')}."}

def send_via_sendgrid(to_email: str, subject: str, html_body: str):
    """Transmits the compiled email cleanly via SendGrid REST API."""
    if not SENDGRID_API_KEY:
        print(f"[Email Agent] Development Mock Executed! Bypassing actual SendGrid transmission to -> {to_email}")
        print(f"----------\nSubject: {subject}\nBody: {html_body[:50]}...\n----------")
        return True # Resolves immediately for local testing logic
        
    url = "https://api.sendgrid.com/v3/mail/send"
    headers = {
        "Authorization": f"Bearer {SENDGRID_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "personalizations": [{"to": [{"email": to_email}]}],
        "from": {"email": FROM_EMAIL},
        "subject": subject,
        "content": [{"type": "text/html", "value": html_body}]
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.ok:
            return True
        else:
            print(f"[Email Agent] SendGrid Rejected Payload: {response.text}")
            return False
    except Exception as e:
        print(f"[Email Agent] SendGrid Network/Transport Error: {e}")
        return False

@celery_app.task
def run_email_outreach_sequence(business_id: str, business_icp: dict, lead_list: list):
    """Autonomous Background Celery task tracking qualified leads, drafting emails, and physically routing them through SendGrid."""
    print(f"[Email Agent] Initiating Outbound Sequence Engine for Business: {business_id}...")
    
    contacted_count = 0
    for lead in lead_list:
        if not lead.get("email"):
            continue # Safe-guard bypass missing emails
            
        print(f"[Email Agent] LLM rapidly drafting highly specialized cold copy for {lead['email']}...")
        draft = draft_personalized_email(business_icp, lead)
        
        # Dispatch the payload
        success = send_via_sendgrid(lead['email'], draft.get("subject", ""), draft.get("body", ""))
        
        if success:
            contacted_count += 1
            # In production PostgreSQL ORM logic, transition state securely to lock out double-drips:
            # db.query(Lead).filter(id=lead['id']).update({"status": "contacted"})
            
    print(f"[Email Agent] Sequence Complete. Sent {contacted_count} highly-personalized autonomous cold emails via SendGrid.")
    return {"status": "success", "contacted_count": contacted_count}
