import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AtelierScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full bg-transparent p-6 relative overflow-hidden">
      <header className="flex items-center gap-4 mb-8 z-10 w-full hud-top absolute top-0 left-0 px-8">
        <button onClick={() => navigate("/lobby")} className="p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold tracking-tight text-white glow-text-cyan uppercase">THE ATELIER</h2>
      </header>
      <div className="flex-1 flex items-center justify-center z-10 mt-20">
        <div className="glass-panel p-10 max-w-sm w-full text-center border-cyan-500/20 shadow-[0_0_30px_rgba(0,242,255,0.1)]">
          <p className="text-cyan-400 font-mono tracking-widest text-sm uppercase">Customize your Threadsmith identity here.<br/><br/><span className="text-white/50">(Coming Soon)</span></p>
        </div>
      </div>
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center opacity-10">
         <div className="absolute w-[600px] h-[600px] border border-cyan-500/30 rounded-full" />
      </div>
    </div>
  );
}
