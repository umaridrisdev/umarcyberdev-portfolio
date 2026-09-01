import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RotateCw, Compass, ShieldCheck, Cpu, Rocket, Award, ChevronRight, ChevronLeft, Sparkles, MapPin } from 'lucide-react';
import CartoonRobotAvatar from './CartoonRobotAvatar';

export default function MoonSpaceTour({ isOpen, onClose }) {
  const [activeOutpostIdx, setActiveOutpostIdx] = useState(0);
  const [isAutoTouring, setIsAutoTouring] = useState(false);
  const [moonRotation, setMoonRotation] = useState(0);
  const canvasRef = useRef(null);

  // Outposts on the Moon & Deep Space
  const outposts = [
    {
      id: 'secplus-base',
      title: 'CompTIA Security+ Defense Outpost',
      coord: 'Lunar Latitude: 20.6°N | Longitude: 31.1°E (Sea of Tranquility)',
      category: 'CYBERSECURITY & HARDENING',
      icon: ShieldCheck,
      color: 'text-cyan-400',
      badge: '🛡️ COMPTIA CERTIFIED BASE',
      description: 'The core defensive station of Umar’s portfolio. Equipped with NIST SP 800-53 threat defense protocols, network vulnerability scanners, and SOC incident response procedures.',
      techs: ['CompTIA Security+ (SY0-701)', 'NIST SP 800-53', 'Cisco Ethical Hacking', 'SOC Incident Response', 'Wireshark']
    },
    {
      id: 'apoxyl-station',
      title: 'ApoxylTech Innovation Station',
      coord: 'Lunar Latitude: 0.6°S | Longitude: 23.4°W (Oceanus Procellarum)',
      category: 'ENTREPRENEURSHIP & HUB',
      icon: Rocket,
      color: 'text-emerald-400',
      badge: '🚀 APOXYLTECH HEADQUARTERS',
      description: 'The flagship tech innovation hub founded by Umar in Bauchi State, Nigeria. Dedicated to empowering youth across Africa with practical full-stack software skills and cybersecurity training.',
      techs: ['Software Architecture', 'Digital Identity Systems', 'Mentorship Labs', 'Community Tech Incubator']
    },
    {
      id: 'ai-vision-lab',
      title: 'AI & Computer Vision Research Dome',
      coord: 'Lunar Latitude: 43.1°N | Longitude: 11.2°W (Sinus Iridum)',
      category: 'ARTIFICIAL INTELLIGENCE',
      icon: Cpu,
      color: 'text-indigo-400',
      badge: '🤖 AI & COMPUTER VISION',
      description: 'Deep space AI research facility housing KdexSmArt Facial Recognition Attendance Systems and AI-Powered Student Admission Management Platforms.',
      techs: ['Python', 'OpenCV / Computer Vision', 'React', 'Node.js', 'PostgreSQL', 'SQLite']
    },
    {
      id: 'scholars-outpost',
      title: 'Power Learn Project Scholar Station',
      coord: 'Lunar Latitude: 14.6°S | Longitude: 175.4°W (Far Side Lunar Basin)',
      category: 'SCHOLARSHIP & IMPACT',
      icon: Award,
      color: 'text-amber-400',
      badge: '⚡ SCHOLARSHIP OUTPOST',
      description: 'Full-stack software engineering scholarship base focused on building scalable, real-world digital applications for social impact in Africa.',
      techs: ['Full-Stack Web', 'Database Systems', 'Agile Engineering', 'Tech for Impact']
    },
    {
      id: 'galaxies-sector',
      title: 'Galaxies Deep Space Sector',
      coord: 'Deep Space Telemetry | Coords: 0.0001 Light Years beyond Lunar Orbit',
      category: 'DEEP SPACE EXPLORATION',
      icon: Sparkles,
      color: 'text-purple-400',
      badge: '🌌 GALAXIES SECTOR',
      description: 'Galaxies: Massive groups of billions of stars, gas, and dust held together by gravity. Symbolizing Umar’s unlimited ambition, scalable system engineering, and vision for global technology impact.',
      techs: ['Galactic Data Systems', 'Quantum Computing Concepts', 'Infinite Scalability', 'AI Research']
    }
  ];

  // Canvas background rendering stardust, glowing Moon, and space nebulae
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars background
    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.02;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, Math.min(1, star.alpha))})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  // Rotate moon continuously or during auto tour
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setMoonRotation((prev) => (prev + 0.5) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Guided Tour Mode Interval
  useEffect(() => {
    if (!isAutoTouring || !isOpen) return;
    const interval = setInterval(() => {
      setActiveOutpostIdx((prev) => (prev + 1) % outposts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoTouring, isOpen, outposts.length]);

  if (!isOpen) return null;

  const currentOutpost = outposts[activeOutpostIdx];
  const IconComp = currentOutpost.icon;

  return (
    <div className="fixed inset-0 z-50 bg-[#04060a] text-slate-100 font-sans flex flex-col overflow-hidden animate-in fade-in duration-300">
      
      {/* Space Canvas Stars Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Top Header Bar */}
      <div className="relative z-20 px-6 py-4 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white tracking-wider text-sm flex items-center gap-2">
              LUNAR & GALAXIES SPACE TOUR
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px]">APOXYL LUNAR ORBIT</span>
            </h3>
            <p className="text-[11px] text-slate-400">Interactive 3D Moon Surface & Galaxies Deep Space Telemetry</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoTouring(!isAutoTouring)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              isAutoTouring
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isAutoTouring ? 'animate-spin' : ''}`} />
            <span>{isAutoTouring ? 'Guided Tour Active (Auto)' : 'Start Guided Tour'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Galaxy Definition Banner */}
      <div className="relative z-20 bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-950/80 border-b border-purple-500/30 px-6 py-2 flex items-center justify-center gap-2 font-mono text-xs text-purple-300 text-center">
        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse flex-shrink-0" />
        <span><strong>Galaxies:</strong> Massive groups of billions of stars, gas, and dust held together by gravity.</span>
      </div>

      {/* Main Moon Space Tour Workspace */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Column: 3D Moon Surface Viewport */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-8 select-none">
          
          {/* Animated Glowing 3D Moon Container */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full flex items-center justify-center shadow-2xl">
            
            {/* Atmosphere Glow Ring */}
            <div className="absolute -inset-6 rounded-full bg-cyan-500/20 blur-2xl animate-pulse pointer-events-none" />

            {/* Rendered 3D Moon Body */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-[inset_-25px_-25px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.3)] transition-transform duration-500"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #94a3b8 0%, #475569 45%, #1e293b 75%, #090d16 100%)'
              }}
            >
              {/* Moon Craters & Surface Texture */}
              <div
                className="absolute inset-0 opacity-40 transition-transform duration-300"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 30%, #0f172a 12px, transparent 13px),
                    radial-gradient(circle at 25% 65%, #0f172a 18px, transparent 19px),
                    radial-gradient(circle at 75% 55%, #0f172a 15px, transparent 16px),
                    radial-gradient(circle at 40% 80%, #0f172a 10px, transparent 11px),
                    radial-gradient(circle at 70% 25%, #0f172a 8px, transparent 9px)
                  `,
                  transform: `rotate(${moonRotation}deg)`
                }}
              />

              {/* Interactive Lunar Outpost Markers on the Moon Surface */}
              {outposts.map((outpost, idx) => {
                const angle = (idx * (360 / outposts.length) + moonRotation) * (Math.PI / 180);
                const r = 130; // radius offset
                const posX = Math.cos(angle) * r;
                const posY = Math.sin(angle) * r;
                const isSelected = idx === activeOutpostIdx;

                return (
                  <button
                    key={outpost.id}
                    onClick={() => {
                      setActiveOutpostIdx(idx);
                      setIsAutoTouring(false);
                    }}
                    className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'scale-125 bg-cyan-500 text-slate-950 ring-4 ring-cyan-400/50 shadow-2xl z-40'
                        : 'bg-slate-900/90 border border-slate-700 text-slate-300 hover:scale-110 hover:border-cyan-400'
                    }`}
                    style={{
                      left: `calc(50% + ${posX}px)`,
                      top: `calc(50% + ${posY}px)`
                    }}
                    title={outpost.title}
                  >
                    <MapPin className={`w-4 h-4 ${isSelected ? 'animate-bounce' : ''}`} />
                  </button>
                );
              })}
            </div>

            {/* Orbit Ring */}
            <div className="absolute inset-[-40px] rounded-full border border-cyan-500/20 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none" />
          </div>

          {/* Floating Live Robot Astronaut Guide */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md font-mono text-xs">
            <CartoonRobotAvatar size="medium" isWaving={true} emotion="happy" />
            <div>
              <p className="text-cyan-400 font-bold">Apoxyl Astronaut Bot</p>
              <p className="text-slate-400 text-[11px]">Orbiting Lunar Station &bull; Click Outposts!</p>
            </div>
          </div>

        </div>

        {/* Right Column: Outpost Telemetry & Mission Intel Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-950/90 border-l border-slate-800/80 backdrop-blur-xl flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-6">
            
            {/* Outpost Category & Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs font-bold">
                {currentOutpost.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Outpost {activeOutpostIdx + 1} of {outposts.length}
              </span>
            </div>

            {/* Outpost Title & Icon */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center ${currentOutpost.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    {currentOutpost.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {currentOutpost.title}
                  </h2>
                </div>
              </div>

              <p className="text-xs font-mono text-cyan-400/90 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentOutpost.coord}</span>
              </p>
            </div>

            {/* Intel Description */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Mission Intel & Objectives</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-sans bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                {currentOutpost.description}
              </p>
            </div>

            {/* Outpost Stack Badges */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Deployed Security & Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {currentOutpost.techs.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Tour Controls Navigation Bar */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
            <button
              onClick={() => {
                setActiveOutpostIdx((prev) => (prev - 1 + outposts.length) % outposts.length);
                setIsAutoTouring(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Station</span>
            </button>

            <button
              onClick={() => {
                setActiveOutpostIdx((prev) => (prev + 1) % outposts.length);
                setIsAutoTouring(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Next Station</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
