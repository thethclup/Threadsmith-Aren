/**
 * Utilities for ERC-8004 Trustless Agents
 * https://eips.ethereum.org/EIPS/eip-8004
 */
import { Address } from "viem";

export interface AgentConfig {
  owner: Address;
  executionLimit: bigint;
  permissions: number; // bitmask
}

export function buildAgentData(config: AgentConfig): `0x${string}` {
  // Simple payload generation for a trustless agent registration
  // Normally this would encode actual ABIs for the registry contract
  return `0x80040000000000000000000000000000`;
}
