'use client';

import { useId } from 'react';

type SleepRecoveryIllustrationProps = {
  className?: string;
  compact?: boolean;
};

export function SleepRecoveryIllustration({ className = '', compact = false }: SleepRecoveryIllustrationProps) {
  const rawId = useId().replace(/:/g, '');
  const orbId = `sleepOrb-${rawId}`;
  const pillowId = `sleepPillow-${rawId}`;
  const shadowId = `softShadow-${rawId}`;
  const glowId = `innerGlow-${rawId}`;

  return (
    <svg
      viewBox="0 0 520 420"
      className={className}
      role="img"
      aria-label="차분한 수면 회복을 표현한 3D 일러스트"
    >
      <defs>
        <linearGradient id={orbId} x1="16%" x2="84%" y1="8%" y2="92%">
          <stop offset="0%" stopColor="#FFE6D4" />
          <stop offset="48%" stopColor="#F0642B" />
          <stop offset="100%" stopColor="#789986" />
        </linearGradient>
        <linearGradient id={pillowId} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F6EBDF" />
        </linearGradient>
        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#4A332B" floodOpacity="0.16" />
        </filter>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g className="sleep-illustration-float" filter={`url(#${shadowId})`}>
        <ellipse cx="260" cy="328" rx="170" ry="42" fill="#D9BBA6" opacity="0.22" />
        <rect x="112" y="194" width="296" height="92" rx="34" fill={`url(#${pillowId})`} />
        <rect x="142" y="220" width="236" height="80" rx="30" fill="#FFFFFF" opacity="0.72" />
        <path
          d="M170 242 C206 222 243 224 280 247 C315 269 347 269 382 244"
          fill="none"
          stroke="#789986"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.58"
        />
      </g>

      <g className="sleep-illustration-orbit">
        <circle cx="265" cy="152" r="78" fill={`url(#${orbId})`} filter={`url(#${glowId})`} opacity="0.92" />
        <circle cx="236" cy="123" r="19" fill="#FFFFFF" opacity="0.34" />
        <path
          d="M278 102 C248 119 237 158 254 188 C269 215 304 225 333 210 C313 235 274 241 245 220 C211 196 202 149 224 115 C237 95 256 84 278 82 C279 89 280 96 278 102 Z"
          fill="#FFFFFF"
          opacity="0.52"
        />
      </g>

      <g className="sleep-illustration-scribble" fill="none" strokeLinecap="round">
        <path d="M108 120 C132 92 164 94 178 118" stroke="#F5D8C5" strokeWidth="8" opacity="0.74" />
        <path d="M360 116 C390 96 420 108 430 138" stroke="#DCE8DF" strokeWidth="8" opacity="0.78" />
        <path d="M112 334 C150 360 203 361 237 340" stroke="#C9A6C9" strokeWidth="5" opacity="0.42" />
        <path d="M333 332 C365 352 407 344 430 318" stroke="#789986" strokeWidth="5" opacity="0.38" />
      </g>

      {!compact && (
        <g className="sleep-illustration-breath" opacity="0.84">
          <circle cx="145" cy="170" r="10" fill="#789986" opacity="0.52" />
          <circle cx="394" cy="182" r="7" fill="#F0642B" opacity="0.42" />
          <circle cx="366" cy="72" r="12" fill="#F5D8C5" opacity="0.76" />
          <circle cx="166" cy="74" r="7" fill="#DCE8DF" opacity="0.9" />
        </g>
      )}
    </svg>
  );
}
