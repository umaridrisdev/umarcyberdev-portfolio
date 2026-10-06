import React, { useEffect, useRef } from 'react';

export default function WireframeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      if (prefersReducedMotion) renderStatic();
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      targetMouseY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // ==================================================
    // 1. CYBER CIRCUIT TRACES & NODES BUILDER
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

        const turnDir = idx % 2 === 0 ? 1 : -1;
        const p2 = { x: p1.x + turnDir * (100 + Math.random() * 80), y: p1.y };
        const p3 = { x: p2.x, y: p2.y + turnDir * (120 + Math.random() * 100) };

        const linePath = [
          { x: centerX, y: centerY },
          p1,
          p2,
          p3,
          { x: p3.x + (Math.random() - 0.5) * 160, y: p3.y }
        ];

        circuitLines.push(linePath);

        dataPulses.push({
          lineIdx: circuitLines.length - 1,
          segment: 0,
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.006,
          size: 2,
          color: idx % 2 === 0 ? '#00f0ff' : '#38bdf8',
        });
      });

      // Secondary Grid Circuit Bus Lines
      for (let y = 140; y < height; y += 220) {
        const linePath = [
          { x: 30, y },
          { x: width * 0.3, y },
          { x: width * 0.3, y: y + (y % 440 === 0 ? 50 : -50) },
          { x: width * 0.7, y: y + (y % 440 === 0 ? 50 : -50) },
          { x: width * 0.7, y },
          { x: width - 30, y }
        ];
        circuitLines.push(linePath);

        dataPulses.push({
          lineIdx: circuitLines.length - 1,
          segment: 0,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.005,
          size: 2,
          color: '#06b6d4',
        });
      }

      // HUD Panels
      HUDPanels = [
        { x: width * 0.1, y: height * 0.22, w: 90, h: 70, type: 'matrix' },
        { x: width * 0.82, y: height * 0.2, w: 100, h: 80, type: 'meters' },
      ];
    }

    buildCircuitNodes();

    // Particle Bursts on Click
    const bursts = [];
    const createBurst = (x, y) => {
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        bursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          alpha: 1.0,
          decay: 0.02 + Math.random() * 0.02,
          color: 'rgba(6, 182, 212,',
        });
      }
    };

    const handlePointerClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      createBurst(x, y);
    };

    canvas.addEventListener('click', handlePointerClick, { passive: true });
    canvas.addEventListener('touchstart', handlePointerClick, { passive: true });

    // Static render for reduced motion users
    const renderStatic = () => {
      ctx.fillStyle = '#07090e';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.45;

      const bgGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.5);
      bgGlow.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      bgGlow.addColorStop(1, 'rgba(7, 9, 14, 1)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      circuitLines.forEach((path) => {
        if (path.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    if (prefersReducedMotion) {
      renderStatic();
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
      };
    }

    // ==================================================
    // 2. 60 FPS RENDER LOOP
    // ==================================================
    let t = 0;

    const render = () => {
      ctx.fillStyle = '#07090e';
      ctx.fillRect(0, 0, width, height);
      t += 0.015;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const centerX = width / 2;
      const centerY = height * 0.45;

      // Ambient radial glow
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.55);
      bgGlow.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      bgGlow.addColorStop(0.6, 'rgba(15, 23, 42, 0.03)');
      bgGlow.addColorStop(1, 'rgba(7, 9, 14, 1)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Central CPU Core Reticles
      ctx.save();
      ctx.translate(centerX, centerY);

      ctx.rotate(t * 0.1);
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 8]);
      ctx.stroke();

      ctx.rotate(-t * 0.2);
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([16, 8, 4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      const chipSize = 38;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.fillRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);
      ctx.strokeRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);

      const pulseRadius = 6 + Math.sin(t * 3) * 2;
      ctx.beginPath();
      ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.fill();

      ctx.restore();

      // Render Circuit Traces
      circuitLines.forEach((path) => {
        if (path.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.22)';
        ctx.lineWidth = 1;
        ctx.stroke();

        path.forEach((pt, idx) => {
          if (idx === 0) return;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
          ctx.fill();
        });
      });

      // Render Data Pulses
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

        ctx.beginPath();
        ctx.arc(currX, currY, dp.size * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(currX, currY, dp.size, 0, Math.PI * 2);
        ctx.fillStyle = dp.color;
        ctx.fill();
      });

      // Render Particle Bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.95;
        b.vy *= 0.95;
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color}${b.alpha})`;
        ctx.fill();
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
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#07090e] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
