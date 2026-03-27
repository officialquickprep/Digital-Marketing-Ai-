# Phase 2.1: Reel & Video Generation Agent

## Objective
Automatically convert AI-generated text content into engaging, lip-synced video Reels for TikTok and Instagram using AI Avatars.

## Technical Architecture
1. **Frontend API (Next.js)**: 
   - Build `/video` route to let business owners pick custom AI avatars, background templates, and vocal tones.
2. **Backend Engine (Python `ai_service`)**: 
   - Integrate the **HeyGen API** or **Synthesia API**.
   - Send written caption scripts to the API to generate fully rendered `<video>` `.mp4` payloads.
3. **Database Schema**: 
   - Update `content` table to store `video_url` and `avatar_id`.

## Acceptance Criteria
- [ ] System can dynamically generate a 15-second MP4 Reel purely from an AI text post.
- [ ] Generated video seamlessly plays inside the Next.js Content Approval Queue.
- [ ] Media assets upload automatically to secure AWS S3 / Cloud Storage buckets.
