import React from "react";

type TouchRef = React.MutableRefObject<{ active: boolean; x: number; y: number; originX: number; originY: number }>;
type RightTouchRef = React.MutableRefObject<{ active: boolean; points: {x: number, y: number}[] }>;

interface Entity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: 'player' | 'enemy' | 'thread_bolt';
  hp?: number;
}

interface Thread {
  points: {x: number, y: number}[];
  life: number; // 0 to 1
  color: string;
}

export function setupGameLoop(
  canvas: HTMLCanvasElement, 
  leftTouchRef: TouchRef, 
  rightTouchRef: RightTouchRef,
  setGameOver: (b: boolean) => void,
  setScore: (s: number | ((prev: number) => number)) => void
) {
  const ctx = canvas.getContext('2d')!;
  let animationId = 0;
  let lastTime = performance.now();

  // Game State
  let player: Entity = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 15,
    color: '#00f2ff', // Cyan
    type: 'player',
    hp: 100
  };

  let enemies: Entity[] = [];
  let threads: Thread[] = [];
  let bolts: Entity[] = [];
  let spawnTimer = 0;
  let isGameOver = false;

  const loop = (time: number) => {
    if (isGameOver) return;
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    update(dt);
    draw(ctx, canvas);

    animationId = requestAnimationFrame(loop);
  };

  const update = (dt: number) => {
    // 1. Update Player Movement (Left Joystick)
    if (leftTouchRef.current.active) {
      const dx = leftTouchRef.current.x - leftTouchRef.current.originX;
      const dy = leftTouchRef.current.y - leftTouchRef.current.originY;
      const dist = Math.hypot(dx, dy);
      const maxDist = 50;
      
      let normX = dx;
      let normY = dy;
      if (dist > maxDist) {
        normX = (dx / dist) * maxDist;
        normY = (dy / dist) * maxDist;
      }
      
      // Speed factor
      const speed = 200;
      player.vx = (normX / maxDist) * speed;
      player.vy = (normY / maxDist) * speed;
    } else {
      player.vx *= 0.8; // friction
      player.vy *= 0.8;
    }

    player.x += player.vx * dt;
    player.y += player.vy * dt;

    // Boundary checks
    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

    // 2. Process Thread Drawing (Weaving)
    if (!rightTouchRef.current.active && rightTouchRef.current.points.length > 5) {
      // Thread finished drawing
      threads.push({
        points: [...rightTouchRef.current.points],
        life: 1.0,
        color: '#ffd700' // Gold thread
      });
      rightTouchRef.current.points = []; // reset

      // Simple weave logic: convert thread to bolts towards nearest enemies
      if (enemies.length > 0) {
        setScore(s => (s as number) + 10);
        const lastPoint = threads[threads.length-1].points[threads[threads.length-1].points.length-1];
        
        let nearestEnemy = enemies[0];
        let minDist = Infinity;
        for(let e of enemies) {
           let d = Math.hypot(e.x - lastPoint.x, e.y - lastPoint.y);
           if(d < minDist) { minDist = d; nearestEnemy = e; }
        }

        const angle = Math.atan2(nearestEnemy.y - lastPoint.y, nearestEnemy.x - lastPoint.x);
        bolts.push({
          x: lastPoint.x,
          y: lastPoint.y,
          vx: Math.cos(angle) * 400,
          vy: Math.sin(angle) * 400,
          radius: 5,
          color: '#00f2ff', // Cyan bolts
          type: 'thread_bolt'
        });
      }
    }

    // 3. Update Threads Decay
    threads.forEach(t => t.life -= dt * 0.5);
    threads = threads.filter(t => t.life > 0);

    // 4. Update Bolts
    bolts.forEach(b => {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    });
    // Remove offscreen bolts
    bolts = bolts.filter(b => b.x > 0 && b.x < canvas.width && b.y > 0 && b.y < canvas.height);

    // 5. Spawn Enemies
    spawnTimer += dt;
    if (spawnTimer > 2.0) {
      spawnTimer = 0;
      // Spawn at edges
      const edge = Math.floor(Math.random() * 4);
      let ex = 0, ey = 0;
      if(edge === 0) { ex = Math.random() * canvas.width; ey = -20; }
      if(edge === 1) { ex = Math.random() * canvas.width; ey = canvas.height + 20; }
      if(edge === 2) { ex = -20; ey = Math.random() * canvas.height; }
      if(edge === 3) { ex = canvas.width + 20; ey = Math.random() * canvas.height; }

      enemies.push({
        x: ex, y: ey, vx: 0, vy: 0, radius: 12, color: '#ff2d55', type: 'enemy', hp: 20
      });
    }

    // 6. Update Enemies
    enemies.forEach(e => {
      const angle = Math.atan2(player.y - e.y, player.x - e.x);
      e.vx = Math.cos(angle) * 60;
      e.vy = Math.sin(angle) * 60;
      e.x += e.vx * dt;
      e.y += e.vy * dt;

      // Collision with Player
      if (Math.hypot(player.x - e.x, player.y - e.y) < player.radius + e.radius) {
        player.hp! -= 10;
        e.hp = 0; // kill enemy
      }
    });

    // 7. Bolt-Enemy collision
    for(let b of bolts) {
      for(let e of enemies) {
        if (Math.hypot(b.x - e.x, b.y - e.y) < b.radius + e.radius) {
          e.hp! -= 20;
          b.x = -1000; // move offscreen to remove
        }
      }
    }
    enemies = enemies.filter(e => e.hp! > 0);
    
    // Check Game Over
    if (player.hp! <= 0) {
      isGameOver = true;
      setGameOver(true);
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid / Arena floor
    ctx.strokeStyle = 'rgba(0, 242, 255, 0.1)';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
    for(let i=0; i<canvas.height; i+=40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

    // Draw Active Thread (weaving currently)
    if (rightTouchRef.current.active && rightTouchRef.current.points.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#ffd700'; // Gold
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const pts = rightTouchRef.current.points;
      ctx.moveTo(pts[0].x, pts[0].y);
      for(let i=1; i<pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      
      // Glow
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Decaying Threads
    for(let t of threads) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 215, 0, ${t.life})`;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(t.points[0].x, t.points[0].y);
      for(let i=1; i<t.points.length; i++) ctx.lineTo(t.points[i].x, t.points[i].y);
      ctx.stroke();
    }

    // Draw Bolts
    for(let b of bolts) {
       ctx.beginPath();
       ctx.fillStyle = b.color;
       ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
       ctx.fill();
       ctx.shadowColor = b.color;
       ctx.shadowBlur = 8;
       ctx.fill();
       ctx.shadowBlur = 0;
    }

    // Draw Enemies
    for(let e of enemies) {
      ctx.beginPath();
      ctx.fillStyle = e.color;
      ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Player
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Player Glow
    ctx.shadowColor = player.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw Player HP
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(player.x - 15, player.y + 20, 30, 4);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(player.x - 15, player.y + 20, 30 * (player.hp! / 100), 4);

    // Draw Virtual Joystick (if active)
    if (leftTouchRef.current.active) {
       ctx.beginPath();
       ctx.strokeStyle = 'rgba(255,255,255,0.2)';
       ctx.lineWidth = 2;
       ctx.arc(leftTouchRef.current.originX, leftTouchRef.current.originY, 50, 0, Math.PI * 2);
       ctx.stroke();

       ctx.beginPath();
       ctx.fillStyle = 'rgba(255,255,255,0.5)';
       ctx.arc(leftTouchRef.current.x, leftTouchRef.current.y, 15, 0, Math.PI * 2);
       ctx.fill();
    }
  };

  animationId = requestAnimationFrame(loop);

  return { stop: () => cancelAnimationFrame(animationId) };
}

export function cleanupGameLoop(stateRef: { stop: () => void } | undefined) {
  if (stateRef) {
    stateRef.stop();
  }
}
