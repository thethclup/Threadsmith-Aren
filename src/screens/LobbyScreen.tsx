import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Trophy, BookOpen, User, Play, LogOut, MessageSquare } from "lucide-react";
import { useAccount, useDisconnect, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
import React from "react";

export default function LobbyScreen() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { sendTransactionAsync } = useSendTransaction();
  const [isSending, setIsSending] = useState(false);

  const handleSayGM = async () => {
    try {
      setIsSending(true);
      // Dummy transaction to self with 0 value to signify "GM" on chain
      if (address) {
        await sendTransactionAsync({
          to: address,
          value: parseEther("0"),
          data: "0x474d" // Hex for "GM"
        });
        alert("GM recorded on Base Mainnet!");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to send GM.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-transparent p-6 md:p-12 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center z-10 hud-top absolute top-0 left-0 w-full bg-hud-top px-10">
        <div>
          <div className="text-xs uppercase tracking-widest text-cyan-400">Threadsmith IV</div>
          <h2 className="text-2xl font-bold tracking-tight text-white glow-text-cyan">
            LOBBY
          </h2>
          <p className="text-sm text-cyan-400/50 font-mono">
            {address?.slice(0,6)}...{address?.slice(-4)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            disabled={isSending}
            onClick={handleSayGM} 
            className="gm-button text-sm px-6 py-2"
          >
            {isSending ? "Sending..." : "Say GM"}
          </button>
          <button onClick={() => { disconnect(); navigate("/"); }} className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-crimson hover:text-crimson-400 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 z-10 mt-20">
        
        <button
          onClick={() => navigate("/arena")}
          className="w-full max-w-sm aspect-[3/1] flex flex-col items-center justify-center relative overflow-hidden group glass-panel border border-cyan-500/50 hover:border-gold-500 transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]"
        >
          <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay group-hover:bg-gold-900/20 transition-colors duration-500" />
          <div className="flex items-center gap-4 text-white">
            <Play className="w-8 h-8 fill-white text-gold-400" />
            <span className="text-4xl font-black tracking-widest font-sans glow-text-cyan uppercase">BATTLE</span>
          </div>
        </button>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <MenuButton icon={<BookOpen className="text-violet-400" />} label="Codex" onClick={() => navigate("/codex")} color="border-violet-500/30" />
          <MenuButton icon={<Trophy className="text-gold-400" />} label="Rankings" onClick={() => navigate("/leaderboard")} color="border-gold-500/50" />
          <MenuButton icon={<User className="text-cyan-400" />} label="Atelier" onClick={() => navigate("/atelier")} color="border-cyan-500/30" />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center opacity-20">
        <svg className="absolute w-[600px] h-[600px] filter drop-shadow-[0_0_15px_var(--color-cyan)]" viewBox="0 0 200 200">
          <path d="M100 20 L170 160 L30 160 Z" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeDasharray="4,2" />
          <path d="M100 40 L150 140 L50 140 Z" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="var(--color-violet)" strokeWidth="0.5" />
          <path d="M100 20 L100 180 M30 160 L170 40 M170 160 L30 40" stroke="rgba(0,242,255,0.2)" strokeWidth="0.5" />
          <circle cx="100" cy="20" r="4" fill="var(--color-cyan)" />
          <circle cx="170" cy="160" r="4" fill="var(--color-cyan)" />
          <circle cx="30" cy="160" r="4" fill="var(--color-cyan)" />
        </svg>
      </div>
    </div>
  );
}

function MenuButton({ icon, label, onClick, color = "border-white/10" }: { icon: React.ReactNode, label: string, onClick: () => void, color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`glass-panel flex flex-col items-center justify-center p-6 gap-3 border ${color} hover:-translate-y-1 transition-transform shadow-lg cursor-pointer`}
    >
      <div className="[&>svg]:w-8 [&>svg]:h-8">
        {icon}
      </div>
      <span className="font-bold tracking-widest text-xs uppercase opacity-80">{label}</span>
    </button>
  );
}
