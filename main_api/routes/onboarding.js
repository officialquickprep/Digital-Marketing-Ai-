import express from 'express';
// Using native fetch available in Node.js 18+

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { businessName, industry, location, targetAudience, toneOfVoice } = req.body;

    console.log(`[Main API] Received onboarding payload for ${businessName}.`);
    console.log(`[Main API] Delegating heavy LLM extraction to Python AI Service...`);

    // Call Python AI Service to generate Ideal Customer Profile (ICP)
    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/api/ai/generate-icp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, industry, location, targetAudience, toneOfVoice })
    });

    if (!aiResponse.ok) {
      throw new Error(`AI Service responded with status: ${aiResponse.status}`);
    }
    
    const { icp } = await aiResponse.json();
    console.log(`[Main API] Successfully received ICP from AI Service.`);

    // Note: In production, we execute PostgreSQL insert/update here with the returned ICP JSON.
    // e.g. UPDATE businesses SET icp = $1 WHERE name = $2

    res.status(200).json({ success: true, message: 'ICP Generated successfully', data: icp });
  } catch (error) {
    console.error('[Main API] Onboarding Error:', error);
    res.status(500).json({ success: false, error: 'Failed to process business onboarding model.' });
  }
});

export default router;
