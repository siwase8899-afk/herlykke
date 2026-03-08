'use client';

import { FloatingOrbs } from './FloatingOrbs';
import { BreathingLoader } from './BreathingLoader';

interface AmbientEmptyProps {
  message?: string;
  subMessage?: string;
  showBreathing?: boolean;
}

const EMPTY_ORBS = [
  { size: 100, x: '20%', y: '30%', color: 'rgba(75, 106, 148, 0.06)', delay: '0s', duration: '16s' },
  { size: 80, x: '70%', y: '40%', color: 'rgba(196, 131, 123, 0.05)', delay: '-3s', duration: '20s' },
  { size: 60, x: '45%', y: '60%', color: 'rgba(202, 218, 237, 0.07)', delay: '-7s', duration: '18s' },
];

export function AmbientEmpty({
  message = '아직 데이터가 없어요',
  subMessage,
  showBreathing = true,
}: AmbientEmptyProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-6 min-h-[280px]">
      <FloatingOrbs orbs={EMPTY_ORBS} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        {showBreathing && <BreathingLoader size="sm" showGuide={false} />}
        <div className="text-center">
          <p className="text-hlk-text-secondary font-medium">{message}</p>
          {subMessage && (
            <p className="text-sm text-hlk-text-tertiary mt-1">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
