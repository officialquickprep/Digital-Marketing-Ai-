# Phase 2.3: AI Email Outreach Pipeline

## Objective
Convert newly scraped B2B leads generated from Phase 2.2 using highly personalized, autonomous cold email sequencing orchestrations.

## Technical Architecture
1. **SMTP Gateway Node API (`main_api`)**: 
   - Configure **SendGrid** or **AWS SES** securely for high-deliverability sending routing.
2. **AI Variable Copywriter**: 
   - Construct a specialized LangChain prompt that dynamically injects the lead's previously scraped LinkedIn Data (e.g. "Loved your recent post on X...") directly into the cold email body, making it completely hyper-personalized.
3. **Automated Follow-ups**: 
   - Program Celery heartbeat tasks to track "Open/Click" rates and automatically send Day-3 and Day-7 follow-ups perfectly optimized by OpenAI.

## Acceptance Criteria
- [ ] Highly personalized AI cold emails are sent autonomously from a verified business domain.
- [ ] Lead statuses dynamically update from `new` -> `contacted` -> `replied` continuously in PostgreSQL.
