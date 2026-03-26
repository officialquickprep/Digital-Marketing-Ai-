# Analytics & Learning Agent

## Overview
Measures all KPIs across the platform and creates a self-improving feedback loop (The Brain).

## Key Responsibilities
- Track ROAS, CTR, CPL, CAC, and engagement in real-time.
- Generate Weekly and Monthly executive reports for the Business Owner dashboard.
- 'Learning Loop': Analyze what content/ads worked best, and write these 'lessons' back into the Vector Database (RAG) so other agents get smarter over time.

## Technical Requirements
- Real-time aggregation queries in PostgreSQL.
- Scheduled analytics processing via Celery.
- LLM summarization of stats into actionable 'lessons learned'.\n