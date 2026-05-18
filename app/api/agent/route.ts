import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Threadsmithar Orchestrator - Agent Info Endpoint
 * 
 * Bu endpoint, agent'in temel kimlik bilgilerini sağlar.
 * ERC-8004 ve A2A discovery için kullanılır.
 */

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json({
    name: "Threadsmithar Orchestrator",
    description: "Threadsmithar platformunda çalışan ERC-8004 uyumlu AI Agent. Thread forging, narrative smithing, story crafting ve multi-thread creation automation yapan usta orchestrator.",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "Threadsmithar",
    version: "1.0.0",
    type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
    lastUpdated: new Date().toISOString()
  }, { headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    return NextResponse.json({
      status: "success",
      message: "Agent request received",
      received: body
    }, { headers: CORS_HEADERS });
    
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to process agent request"
    }, { status: 400, headers: CORS_HEADERS });
  }
}
