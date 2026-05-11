import { encodeAbiParameters, parseAbiParameters, toHex } from 'viem';

/**
 * Utility for ERC-8021 Transaction Attribution
 * https://eips.ethereum.org/EIPS/eip-8021
 */

const BUILDER_CODE = "bc_t8yzb6h6";
const ATTRIBUTION_CODE = "[ATTRIBUTION_CODE]";

export function generateERC8021Data(originalData: `0x${string}`, customAttribution?: string): `0x${string}` {
  const code = customAttribution || ATTRIBUTION_CODE;
  // Based on ERC-8021 draft or typical attribution (appending to calldata or encoding)
  // For standard attribution, sometimes it's specific comment data or structured args.
  // We'll append it as a simple hex string for demonstration if it's not a contract call,
  // or wrap it.
  
  const attributionHex = toHex(`erc8021:${code}:${BUILDER_CODE}`);
  
  if (originalData === '0x' || !originalData) {
    return attributionHex;
  }
  
  // Example of appending
  return `${originalData}${attributionHex.replace('0x', '')}` as `0x${string}`;
}
