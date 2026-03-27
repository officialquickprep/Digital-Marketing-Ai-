# Phase 2.2: Advanced Customer Discovery

## Objective
Supercharge the lead generation pipeline by deeply scraping LinkedIn B2B profiles and deriving highly qualified, verified decision-maker emails.

## Technical Architecture
1. **LinkedIn Scraper Hook (`discovery_agent.py`)**: 
   - Integrate Apify LinkedIn actors or Proxycurl to extract job titles, company sizes, and recent profile posts securely.
2. **Data Enrichment API**: 
   - Connect Hunter.io or Apollo.io webhook logic to dynamically convert scraped LinkedIn names and company URLs into verified `@company.com` emails.
3. **Database Upgrades**: 
   - Add `email`, `linkedin_url`, and `company_size` columns to the PostgreSQL `leads` table.

## Acceptance Criteria
- [ ] The Discovery Agent database officially populates with B2B decision-makers, bypassing generic mapping.
- [ ] The LLM AI Lead Scoring engine dynamically evaluates B2B prospects utilizing their most recent LinkedIn posts against the business ICP.
