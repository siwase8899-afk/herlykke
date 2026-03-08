'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * SunsetScroll — Background color shifts like a sunset as user scrolls.
 * Wraps children and applies a smooth gradient transition to the background.
 * Calming, low-stimulation effect.
 */

// Color stops: dawn → day → golden hour → dusk
const COLOR_STOPS = [
  { at: 0,    bg: '#F3F6F7' },     // Morning — light grey
  { at: 0.2,  bg: '#EAF0F2' },     // Cool tint
  { at: 0.4,  bg: '#C8DFE4' },     // Sage blue wash
  { at: 0.6,  bg: '#D8F0E2' },     // Soft mint
  { at: 0.8,  bg: '#E8D6E8' },     // Lavender
  { at: 1.0,  bg: '#EAF0F2' },     // Dusk — cool neutral
];

function interpolateColor(progress: number): string {
  // Find the two color stops we're between
  let startIdx = 0;
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    if (progress >= COLOR_STOPS[i].at && progress <= COLOR_STOPS[i + 1].at) {
      startIdx = i;
      break;
    }
  }

  const start = COLOR_STOPS[startIdx];
  const end = COLOR_STOPS[Math.min(startIdx + 1, COLOR_STOPS.length - 1)];
  const localProgress = (progress - start.at) / (end.at - start.at || 1);

  // Parse hex to RGB and interpolate
  const parseHex = (hex: string) => {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };

  const [r1, g1, b1] = parseHex(start.bg);
  const [r2, g2, b2] = parseHex(end.bg);

  const r = Math.round(r1 + (r2 - r1) * localProgress);
  const g = Math.round(g1 + (g2 - g1) * localProgress);
  const b = Math.round(b1 + (b2 - b1) * localProgress);

  return `rgb(${r}, ${g}, ${b})`;
}

interface SunsetScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function SunsetScroll({ children, className = '' }: SunsetScrollProps) {
  const [bgColor, setBgColor] = useState(COLOR_STOPS[0].bg);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? Math.min(1, window.scrollY / scrollHeight) : 0;
        setBgColor(interpolateColor(progress));
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-colors duration-700 ease-out ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
}
