'use client';

import { FloatingOrbs } from './FloatingOrbs';

interface AmbientPageWrapperProps {
  children: React.ReactNode;
  variant?: 'calm' | 'warm' | 'night';
  className?: string;
}

const VARIANT_ORBS = {
  calm: [
    { size: 160, x: '15%', y: '10%', color: 'rgba(94, 122, 150, 0.06)', delay: '0s', duration: '20s' },
    { size: 120, x: '80%', y: '20%', color: 'rgba(212, 224, 235, 0.08)', delay: '-5s', duration: '24s' },
    { size: 100, x: '50%', y: '70%', color: 'rgba(94, 122, 150, 0.04)', delay: '-10s', duration: '18s' },
  ],
  warm: [
    { size: 180, x: '10%', y: '15%', color: 'rgba(201, 140, 140, 0.06)', delay: '0s', duration: '22s' },
    { size: 140, x: '75%', y: '10%', color: 'rgba(240, 213, 213, 0.08)', delay: '-4s', duration: '20s' },
    { size: 100, x: '40%', y: '65%', color: 'rgba(201, 140, 140, 0.04)', delay: '-8s', duration: '26s' },
  ],
  night: [
    { size: 200, x: '5%', y: '10%', color: 'rgba(74, 98, 120, 0.08)', delay: '0s', duration: '24s' },
    { size: 150, x: '70%', y: '15%', color: 'rgba(94, 122, 150, 0.06)', delay: '-6s', duration: '20s' },
    { size: 120, x: '45%', y: '60%', color: 'rgba(212, 224, 235, 0.05)', delay: '-12s', duration: '28s' },
  ],
};

export function AmbientPageWrapper({ children, variant = 'calm', className = '' }: AmbientPageWrapperProps) {
  return (
    <div className={`ambient-page relative ${className}`}>
      <FloatingOrbs orbs={VARIANT_ORBS[variant]} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
