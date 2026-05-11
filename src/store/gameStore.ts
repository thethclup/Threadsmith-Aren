import { create } from 'zustand';

interface GameState {
  playerAddress: string | null;
  wins: number;
  bestWeaveScore: number;
  setPlayerAddress: (address: string | null) => void;
  addWin: () => void;
  updateBestScore: (score: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerAddress: null,
  wins: 0,
  bestWeaveScore: 0,
  setPlayerAddress: (address) => set({ playerAddress: address }),
  addWin: () => set((state) => ({ wins: state.wins + 1 })),
  updateBestScore: (score) => set((state) => ({ 
    bestWeaveScore: Math.max(state.bestWeaveScore, score) 
  })),
}));
