# Customer Discovery Agent

## Overview
Finds real potential customers across all digital platforms based on the business's ICP.

## Key Responsibilities
- Scan Google Search and Google Maps for relevant local queries (e.g., 'restaurants near me').
- Scan Instagram and LinkedIn for user behavior matching the ICP.
- Score each discovered lead from 0 to 100 based on the fit.
- Automatically add qualified leads to the internal PostgreSQL CRM.

## Technical Requirements
- Integrations: Google Places API, Apify (for Instagram/LinkedIn scraping), Apollo.io (for B2B).
- Lead Scoring Logic: LLM compares scraped profile data against the ICP.\n