# Phase 3.2: Voice Agent (Cold Calling AI)

## Objective
Convert bottom-of-funnel (BOFU) leads into officially booked calendar meetings completely autonomously via conversational Voice AI telephony pipelines.

## Technical Architecture
1. **Telephony Integration Engine**: 
   - Map outbound dialing logic to **Twilio Voice**, **Bland AI**, or **Retell AI**.
2. **Real-time LLM Streamer**: 
   - Program a low-latency WebSockets router answering audio chunks to the `gpt-4o-realtime-preview` model.
3. **Calendar Booking API**: 
   - Integrate Google Calendar API or Calendly hooks natively so the Voice Agent can seamlessly read available time slots to the lead over the phone.

## Acceptance Criteria
- [ ] The system autonomously dials phone numbers tracked in the `leads` table scoring > 90%.
- [ ] Voice Agent successfully books human calendar events purely through conversation.
