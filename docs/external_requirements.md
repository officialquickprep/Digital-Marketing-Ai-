# External Requirements & API Keys

Before we can successfully run the autonomous AI agents in Phase 1, we will need access to several third-party services and APIs. Please create accounts or generate API keys for the following:

## 1. Core AI Brain & Memory
- **OpenAI API Key (or Anthropic Claude):** Used for the Business Intelligence Agent, generating the ICP, generating social media captions, and scoring leads.
- **Pinecone OR Weaviate Account:** For the Vector Database. This is where we will store the RAG embeddings (the AI's memory of the business).

## 2. Customer Discovery (Scraping & Lead Gen)
- **Google Cloud Console Account:** Need the **Google Places API** enabled to search for local businesses or queries (e.g., finding gyms in a specific city).
- **Apify Account:** Apify provides pre-built scrapers. We need an API key to run their Instagram profile scrapers so our agent can find followers of competitors.

## 3. Content Generation
- **OpenAI API Key (DALL-E 3) OR Midjourney API:** We need an endpoint to programmatically generate the images for the social media posts.

## 4. Advertising & Customer Support (Meta Integrations)
- **Meta Developer Account:** Crucial for two things.
  1. To receive Webhooks for incoming Instagram Direct Messages (so we can forward them to Omixa AI).
  2. To access the **Meta Graph API** so our agent can programmatically launch ad sets.
- **System User Access Token:** A permanent token from Facebook Business Manager to authorize our API requests.

## 5. Omixa AI Integration
- **Omixa API URL / Endpoint:** The exact URL where we will push the Instagram DM webhooks.
- **Omixa Auth Token:** Any authorization headers we need to send so Omixa accepts the messages.
