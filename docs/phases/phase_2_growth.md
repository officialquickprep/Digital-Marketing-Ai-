# Phase 2: Growth & Engagement (Target Month 3-4)

Building upon the robust foundation of the Phase 1 MVP, Phase 2 shifts focus toward high-converting media formats (Reels/TikTok) and hyper-targeted B2B outbound lead sequencing.

## Granular Technical Breakdown

### 1. Phase 2.1: Reel & Video Agent (`phase_2.1_video_agent.md`)
- Select and authenticate an AI Avatar Video API (HeyGen, Synthesia, or Runway ML).
- Create a Python handler to pass text transcripts and specific Voice IDs to the renderer.
- Support storing the generated `.mp4` files securely in an AWS S3 bucket.
- UI: Next.js visual approval queue specifically designed for video playback.

### 2. Phase 2.2: Advanced Customer Discovery (`phase_2.2_advanced_discovery.md`)
- Expand the existing Google Places/Apify pipeline to target LinkedIn Sales Navigator.
- Scrape individual B2B prospect profiles, including work history and current pain points.
- Integrate a data-enrichment tool (like Hunter.io or Apollo) to retrieve verified B2B email addresses perfectly matching the ICP.

### 3. Phase 2.3: AI Email Outreach Pipeline (`phase_2.3_email_outreach.md`)
- Set up an SMTP gateway (SendGrid, Mailgun, or AWS SES).
- Write a specialized LangChain prompt that uses the LinkedIn scraped data to weave highly personalized "Cold Email" opening lines.
- Hook inbound email replies directly into the Omixa AI LLM for continuous automated sales conversations.

### 4. Phase 2.4: A/B Testing Advertising (`phase_2.4_ab_testing.md`)
- Upgrade the Meta Ads script (`advertising_agent.py`) to launch "Dynamic Creative Optimization" (DCO) ad sets.
- Program an autonomous Celery cron-job that checks ROAS every 12 hours.
- **Auto-Kill Logic:** Automatically pause any ad creative dipping below a 2.0x ROAS threshold to strictly preserve the business owner's budget.