import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";
import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export default function TitleScreen() {
  const navigate = useNavigate();
  const { connect } = useConnect();
  const { isConnected, address } = useAccount();
  const setPlayerAddress = useGameStore((state) => state.setPlayerAddress);

  useEffect(() => {
    if (isConnected && address) {
      setPlayerAddress(address);
    }
  }, [isConnected, address, setPlayerAddress]);

  const handleStart = () => {
    if (!isConnected) {
      connect({ connector: injected() });
    } else {
      navigate("/lobby");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden bg-transparent">
      {/* Background Magic Threads placeholder */}
      <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[800px] h-[800px] border border-cyan-500/30 rounded-full" />
        <div className="absolute w-[600px] h-[600px] border border-violet-500/20 rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 flex flex-col items-center gap-12 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white glow-text-cyan drop-shadow-2xl font-sans">
            THREADSMITH<br/>ARENA
          </h1>
          <p className="text-lg md:text-xl text-cyan-200/80 font-medium tracking-wide glow-text-cyan">
            Weave your fate. Outsmart your rivals.
          </p>
        </div>

        <button
          onClick={handleStart}
          className="gm-button text-xl px-12 py-5"
        >
          {isConnected ? "Enter the Arena" : "Connect Wallet"}
        </button>
      </motion.div>
    </div>
  );
}
