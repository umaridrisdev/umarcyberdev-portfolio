import React from 'react';

export default function CartoonRobotAvatar({ 
  size = 'large', 
  isTalking = false, 
  isWaving = true, 
  emotion = 'happy' 
}) {
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
    xlarge: 'w-32 h-32',
    giant: 'w-44 h-44'
  }[size] || 'w-24 h-24';

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses} select-none transition-transform duration-300 group`}>
      {/* Soft Ambient Glowing Halo */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-500/30 to-emerald-400/30 rounded-full blur-xl animate-pulse pointer-events-none" />

      {/* SVG Cartoon Robot with Live Moving Waving Hands */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full relative z-10 drop-shadow-2xl animate-[bounce_2.5s_infinite_ease-in-out]"
      >
        <defs>
          <linearGradient id="botHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="botBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Antenna Stem */}
        <line x1="60" y1="20" x2="60" y2="8" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
        
        {/* Antenna Glowing Orb */}
        <circle cx="60" cy="7" r="6" fill="#34d399" filter="url(#glow)">
          <animate attributeName="r" values="5;7;5" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="fill" values="#34d399;#06b6d4;#34d399" dur="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Robot Head Outer Frame */}
        <rect x="22" y="20" width="76" height="56" rx="20" fill="url(#botHeadGrad)" stroke="#06b6d4" strokeWidth="3.5" />
        
        {/* Robot Visor Screen */}
        <rect x="30" y="28" width="60" height="38" rx="14" fill="#07090e" stroke="#38bdf8" strokeWidth="2" />

        {/* Cute Glowing Pink Cheeks */}
        <circle cx="38" cy="52" r="4.5" fill="#f43f5e" opacity="0.7" />
        <circle cx="82" cy="52" r="4.5" fill="#f43f5e" opacity="0.7" />

        {/* Robot Eyes (Big Friendly LED Eyes with Highlights) */}
        {emotion === 'happy' ? (
          <>
            {/* Left Eye */}
            <circle cx="46" cy="42" r="7" fill="#00f0ff" filter="url(#glow)">
              <animate attributeName="r" values="6;7.5;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="48" cy="40" r="2.5" fill="#ffffff" />

            {/* Right Eye */}
            <circle cx="74" cy="42" r="7" fill="#00f0ff" filter="url(#glow)">
              <animate attributeName="r" values="6;7.5;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="76" cy="40" r="2.5" fill="#ffffff" />
          </>
        ) : (
          <>
            <path d="M 40 44 Q 46 36 52 44" fill="none" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
            <path d="M 68 44 Q 74 36 80 44" fill="none" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {/* Animated Mouth (Talking or Smiling) */}
        {isTalking ? (
          <g filter="url(#glow)">
            <rect x="46" y="54" width="28" height="6" rx="3" fill="#34d399">
              <animate attributeName="height" values="3;10;3" dur="0.25s" repeatCount="indefinite" />
            </rect>
          </g>
        ) : (
          <path d="M 48 54 Q 60 63 72 54" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Robot Ears / Headphones */}
        <rect x="15" y="36" width="8" height="22" rx="4" fill="#06b6d4" />
        <rect x="97" y="36" width="8" height="22" rx="4" fill="#06b6d4" />

        {/* Body Neck Connection */}
        <rect x="52" y="76" width="16" height="6" rx="2" fill="#475569" />

        {/* Metallic Cute Body */}
        <rect x="32" y="82" width="56" height="34" rx="16" fill="url(#botBodyGrad)" stroke="#38bdf8" strokeWidth="2.5" />

        {/* Chest Reactor Core */}
        <circle cx="60" cy="96" r="8" fill="#07090e" stroke="#00f0ff" strokeWidth="2" />
        <circle cx="60" cy="96" r="4.5" fill="#34d399" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
        </circle>

        {/* LIVE MOVING WAVING LEFT HAND */}
        <g className="origin-[30px_88px]">
          <path d="M 32 88 Q 16 70 14 48" fill="none" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 30 88; -30 30 88; 15 30 88; 0 30 88"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </path>
          {/* Hand Palm */}
          <circle cx="14" cy="48" r="6" fill="#38bdf8" stroke="#06b6d4" strokeWidth="1.5">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 30 88; -30 30 88; 15 30 88; 0 30 88"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* LIVE MOVING RIGHT HAND */}
        <g className="origin-[90px_88px]">
          <path d="M 88 88 Q 104 98 108 108" fill="none" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 90 88; 15 90 88; -10 90 88; 0 90 88"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </path>
          <circle cx="108" cy="108" r="6" fill="#38bdf8" stroke="#06b6d4" strokeWidth="1.5">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 90 88; 15 90 88; -10 90 88; 0 90 88"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

      </svg>
    </div>
  );
}
