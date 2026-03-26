import os
from openai import OpenAI
import json
from celery import Celery

celery_app = Celery(
    "content_agent",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "mock_key"))

def generate_post_caption(business_context: dict, template_type: str = "Offer Post"):
    """Uses LLM to generate highly targeted social media copy based on RAG context."""
    prompt = f"""
    You are an expert Social Media Content Creator AI.
    Business Context (RAG): {business_context}
    Template Type: {template_type}
    
    Write an engaging, high-converting social media caption for this business using their tone of voice.
    Keep it under 300 characters. Include 3 relevant hashtags.
    Output ONLY a JSON object with a single key 'caption'.
    """
    
    if not os.getenv("OPENAI_API_KEY"):
        return {"caption": f"Come visit {business_context.get('name', 'our business')}! We have amazing offers this week. #deal #local #business"}
        
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You output JSON only."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        return {"caption": f"Error generating caption: {str(e)}"}

def generate_post_image(caption: str):
    """Generates an image via DALL-E 3 based on the written caption."""
    if not os.getenv("OPENAI_API_KEY"):
        return "https://via.placeholder.com/1080x1080.png?text=Mock+AI+Generated+Image"
        
    try:
        # Prompt engineering for DALL-E based on the caption
        image_prompt = f"A high-quality, photorealistic, cinematic image representing this social media post: '{caption}'. No text or words in the image."
        response = client.images.generate(
            model="dall-e-3",
            prompt=image_prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        return response.data[0].url
    except Exception as e:
        print(f"[Content Agent] Image Error: {e}")
        return "https://via.placeholder.com/1080x1080.png?text=Image+Generation+Failed"

@celery_app.task
def generate_weekly_content(business_id: str, business_context: dict):
    """Generates a batch of posts and places them in the Approval Queue."""
    print(f"[Content Agent] Starting generation for {business_id}...")
    
    templates = ["Offer Post", "Testimonial/Review", "Behind the Scenes"]
    generated_content = []
    
    for template in templates:
        caption_data = generate_post_caption(business_context, template)
        image_url = generate_post_image(caption_data.get('caption', ''))
        
        post = {
            "business_id": business_id,
            "type": "post",
            "body": caption_data.get('caption', ''),
            "media_url": image_url,
            "status": "draft" # Goes to the human approval queue
        }
        generated_content.append(post)
        
    print(f"[Content Agent] Generated {len(generated_content)} drafts for approval queue.")
    # Next step: Save to PostgreSQL
    return generated_content
