/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Providers } from "./Providers";
import TitleScreen from "./screens/TitleScreen";
import LobbyScreen from "./screens/LobbyScreen";
import ArenaScreen from "./screens/ArenaScreen";
import CodexScreen from "./screens/CodexScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import AtelierScreen from "./screens/AtelierScreen";

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div className="w-full h-[100dvh] bg-arena text-white font-sans overflow-hidden relative selection:bg-cyan-500/30">
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
