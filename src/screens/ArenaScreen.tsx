import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GameCanvas from "../game/GameCanvas";
import { useSendTransaction, useAccount } from "wagmi";
import { generateERC8021Data } from "../lib/erc8021";
import { toHex } from "viem";

export default function ArenaScreen() {
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { sendTransactionAsync } = useSendTransaction();
  const { address } = useAccount();
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordOnChain = async () => {
    if (!address) {
      alert("Please connect wallet first.");
      navigate("/");
      return;
    }
    
    try {
      setIsRecording(true);
      const data = generateERC8021Data(toHex(`Threadsmith Arena Score: ${score}`));
      
      await sendTransactionAsync({
        to: address, // sending to self as a mock record
        value: 0n,
        data: data
      });
      alert("Score recorded successfully on Base Mainnet!");
      navigate("/lobby");
    } catch(e) {
      console.error(e);
      alert("Transaction failed.");
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full h-full relative bg-black overflow-hidden touch-none">
      
      {/* Game Canvas acts as the arena */}
      <GameCanvas setGameOver={setGameOver} setScore={setScore} />

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-20 px-8 flex justify-between items-center pointer-events-none bg-hud-top z-20">
        <button onClick={() => navigate("/lobby")} className="p-2 rounded-full border border-white/10 bg-white/5 text-white pointer-events-auto hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-6 pointer-events-auto">
          <div className="text-center">
            <div className="text-[10px] uppercase opacity-50 tracking-widest text-cyan-400">Weave Score</div>
            <div className="text-2xl font-bold font-sans text-gold-400 glow-text-gold">{score}</div>
          </div>
        </div>
      </div>

      {gameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-8 text-center shadow-[0_0_50px_rgba(255,45,85,0.2)] max-w-sm w-full mx-4 border-crimson-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-crimson-500/10 mix-blend-overlay"></div>
            <h2 className="text-4xl font-black text-crimson-400 mb-2 font-sans relative drop-shadow-[0_0_15px_var(--color-crimson)]">THREAD SNAPPED</h2>
            <p className="text-white/60 mb-8 font-mono relative uppercase text-xs tracking-widest">Final Resonance: <span className="text-gold-400 text-2xl ml-2 font-bold font-sans">{score}</span></p>
            
            <button 
               onClick={handleRecordOnChain}
               disabled={isRecording}
               className="gm-button w-full mb-4 relative"
            >
              {isRecording ? "SIGNING..." : "RECORD (SIWE)"}
            </button>
            <button 
               onClick={() => { setGameOver(false); setScore(0); }}
               className="w-full py-4 rounded-xl border border-white/20 font-bold text-white/50 hover:bg-white/10 hover:text-white transition-colors relative tracking-widest text-sm"
            >
              WEAVE AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
