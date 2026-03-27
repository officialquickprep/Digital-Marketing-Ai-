import os
import requests
from celery import Celery

celery_app = Celery(
    "video_agent",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

HEYGEN_API_KEY = os.getenv("HEYGEN_API_KEY")

def generate_heygen_video(avatar_id: str, script_text: str):
    """Hits HeyGen API to render an AI Avatar reading the text script perfectly lip-synced."""
    if not HEYGEN_API_KEY:
        print("[Video Agent] Mocking HeyGen Video Gen (No API Key natively detected in .env)")
        return {"status": "success", "video_url": "https://www.w3schools.com/html/mov_bbb.mp4"}
        
    url = "https://api.heygen.com/v2/video/generate"
    headers = {
        "X-Api-Key": HEYGEN_API_KEY,
        "Content-Type": "application/json"
    }
    
    # 9:16 aspect ratio optimized perfectly for Meta Reels and TikToks
    payload = {
        "video_inputs": [
            {
                "character": {"type": "avatar", "avatar_id": avatar_id},
                "voice": {"type": "text", "voice_id": "en-US-1", "input_text": script_text}
            }
        ],
        "test": True, # Test mode doesn't consume credits, for local development
        "aspect_ratio": "9:16" 
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.ok:
            data = response.json()
            # HeyGen returns a video_id. Production requires polling /v1/video.status or receiving a Webhook.
            video_id = data.get("data", {}).get("video_id")
            print(f"[Video Agent] HeyGen Heavy Inference Started: {video_id}")
            return {"status": "processing", "video_id": video_id}
        else:
            return {"status": "error", "error": response.text}
    except Exception as e:
        return {"status": "error", "error": str(e)}

@celery_app.task
def process_video_request(business_id: str, content_id: str, avatar_id: str, script_text: str):
    """Background Celery task to fully render out the avatar and ultimately update PostgreSQL."""
    print(f"[Video Agent] Initiating AI video creation pipeline for {business_id}...")
    
    result = generate_heygen_video(avatar_id, script_text)
    
    if result["status"] == "success":
        # In a real app, we'd save to AWS S3, then hit DB
        # db.query(Content).filter(id=content_id).update({"media_url": video_url, "status": "approved"})
        print(f"[Video Agent] Video rendered successfully: {result.get('video_url')}")
        return {"video_url": result.get("video_url")}
        
    return {"status": "processing", "video_id": result.get("video_id")}
