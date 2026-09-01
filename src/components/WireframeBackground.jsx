import React, { useEffect, useRef } from 'react';

export default function WireframeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildCircuitNodes();
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      targetMouseY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // ==================================================
    // 1. CYBER CIRCUIT BOARD TRACES & NODES BUILDER
    // ==================================================
    let circuitLines = [];
    let dataPulses = [];
    let HUDPanels = [];

    function buildCircuitNodes() {
      circuitLines = [];
      dataPulses = [];
      HUDPanels = [];

      const centerX = width / 2;
      const centerY = height * 0.45;

      // Primary radial circuit buses branching from CPU Core
      const busAngles = [0, 45, 90, 135, 180, 225, 270, 315];
      busAngles.forEach((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        const len1 = 80 + (idx % 3) * 40;
        const p1 = { x: centerX + Math.cos(rad) * len1, y: centerY + Math.sin(rad) * len1 };

        // Turn right angles (orthogonal circuit bus)
        const turnDir = idx % 2 === 0 ? 1 : -1;
        const p2 = { x: p1.x + turnDir * (120 + Math.random() * 100), y: p1.y };
        const p3 = { x: p2.x, y: p2.y + turnDir * (140 + Math.random() * 120) };

        const linePath = [
          { x: centerX, y: centerY },
          p1,
          p2,
          p3,
          { x: p3.x + (Math.random() - 0.5) * 200, y: p3.y }
        ];

        circuitLines.push(linePath);

        // Add 2-3 traveling data pulses per circuit bus line
        for (let k = 0; k < 2; k++) {
          dataPulses.push({
            lineIdx: circuitLines.length - 1,
            segment: 0,
            progress: Math.random(),
            speed: 0.008 + Math.random() * 0.008,
            size: Math.random() * 2.5 + 2,
            color: k % 2 === 0 ? '#00f0ff' : '#ffffff',
          });
        }
      });

      // Secondary Grid Circuit Bus Lines
      for (let y = 100; y < height; y += 160) {
        const linePath = [
          { x: 40, y },
          { x: width * 0.3, y },
          { x: width * 0.3, y: y + (y % 320 === 0 ? 60 : -60) },
          { x: width * 0.7, y: y + (y % 320 === 0 ? 60 : -60) },
          { x: width * 0.7, y },
          { x: width - 40, y }
        ];
        circuitLines.push(linePath);

        dataPulses.push({
          lineIdx: circuitLines.length - 1,
          segment: 0,
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.006,
          size: 2.2,
          color: '#38bdf8',
        });
      }

      // Background HUD Panels (Signal Meters, Matrix Keypads, Logic Nodes)
      HUDPanels = [
        { x: width * 0.12, y: height * 0.2, w: 100, h: 80, type: 'matrix' },
        { x: width * 0.78, y: height * 0.18, w: 110, h: 90, type: 'meters' },
        { x: width * 0.82, y: height * 0.65, w: 120, h: 100, type: 'cpu' },
        { x: width * 0.15, y: height * 0.7, w: 90, h: 75, type: 'status' },
      ];
    }

    buildCircuitNodes();

    // ==================================================
    // 2. INTERACTIVE TOUCH/CLICK CIRCUIT PULSE EXPLOSIONS
    // ==================================================
    const bursts = [];
    const createBurst = (x, y) => {
      const count = 28 + Math.floor(Math.random() * 12);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        bursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 1,
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02,
          color: ['rgba(6, 182, 212,', 'rgba(59, 130, 246,', 'rgba(255, 255, 255,'][Math.floor(Math.random() * 3)],
        });
      }
    };

    const handlePointerClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      createBurst(x, y);
    };

    canvas.addEventListener('click', handlePointerClick);
    canvas.addEventListener('touchstart', handlePointerClick, { passive: true });

    // ==================================================
    // 3. RENDER LOOP
    // ==================================================
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const centerX = width / 2;
      const centerY = height * 0.45;

      // --- A. AMBIENT NEBULA BACKDROP GLOW ---
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.6);
      bgGlow.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
      bgGlow.addColorStop(0.5, 'rgba(15, 23, 42, 0.05)');
      bgGlow.addColorStop(1, 'rgba(7, 9, 14, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // --- B. CENTRAL PROCESSOR CPU CORE HUD ---
      ctx.save();
      ctx.translate(centerX, centerY);

      // Rotating Concentric Targeting Reticles & Radar Rings
      ctx.rotate(t * 0.15);
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 8]);
      ctx.stroke();

      ctx.rotate(-t * 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, 58, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 10, 5, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // CPU Microchip Square Center
      const chipSize = 44;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#06b6d4';
      ctx.fillRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);
      ctx.strokeRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);
      ctx.shadowBlur = 0;

      // Microchip Connection Pins
      for (let p = -16; p <= 16; p += 8) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(p - 1.5, -chipSize / 2 - 5, 3, 5);
        ctx.fillRect(p - 1.5, chipSize / 2, 3, 5);
        ctx.fillRect(-chipSize / 2 - 5, p - 1.5, 5, 3);
        ctx.fillRect(chipSize / 2, p - 1.5, 5, 3);
      }

      // Pulsing Core CPU Heartbeat Light
      const pulseRadius = 8 + Math.sin(t * 4) * 3;
      ctx.beginPath();
      ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // --- C. RENDER NEON CIRCUIT BUS TRACES & TERMINAL NODES ---
      circuitLines.forEach((path) => {
        if (path.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);

        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Terminal junction dots
        path.forEach((pt, idx) => {
          if (idx === 0) return;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#06b6d4';
          ctx.fill();
        });
      });

      // --- D. ANIMATE DIGITAL DATA PULSES TRAVESING CIRCUITS ---
      dataPulses.forEach((dp) => {
        const path = circuitLines[dp.lineIdx];
        if (!path || path.length < 2) return;

        dp.progress += dp.speed;
        if (dp.progress >= 1.0) {
          dp.progress = 0;
          dp.segment = (dp.segment + 1) % (path.length - 1);
        }

        const p1 = path[dp.segment];
        const p2 = path[(dp.segment + 1) % path.length];
        if (!p1 || !p2) return;

        const currX = p1.x + (p2.x - p1.x) * dp.progress;
        const currY = p1.y + (p2.y - p1.y) * dp.progress;

        // Draw Data Pulse Light Node
        ctx.beginPath();
        ctx.arc(currX, currY, dp.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(currX, currY, dp.size, 0, Math.PI * 2);
        ctx.fillStyle = dp.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- E. DRAW BACKGROUND CYBER HUD PANELS & METERS ---
      HUDPanels.forEach((panel) => {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(panel.x, panel.y, panel.w, panel.h);

        // Panel header bar
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.fillRect(panel.x, panel.y, panel.w, 14);

        if (panel.type === 'matrix') {
          // Matrix keypad grid
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              ctx.fillStyle = (r + c + Math.floor(t * 2)) % 3 === 0 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(15, 23, 42, 0.6)';
              ctx.fillRect(panel.x + 10 + c * 26, panel.y + 24 + r * 16, 20, 12);
            }
          }
        } else if (panel.type === 'meters') {
          // Signal bars
          for (let b = 0; b < 6; b++) {
            const hBar = 15 + Math.sin(t * 4 + b) * 12 + 15;
            ctx.fillStyle = '#06b6d4';
            ctx.fillRect(panel.x + 12 + b * 14, panel.y + panel.h - 10 - hBar, 9, hBar);
          }
        }
      });

      // --- F. DRAW CLICK/TOUCH PARTICLES BURST ---
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.96;
        b.vy *= 0.96;
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color}${b.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('click', handlePointerClick);
      canvas.removeEventListener('touchstart', handlePointerClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#07090e]">
      {/* Cyber Security Circuit Board & HUD Motion Engine Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ pointerEvents: 'all' }}
      />
    </div>
  );
}
