'use client';

import { useEffect, useState } from 'react';

/**
 * SleepCycleViz — Animated moon phases for sleep tracking.
 * Shows current sleep cycle phase with gentle animated transitions.
 * Can display: sleep quality trend, current phase, or decorative moon.
 */

interface MoonPhase {
  name: string;
  label: string;
  illumination: number; // 0-1
}

const MOON_PHASES: MoonPhase[] = [
  { name: 'new',             label: '새달',     illumination: 0 },
  { name: 'waxing_crescent', label: '초승달',   illumination: 0.25 },
  { name: 'first_quarter',   label: '상현달',   illumination: 0.5 },
  { name: 'waxing_gibbous',  label: '볼록달',   illumination: 0.75 },
  { name: 'full',            label: '보름달',   illumination: 1 },
  { name: 'waning_gibbous',  label: '기울어진달', illumination: 0.75 },
  { name: 'last_quarter',    label: '하현달',   illumination: 0.5 },
  { name: 'waning_crescent', label: '그믐달',   illumination: 0.25 },
];

interface SleepCycleVizProps {
  /** Sleep quality 0-100, maps to moon phase */
  quality?: number;
  /** Size in pixels */
  size?: number;
  /** Show phase label */
  showLabel?: boolean;
  /** Animate through phases continuously */
  animate?: boolean;
  /** Animation speed in ms per phase */
  animationSpeed?: number;
  /** Compact mode for inline selectors — hides ambient glow + stars */
  compact?: boolean;
}

export function SleepCycleViz({
  quality,
  size = 80,
  showLabel = false,
  animate = false,
  animationSpeed = 3000,
  compact = false,
}: SleepCycleVizProps) {
  const [currentPhase, setCurrentPhase] = useState(0);

  // Map quality score to phase index
  useEffect(() => {
    if (quality !== undefined && !animate) {
      // Map 0-100 to phase index 0-4 (new moon to full moon)
      const idx = Math.round((quality / 100) * 4);
      setCurrentPhase(Math.min(4, Math.max(0, idx)));
    }
  }, [quality, animate]);

  // Continuous animation mode
  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      setCurrentPhase((p) => (p + 1) % MOON_PHASES.length);
    }, animationSpeed);
    return () => clearInterval(interval);
  }, [animate, animationSpeed]);

  const phase = MOON_PHASES[currentPhase];
  const half = size / 2;
  const r = half - 2;

  // Calculate moon shadow position based on illumination
  const shadowOffset = (1 - phase.illumination * 2) * r;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Ambient glow */}
        {!compact && (
          <div
            className="absolute inset-0 rounded-full animate-breathe-slow"
            style={{
              backgroundColor: `rgba(240, 216, 178, ${0.12 + phase.illumination * 0.22})`,
              filter: `blur(${size * 0.25}px)`,
            }}
          />
        )}

        {/* Moon body */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative">
          {/* Full circle (light side) */}
          <circle
            cx={half}
            cy={half}
            r={r}
            fill="#F4EAD8"
            className="transition-all duration-1000"
          />

          {/* Shadow overlay — creates phase effect (밤 인디고) */}
          <ellipse
            cx={half + shadowOffset * 0.3}
            cy={half}
            rx={Math.abs(r * (1 - phase.illumination))}
            ry={r}
            fill="#29314C"
            opacity={0.72}
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Subtle surface texture */}
          <circle cx={half - r * 0.2} cy={half - r * 0.15} r={r * 0.08} fill="rgba(255,255,255,0.15)" />
          <circle cx={half + r * 0.25} cy={half + r * 0.2} r={r * 0.06} fill="rgba(255,255,255,0.1)" />
          <circle cx={half - r * 0.05} cy={half + r * 0.35} r={r * 0.1} fill="rgba(255,255,255,0.08)" />
        </svg>

        {/* Tiny stars around the moon */}
        {!compact && [
          { x: '10%', y: '5%',   s: 2, d: '0s' },
          { x: '85%', y: '15%',  s: 1.5, d: '-1s' },
          { x: '5%',  y: '80%',  s: 1.5, d: '-2s' },
          { x: '90%', y: '75%',  s: 2, d: '-0.5s' },
          { x: '50%', y: '0%',   s: 1, d: '-1.5s' },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-hlk-primary-light animate-live-pulse"
            style={{
              width: star.s,
              height: star.s,
              left: star.x,
              top: star.y,
              animationDelay: star.d,
            }}
          />
        ))}
      </div>

      {showLabel && (
        <p className="text-xs text-hlk-text-tertiary font-medium transition-all duration-500">
          {phase.label}
        </p>
      )}
    </div>
  );
}
