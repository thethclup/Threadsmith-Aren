# Threadsmithar Orchestrator

**Threadsmithar Orchestrator** is an ERC-8004 compatible AI Agent that acts as a Master Orchestrator, powering the Threadsmith Arena. It is responsible for thread forging, narrative smithing, story crafting, and advanced multi-thread creation.

## Tech Stack Overview
- **Framework**: Next.js 14 App Router
- **Web3 Integration**: Base Mainnet compatibility utilizing `wagmi`, `viem`, and generic Account verification via SIWE (Sign-In with Ethereum). Handles on-chain data recording with ERC-8021 Transaction Attribution and Trustless AI Agents defined by the ERC-8004 standard.
- **Backend / Agent API**: Next.js 14 App Router API structures serving MCP (Model Context Protocol).

## Agent Capabilities
- thread-forging
- narrative-smithing
- story-crafting
- multi-thread-creation
- creative-orchestration
- narrative-automation
- mcp-command-execution

## Agent Discovery & Configuration
The agent's registry configuration can be discovered statically by standard EIP-8004 services at:
`/.well-known/agent-card.json`

## API Endpoints & Model Context Protocol (MCP)
This project contains integrated Web3-ready API tools powered by the Next.js App Router format, located under `app/api/*`:

- `/api/agent`: Exposes the public status and identifier of the internal AI agent. Supported methods: `GET`, `POST`.
- `/api/mcp`: The orchestrator's central Model Context Protocol communication hub. Serves capabilities, tools, and execution contexts dynamically. Supported methods: `GET`, `POST`.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Production compilation:
   ```bash
   npm run build
   npm start
   ```

## Development Notice
When deploying tracking tools and Web3 mechanisms, confirm your environment parameters match the expected Mainnet setups for the `base` network. Use `.env` file (copy from `.env.example`) to populate keys. Sensitive information such as actual Private Keys, Gemini API keys, or database URLs MUST NOT be committed to the repository!
