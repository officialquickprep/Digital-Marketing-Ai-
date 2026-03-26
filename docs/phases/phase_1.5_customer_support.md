# Phase 1.5: Customer Support Integration (Omixa AI)

## Goal
Ensure 24/7 lead capture via Instagram DMs by forwarding directly to Omixa AI.

## Tasks
1. Register a Meta Developer Application and set up Webhook Verification.
2. Create a FastAPI `POST /webhooks/instagram` endpoint.
3. Parse the incoming Meta DM JSON payload to extract sender ID and text.
4. Implement HTTP client to forward the payload securely to your existing Omixa AI platform.
5. Build endpoint to accept the lead qualification result back from Omixa AI.\n