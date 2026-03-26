import os

base_dir = "d:\\Digiatalai\\docs\\phases"

files = {
    "phase_1.1_infrastructure.md": """# Phase 1.1: Core Infrastructure Setup

## Goal
Scaffold the fundamental architecture of the platform.

## Tasks
1. Initialize a Next.js 14 frontend project with Tailwind CSS and Shadcn UI.
2. Initialize a Python FastAPI backend project.
3. Install and configure PostgreSQL databases (one for user state, one for analytical data).
4. Set up the Pinecone/Weaviate Vector DB for RAG memory.
5. Create a Redis instance for caching.
6. Configure Celery & Redis to handle background agent tasks.
""",

    "phase_1.2_business_intelligence.md": """# Phase 1.2: Business Intelligence Agent (Onboarding)

## Goal
Build the system that 'learns' about the client's business.

## Tasks
1. Build Next.js UI for the wizard onboarding form (Business Name, Content Tone, Target Persona).
2. Create FastAPI endpoints (`/api/onboarding`) to save business context.
3. Integrate LangChain/OpenAI to process the raw onboarding input.
4. Implement the BI LLM Prompt to transform input into an Ideal Customer Profile (ICP) JSON object.
5. Store the structured ICP in PostgreSQL.
6. Chunk and embed any uploaded documents (e.g. PDF menus) into the Vector DB.
""",

    "phase_1.3_customer_discovery.md": """# Phase 1.3: Customer Discovery Agent (Basic Leads)

## Goal
Create the engine that finds potential leads online.

## Tasks
1. Implement Google Places API integration to search for local queries.
2. Implement Apify integration to scrape basic Instagram profile data.
3. Build the LLM Lead Scoring Prompt (takes scraped profile text + business ICP, returns score 0-100).
4. Create the `leads` table in PostgreSQL.
5. Build a Celery scheduled background task that queries APIs and saves qualified leads.
""",

    "phase_1.4_content_generation.md": """# Phase 1.4: Content Generation Agent

## Goal
Automate the creation of social media posts.

## Tasks
1. Define hardcoded JSON templates for content (e.g. 'Offer Post', 'Testimonial').
2. Build an LLM chain that queries the Vector DB for business context, picks a template, and outputs a social media caption.
3. Integrate DALL-E 3 API to generate a matching placeholder image based on the caption.
4. Build the "Approval Queue" UI in the Next.js dashboard.
5. Setup database schema linking generated content to the business ID.
""",

    "phase_1.5_customer_support.md": """# Phase 1.5: Customer Support Integration (Omixa AI)

## Goal
Ensure 24/7 lead capture via Instagram DMs by forwarding directly to Omixa AI.

## Tasks
1. Register a Meta Developer Application and set up Webhook Verification.
2. Create a FastAPI `POST /webhooks/instagram` endpoint.
3. Parse the incoming Meta DM JSON payload to extract sender ID and text.
4. Implement HTTP client to forward the payload securely to your existing Omixa AI platform.
5. Build endpoint to accept the lead qualification result back from Omixa AI.
""",

    "phase_1.6_advertising.md": """# Phase 1.6: Advertising Agent (Meta Ads Basic)

## Goal
Enable automated ad campaign generation.

## Tasks
1. Set up Meta Graph API authentication (System User Tokens).
2. Write a Python service to programmatically create Ad Campaigns and Ad Sets targeting the ICP.
3. Connect the Content Generation agent's output as the Ad Creative.
4. Set hardcoded daily spending limits logic.
""",

    "phase_1.7_analytics.md": """# Phase 1.7: Analytics Dashboard

## Goal
Track performance and close the loop.

## Tasks
1. Construct SQL queries summarizing leads found and leads engaged.
2. Interrogate the Meta Ads API for spend and impression counts.
3. Create the Next.js Dashboard UI with Recharts displaying Return on Ad Spend (ROAS) and Click-Through Rate.
4. Display a data table of the generated content and its synthetic performance.
"""
}

for filename, content in files.items():
    file_path = os.path.join(base_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\\n")
print("Phase 1 detailed split successfully completed")
