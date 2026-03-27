import express from 'express';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { businessId, contentId, avatarId, script } = req.body;
    console.log(`[Main API] Received video generation payload from React Studio for content ${contentId}.`);

    // Delegate the heavy computational rendering to the Python AI Service 
    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/api/ai/video`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessId, contentId, avatarId, script })
    });

    if (!aiResponse.ok) {
      throw new Error(`AI Service Video Endpoint failed: ${aiResponse.status}`);
    }
    
    const result = await aiResponse.json();
    
    // Return early to front-end, actual render occurs in Celery background queues
    res.status(200).json({ success: true, message: 'Video securely queued for rendering', data: result });
  } catch (error) {
    console.error('[Main API] Node.js Video Routing Error:', error);
    res.status(500).json({ success: false, error: 'Failed to initiate video rendering pipeline.' });
  }
});

export default router;
