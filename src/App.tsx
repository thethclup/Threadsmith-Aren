/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Providers } from "./Providers";
import TitleScreen from "./screens/TitleScreen";
import LobbyScreen from "./screens/LobbyScreen";
import ArenaScreen from "./screens/ArenaScreen";
import CodexScreen from "./screens/CodexScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import AtelierScreen from "./screens/AtelierScreen";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Sun } from "lucide-react";

function GMButton() {
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const sendGMTransaction = () => {
    sendTransaction({
      to: '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7',
      value: parseEther('0'), // Sending a 0 value transaction as a "GM" ping
    });
  };

  if (!isConnected) return null;

  return (
    <div className="absolute top-4 right-4 z-50">
      <button 
        onClick={sendGMTransaction}
        className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
      >
        <Sun className="w-4 h-4" /> Say GM
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div className="w-full h-[100dvh] bg-arena text-white font-sans overflow-hidden relative selection:bg-cyan-500/30">
          <GMButton />
          <Routes>
            <Route path="/" element={<TitleScreen />} />
            <Route path="/lobby" element={<LobbyScreen />} />
            <Route path="/arena" element={<ArenaScreen />} />
            <Route path="/codex" element={<CodexScreen />} />
            <Route path="/leaderboard" element={<LeaderboardScreen />} />
            <Route path="/atelier" element={<AtelierScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Providers>
  );
}
