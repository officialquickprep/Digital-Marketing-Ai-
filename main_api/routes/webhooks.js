import express from 'express';
// We use native fetch (Available in Node 18+)

const router = express.Router();

/**
 * 1. Meta Webhook Verification
 * Meta sends a GET request here when you configure the Webhook in the Developer Dashboard.
 */
router.get('/instagram', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
      console.log('[Webhooks] Meta Instagram Webhook Verified successfully!');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

/**
 * 2. Handling Incoming Instagram DMs
 * Meta sends POST requests here whenever a customer messages the business.
 */
router.post('/instagram', async (req, res) => {
  const body = req.body;

  if (body.object === 'instagram') {
    // Fast response required by Meta to avoid retry spam
    res.status(200).send('EVENT_RECEIVED'); 

    // Extract payloads and send dynamically to Omixa
    body.entry.forEach(async (entry) => {
      const webhookEvent = entry.messaging[0];
      console.log("[Webhooks] Incoming Instagram DM detected!");

      // Map to Omixa's expected payload
      const omixaPayload = {
        platform: 'instagram',
        sender_id: webhookEvent.sender.id,
        recipient_id: webhookEvent.recipient.id,
        timestamp: webhookEvent.timestamp,
        message: webhookEvent.message
      };

      try {
        const omixaRes = await fetch(process.env.OMIXA_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OMIXA_AUTH_TOKEN}`
          },
          body: JSON.stringify(omixaPayload)
        });
        
        if (!omixaRes.ok) {
          console.error("[Webhooks] Error: Omixa AI rejected the payload.", await omixaRes.text());
        } else {
          console.log(`[Webhooks] Successfully forwarded DM from ${webhookEvent.sender.id} to Omixa AI.`);
        }
      } catch (error) {
        console.error("[Webhooks] Network error attempting to reach Omixa AI endpoint:", error);
      }
    });
  } else {
    res.sendStatus(404);
  }
});

/**
 * 3. Receive results back from Omixa AI (Callback)
 */
router.post('/omixa-callback', async (req, res) => {
  const { lead_id, qualification_status, generated_data } = req.body;
  console.log(`[Webhooks] Omixa AI returned qualification status for lead: ${lead_id}`);
  
  // In production: UPDATE leads SET status = $1 WHERE id = $2
  
  res.status(200).json({ success: true, message: 'Omixa Lead Update Callback Acknowledged' });
});

export default router;
