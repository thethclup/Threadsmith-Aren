import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";

export default function LeaderboardScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full bg-transparent p-6 relative overflow-hidden">
      <header className="flex items-center gap-4 mb-8 z-10 w-full hud-top absolute top-0 left-0 px-8">
        <button onClick={() => navigate("/lobby")} className="p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold tracking-tight text-white glow-text-gold uppercase flex items-center gap-3">
          <Trophy className="w-6 h-6 text-gold-400" />
          HALL OF WEAVERS
        </h2>
      </header>
      <div className="flex-1 overflow-y-auto space-y-4 mt-20 z-10 p-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex justify-between items-center p-5 glass-panel border border-gold-500/20 hover:border-gold-500/50 transition-colors shadow-[0_0_15px_rgba(255,215,0,0.05)]">
             <span className="font-mono text-gold-400/50">#{i + 1}</span>
             <span className="font-mono text-white/80">0x...{Math.random().toString(16).slice(2,6)}</span>
             <span className="text-cyan-400 font-bold glow-text-cyan">{Math.floor(Math.random() * 10000)} pts</span>
          </div>
        ))}
      </div>
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center opacity-10">
         <div className="absolute w-[800px] h-[800px] border border-gold-500/20 rounded-full" />
      </div>
    </div>
  );
}
