# Phase 1.3: Customer Discovery Agent (Basic Leads)

## Goal
Create the engine that finds potential leads online.

## Tasks
1. Implement Google Places API integration to search for local queries.
2. Implement Apify integration to scrape basic Instagram profile data.
3. Build the LLM Lead Scoring Prompt (takes scraped profile text + business ICP, returns score 0-100).
4. Create the `leads` table in PostgreSQL.
5. Build a Celery scheduled background task that queries APIs and saves qualified leads.\n