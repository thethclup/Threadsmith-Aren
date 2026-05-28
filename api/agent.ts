import type { VercelRequest, VercelResponse } from '@vercel/node';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.status(200);
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value as string);
    }
    return res.send('');
  }

  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value as string);
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        name: "Threadsmithar Orchestrator",
        description: "Threadsmithar platformunda çalışan ERC-8004 uyumlu AI Agent. Thread forging, narrative smithing, story crafting ve multi-thread creation automation yapan usta orchestrator.",
        status: "active",
        wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
        platform: "Threadsmithar",
        version: "1.0.0",
        type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
        lastUpdated: new Date().toISOString()
      });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      
      return res.status(200).json({
        status: "success",
        message: "Agent request received",
        received: body
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
