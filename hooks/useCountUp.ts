'use client';

import { useEffect, useState, useCallback } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  enabled?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  enabled,
}: UseCountUpOptions) {
  const { ref, isVisible: selfVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const isVisible = enabled !== undefined ? enabled : selfVisible;
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion()) {
      setDisplayValue(`${prefix}${end.toFixed(decimals)}${suffix}`);
      return;
    }

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * end;

      setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [isVisible, end, duration, decimals, suffix, prefix, prefersReducedMotion]);

  return { ref, displayValue, isVisible };
}
