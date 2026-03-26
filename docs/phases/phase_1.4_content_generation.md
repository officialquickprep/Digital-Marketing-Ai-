# Phase 1.4: Content Generation Agent

## Goal
Automate the creation of social media posts.

## Tasks
1. Define hardcoded JSON templates for content (e.g. 'Offer Post', 'Testimonial').
2. Build an LLM chain that queries the Vector DB for business context, picks a template, and outputs a social media caption.
3. Integrate DALL-E 3 API to generate a matching placeholder image based on the caption.
4. Build the "Approval Queue" UI in the Next.js dashboard.
5. Setup database schema linking generated content to the business ID.\n