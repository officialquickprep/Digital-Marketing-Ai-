# Business Intelligence Agent

## Overview
This agent is the strategic foundation for all other agents. It is responsible for onboarding new businesses and building their Ideal Customer Profile (ICP).

## Key Responsibilities
- Analyze company data, industry, and competition provided during onboarding.
- Build an Ideal Customer Profile (ICP) including demographics, behaviors, and pain points.
- Produce a structured marketing brief that will be used by all other agents as their starting context.
- Continuously update the ICP based on the Learning Loop (Analytics Agent).

## Technical Requirements
- Next.js onboarding form to collect location, products, and brand assets.
- Pinecone/Weaviate (Vector DB) integration to store brand tone and context (RAG).
- OpenAI/Claude prompt design for structuring raw inputs into a clean JSON ICP.\n