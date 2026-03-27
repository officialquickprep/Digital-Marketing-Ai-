# Phase 3.1: Central AI Orchestrator

## Objective
Migrate from rigid, scheduled Celery cron-jobs to a fully dynamic, self-aware LangGraph or Microsoft AutoGen state machine that enables advanced inter-agent communication.

## Technical Architecture
1. **LangGraph Node Graph**: 
   - Construct computational nodes for all 7 distinct marketing agents (Discovery, Content, Ads, Support, etc.).
2. **Global State Dictionary**: 
   - Maintain a shared contextual mapping of the business's current marketing funnel health.
3. **Dynamic Agent Routing**: 
   - Implement conditionals. Ex: If the Discovery Agent scrapes 0 new leads in a specific geofence for 48 hours, it autonomously pings the Advertising Agent to launch a new Top-of-Funnel (TOFU) awareness ad specifically there.

## Acceptance Criteria
- [ ] Agents can pass commands to each other without human intervention.
- [ ] Python orchestrator successfully maps state across the whole architecture.
