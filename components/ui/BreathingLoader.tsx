'use client';

import { useEffect, useState } from 'react';

interface BreathingLoaderProps {
  /** Show/hide the loader */
  show?: boolean;
  /** Auto-dismiss after this many ms (0 = manual) */
  duration?: number;
  /** Callback when loader completes */
  onComplete?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show breathing guide text */
  showGuide?: boolean;
}

const PHASES = [
  { label: '들이쉬세요', duration: 4000 },
  { label: '잠시 멈추세요', duration: 4000 },
  { label: '내쉬세요', duration: 4000 },
];

const SIZE_MAP = {
  sm: { ring: 64, inner: 48, text: 'text-xs' },
  md: { ring: 96, inner: 72, text: 'text-sm' },
  lg: { ring: 128, inner: 96, text: 'text-base' },
};

export function BreathingLoader({
  show = true,
  duration = 0,
  onComplete,
  size = 'md',
  showGuide = true,
}: BreathingLoaderProps) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(show);

  // Cycle through breathing phases
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % PHASES.length);
    }, PHASES[phase].duration);
    return () => clearInterval(interval);
  }, [visible, phase]);

  // Auto-dismiss
  useEffect(() => {
    if (duration > 0 && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, visible, onComplete]);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  if (!visible) return null;

  const s = SIZE_MAP[size];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Breathing ring */}
      <div className="relative" style={{ width: s.ring, height: s.ring }}>
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full bg-hlk-primary/10 animate-breathe-slow"
          style={{ filter: 'blur(12px)' }}
        />

        {/* Main ring */}
        <div className="absolute inset-0 rounded-full border-2 border-hlk-primary/20 animate-breathe">
          <div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-hlk-primary-light to-hlk-accent-light animate-breathe"
            style={{ animationDelay: '-0.5s' }}
          />
        </div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full bg-hlk-primary/40 animate-breathe"
            style={{ width: s.inner * 0.3, height: s.inner * 0.3, animationDelay: '-1s' }}
          />
        </div>
      </div>

      {/* Breathing guide text */}
      {showGuide && (
        <div className="text-center">
          <p className={`${s.text} font-medium text-hlk-text-secondary transition-opacity duration-700`}>
            {PHASES[phase].label}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {PHASES.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i === phase ? 'bg-hlk-primary scale-125' : 'bg-hlk-border'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
