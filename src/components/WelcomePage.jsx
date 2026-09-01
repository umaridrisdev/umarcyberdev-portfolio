import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Terminal, ArrowRight, Lock, Zap, Cpu } from 'lucide-react';
import CartoonRobotAvatar from './CartoonRobotAvatar';
import { resumeData } from '../data/resumeData';

export default function WelcomePage({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef(null);

  // Live Fiery Amber/Orange 3D Constellation Mesh & Glowing Embers Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      mouseY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    };
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // 1. Constellation Nodes (3D space projection)
    const nodeCount = Math.min(Math.floor(width / 14), 90);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      z: Math.random() * 800 + 100, // Z depth
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      vz: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 3 + 2,
      color: [
        'rgba(255, 120, 0,',  // Glowing Orange
        'rgba(255, 180, 0,',  // Amber Gold
        'rgba(255, 70, 0,',   // Fiery Red-Orange
        'rgba(255, 220, 100,',// Bright White-Yellow Core
      ][Math.floor(Math.random() * 4)],
    }));

    // 2. Floating Fiery Embers
    const emberCount = 60;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 1.5 + 0.5), // Drifting upward
      vx: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      decay: Math.random() * 0.008 + 0.004,
    }));

    let time = 0;

    // 3. Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      const fov = 400; // Focal length
      const cx = width / 2;
      const cy = height / 2;

      // Project 2D screen positions from 3D nodes
      const projectedNodes = nodes.map((n) => {
        // Move nodes in 3D
        n.x += n.vx + Math.sin(time + n.y * 0.002) * 0.4;
        n.y += n.vy + Math.cos(time + n.x * 0.002) * 0.4;
        n.z += n.vz;

        // Wrap boundaries in 3D space
        if (n.x > width) n.x = -width;
        if (n.x < -width) n.x = width;
        if (n.y > height) n.y = -height;
        if (n.y < -height) n.y = height;
        if (n.z > 900) n.z = 100;
        if (n.z < 100) n.z = 900;

        // Perspective projection formula
        const scale = fov / (fov + n.z);
        const sx = n.x * scale + cx;
        const sy = n.y * scale + cy;

        return {
          sx,
          sy,
          scale,
          radius: n.radius * scale,
          color: n.color,
          rawZ: n.z,
        };
      });

      // --- A. DRAW FIERY GEOMETRIC CONSTELLATION CONNECTING LINES ---
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.hypot(dx, dy);

          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.55 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);

            // Fiery Amber/Orange glowing line stroke
            ctx.strokeStyle = `rgba(255, 110, 0, ${lineAlpha})`;
            ctx.lineWidth = 1.6 * p1.scale;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ff6a00';
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // --- B. DRAW GLOWING CONSTELLATION NODE CORES ---
      projectedNodes.forEach((pn) => {
        // Outer Radial Halo
        const halo = ctx.createRadialGradient(pn.sx, pn.sy, 0, pn.sx, pn.sy, pn.radius * 4);
        halo.addColorStop(0, `${pn.color} 0.8)`);
        halo.addColorStop(1, `${pn.color} 0)`);

        ctx.beginPath();
        ctx.arc(pn.sx, pn.sy, pn.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Hot Core Dot
        ctx.beginPath();
        ctx.arc(pn.sx, pn.sy, pn.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${pn.color} 1.0)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ff8800';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- C. DRAW FLOATING FIERY EMBERS ---
      embers.forEach((emb) => {
        emb.y += emb.vy;
        emb.x += emb.vx + Math.sin(time * 2 + emb.y * 0.01) * 0.4;
        emb.alpha -= emb.decay;

        if (emb.alpha <= 0 || emb.y < -10) {
          emb.x = Math.random() * width;
          emb.y = height + 10;
          emb.alpha = Math.random() * 0.7 + 0.3;
        }

        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 0, ${emb.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ff4500';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleTouchOrClick = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 700); // 700ms cyber warp disintegration transition
  };

  return (
    <div
      onClick={handleTouchOrClick}
      onTouchStart={handleTouchOrClick}
      className={`fixed inset-0 z-50 bg-[#060302] select-none cursor-pointer flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isExiting ? 'scale-125 opacity-0 blur-2xl filter brightness-200' : 'scale-100 opacity-100 blur-0'
      }`}
    >
      {/* Fiery Amber 3D Constellation Mesh Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-25" />

      {/* Ambient Fiery Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Animated Robot & Shield Badge */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            {/* Outer Pulsing Cyber Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 rounded-full blur-xl opacity-60 animate-pulse" />
            <CartoonRobotAvatar size="giant" emotion="happy" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-amber-500/50 text-amber-400 font-mono text-xs tracking-widest uppercase shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>APOXYL CYBER GATEWAY v2.4</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight leading-none font-sans">
            UMAR IDRIS <span className="text-gradient">ABUBAKAR</span>
          </h1>
          <p className="text-lg sm:text-2xl font-mono text-amber-300 font-semibold tracking-wide">
            Cybersecurity Specialist & AI Software Engineer
          </p>
          <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-xl mx-auto leading-relaxed">
            Founder & CEO at ApoxylTech Innovation Hub &bull; CompTIA Security+ Certified (SY0-701)
          </p>
        </div>

        {/* Touch Prompt Banner */}
        <div className="pt-6 space-y-4">
          
          <button
            onClick={handleTouchOrClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-slate-950 font-mono font-extrabold text-sm tracking-wider shadow-2xl shadow-amber-500/40 hover:scale-105 transition-all duration-300"
          >
            <Zap className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>TOUCH / CLICK ANYWHERE TO ENTER PORTFOLIO</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] font-mono text-amber-400/90 animate-pulse uppercase tracking-widest">
            [ Interactive Fiery Constellation Motion Active &bull; Click to Disintegrate Gate ]
          </p>

        </div>

        {/* Live HUD System Telemetry Bar */}
        <div className="pt-8 border-t border-slate-800/80 max-w-2xl mx-auto grid grid-cols-3 gap-4 font-mono text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <p className="text-[10px] text-slate-500">ENCRYPTION</p>
            <p className="font-bold text-amber-400">TLS 1.3 / AES-256</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <p className="text-[10px] text-slate-500">NIST FRAMEWORK</p>
            <p className="font-bold text-emerald-400">COMPLIANT (98%)</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <p className="text-[10px] text-slate-500">STATUS</p>
            <p className="font-bold text-orange-400">SYSTEM READY</p>
          </div>
        </div>

      </div>
    </div>
  );
}
