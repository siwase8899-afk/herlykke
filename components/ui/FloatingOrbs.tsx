'use client';

/**
 * FloatingOrbs — Ambient background decoration
 * Soft, blurred circles that drift gently. Low stimulation, calming presence.
 * Use as a background layer with pointer-events-none.
 */

interface OrbConfig {
  size: number;
  x: string;
  y: string;
  color: string;
  delay: string;
  duration: string;
}

const DEFAULT_ORBS: OrbConfig[] = [
  { size: 180, x: '10%',  y: '15%', color: 'rgba(111, 156, 166, 0.08)', delay: '0s',  duration: '18s' },
  { size: 140, x: '75%',  y: '10%', color: 'rgba(201, 166, 201, 0.06)', delay: '-4s', duration: '22s' },
  { size: 100, x: '50%',  y: '60%', color: 'rgba(184, 224, 198, 0.06)', delay: '-8s', duration: '16s' },
  { size: 200, x: '85%',  y: '70%', color: 'rgba(111, 156, 166, 0.08)', delay: '-2s', duration: '24s' },
  { size: 120, x: '25%',  y: '80%', color: 'rgba(201, 166, 201, 0.06)', delay: '-6s', duration: '20s' },
];

interface FloatingOrbsProps {
  orbs?: OrbConfig[];
  className?: string;
}

export function FloatingOrbs({ orbs = DEFAULT_ORBS, className = '' }: FloatingOrbsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-xy"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            backgroundColor: orb.color,
            filter: `blur(${orb.size * 0.4}px)`,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
          }}
        />
      ))}
    </div>
  );
}
