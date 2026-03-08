'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

interface GlowPosition {
  x: number;
  y: number;
}

export function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<GlowPosition | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [reducedMotion]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition(null);
  }, []);

  const glowStyle: React.CSSProperties = isHovered && position
    ? {
        background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(111, 156, 166, 0.08), transparent 60%)`,
      }
    : {};

  return {
    ref,
    glowStyle,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
