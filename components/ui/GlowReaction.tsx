'use client';

import { useState } from 'react';

/**
 * GlowReaction — Community post reaction button with soft glowing pulse.
 * When pressed, shows a gentle pop + glow animation.
 */

interface GlowReactionProps {
  emoji: string;
  label: string;
  count: number;
  active?: boolean;
  onToggle?: () => void;
}

export function GlowReaction({ emoji, label, count, active = false, onToggle }: GlowReactionProps) {
  const [justClicked, setJustClicked] = useState(false);

  const handleClick = () => {
    setJustClicked(true);
    onToggle?.();
    setTimeout(() => setJustClicked(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        border transition-all duration-300
        ${active
          ? 'border-hlk-primary/30 bg-hlk-primary-light/50 text-hlk-primary animate-glow-pulse'
          : 'border-hlk-border/60 bg-white/80 text-hlk-text-secondary hover:border-hlk-primary/20'
        }
        ${justClicked ? 'animate-reaction-pop' : ''}
      `}
    >
      <span className={`transition-transform duration-300 ${justClicked ? 'scale-125' : ''}`}>
        {emoji}
      </span>
      <span>{label}</span>
      <span className={`text-xs tabular-nums ${active ? 'text-hlk-primary' : 'text-hlk-text-tertiary'}`}>
        {count}
      </span>
    </button>
  );
}
