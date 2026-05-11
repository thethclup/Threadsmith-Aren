import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CodexScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full bg-transparent p-6 relative overflow-hidden">
      <header className="flex items-center gap-4 mb-8 z-10 w-full hud-top absolute top-0 left-0 px-8">
        <button onClick={() => navigate("/lobby")} className="p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold tracking-tight text-white glow-text-violet uppercase">THREAD CODEX</h2>
      </header>
      <div className="flex-1 overflow-y-auto mt-20 z-10 p-4">
        <p className="text-cyan-400/50 text-center mt-10 font-mono text-sm tracking-widest uppercase">Unlock weaving patterns to decipher the threads of fate.</p>
        {/* Placeholder for patterns */}
        <div className="grid grid-cols-2 gap-6 mt-12 w-full max-w-sm mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square glass-panel flex flex-col items-center justify-center hover:border-violet-400 transition-colors cursor-pointer group shadow-[0_0_20px_rgba(138,43,226,0.1)]">
              <div className="w-12 h-12 border border-violet-400/30 rotate-45 mb-4 group-hover:bg-violet-400/20 transition-colors flex items-center justify-center">
                 <span className="text-xl opacity-20 -rotate-45">?</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center opacity-10">
         <div className="absolute w-[800px] h-[800px] border border-violet-500/30 rounded-full" />
      </div>
    </div>
  );
}
