import React, { useEffect, useRef } from "react";
import { setupGameLoop, cleanupGameLoop } from "./gameLoop";

interface GameCanvasProps {
  setGameOver: (b: boolean) => void;
  setScore: (s: number | ((prev: number) => number)) => void;
}

export default function GameCanvas({ setGameOver, setScore }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Touch inputs
  const leftTouchRef = useRef<{ active: boolean; x: number; y: number; originX: number; originY: number }>({ active: false, x: 0, y: 0, originX: 0, originY: 0 });
  const rightTouchRef = useRef<{ active: boolean; points: {x: number, y: number}[] }>({ active: false, points: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle resizing to fill parent viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Setup game loop
    const state = setupGameLoop(canvas, leftTouchRef, rightTouchRef, setGameOver, setScore);

    return () => {
      window.removeEventListener("resize", resize);
      cleanupGameLoop(state);
    };
  }, [setGameOver, setScore]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const isLeft = e.clientX < window.innerWidth / 2;
    if (isLeft) {
      leftTouchRef.current = { active: true, x: e.clientX, y: e.clientY, originX: e.clientX, originY: e.clientY };
    } else {
      rightTouchRef.current = { active: true, points: [{ x: e.clientX, y: e.clientY }] };
    }
    // Prevent default scrolling on canvas
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Determine which zone this pointer belongs to based on initial active state
    // Simple logic: if left is active and this pointer is on left half
    const isLeft = e.clientX < window.innerWidth / 2;
    
    if (leftTouchRef.current.active && isLeft) {
      leftTouchRef.current.x = e.clientX;
      leftTouchRef.current.y = e.clientY;
    } else if (rightTouchRef.current.active && !isLeft) {
      rightTouchRef.current.points.push({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const isLeft = e.clientX < window.innerWidth / 2;
    if (isLeft) {
      leftTouchRef.current.active = false;
    } else {
      rightTouchRef.current.active = false;
      // Triggers thread generation logic in gameLoop
    }
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <canvas 
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute inset-0 w-full h-full touch-none"
    />
  );
}
