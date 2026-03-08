'use client';

import { useEffect, useState } from 'react';

interface UseParallaxOptions {
  speed?: number; // 0.0 ~ 1.0, lower = subtler
}

export function useParallax({ speed = 0.15 }: UseParallaxOptions = {}) {
  const [offset, setOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }

    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const parallaxStyle: React.CSSProperties = reducedMotion
    ? {}
    : { transform: `translateY(${offset}px)` };

  return { parallaxStyle, offset };
}
