# Phase 1.2: Business Intelligence Agent (Onboarding)

## Goal
Build the system that 'learns' about the client's business.

## Tasks
1. Build Next.js UI for the wizard onboarding form (Business Name, Content Tone, Target Persona).
2. Create FastAPI endpoints (`/api/onboarding`) to save business context.
3. Integrate LangChain/OpenAI to process the raw onboarding input.
4. Implement the BI LLM Prompt to transform input into an Ideal Customer Profile (ICP) JSON object.
5. Store the structured ICP in PostgreSQL.
6. Chunk and embed any uploaded documents (e.g. PDF menus) into the Vector DB.\n