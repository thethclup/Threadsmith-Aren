# Threadsmith Arena

**Threadsmith Arena** is a fast-paced, strategic, and visually spectacular arena battler. You take on the role of a *Threadsmith* — a master weaver of fate. You battle other Threadsmiths by weaving magical threads in real-time to create powerful constructs, traps, and attacks. Every thread you weave becomes a living weapon or defense in the arena.

## Tech Stack Overview
- **Frontend Framework**: React 19 + TypeScript (Running on Vite locally, architecture designed for easy conversion to Next.js 14 App Router on Vercel)
- **Styling**: Tailwind CSS with custom CSS variables (`--color-gold`, `--color-cyan`, etc.) and Framer Motion.
- **Web3 Integration**: Base Mainnet compatibility utilizing `wagmi`, `viem`, and generic Account verification via SIWE (Sign-In with Ethereum). Handles on-chain data recording with ERC-8021 Transaction Attribution and Trustless AI Agents defined by the ERC-8004 standard.
- **Backend / Agent API**: Next.js 14 App Router `route.ts` API structures serving MCP (Model Context Protocol).

## Threadsmithar Orchestrator Agent (ERC-8004)
Threadsmithar is powered by an ERC-8004 compatible AI Agent that acts as a Master Orchestrator. 

**Capabilities include:**
- thread-forging
- narrative-smithing
- story-crafting
- multi-thread-creation
- creative-orchestration
- narrative-automation
- mcp-command-execution

### Agent Discovery & Configuration
The agent's registry configuration can be discovered statically by standard EIP-8004 services at:
`/.well-known/agent-card.json`

## API Endpoints & Model Context Protocol (MCP)

This project contains integrated Web3-ready API tools powered by the Next.js App Router format, located under `app/api/*`:

- `/api/agent`: Exposes the public status and wallet identifier of the internal AI agent. Supported methods: `GET`, `POST`.
- `/api/mcp`: The orchestrator's central Model Context Protocol communication hub. Serves capabilities, tools, and execution contexts dynamically. Supported methods: `GET`, `POST`.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server (runs with Vite via `server.ts` express middleware):
   ```bash
   npm run dev
   ```

3. Production compilation (runs `vite build` and `esbuild`):
   ```bash
   npm run build
   npm start
   ```

## Development Notice
When deploying tracking tools and Web3 mechanisms, confirm your environment parameters match the expected Mainnet setups for `base` network inside of the platform. Always respect PWA structure for Android/iOS native-feel capabilities!
