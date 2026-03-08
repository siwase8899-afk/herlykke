'use client';

import { useEffect, useState } from 'react';
import { SleepCycleViz } from './SleepCycleViz';

interface AmbientSuccessProps {
  message?: string;
  subMessage?: string;
  onComplete?: () => void;
}

export function AmbientSuccess({
  message = '완료했어요!',
  subMessage,
  onComplete,
}: AmbientSuccessProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    if (onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-6 transition-all duration-700 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-glow-pulse rounded-full" />
        <SleepCycleViz quality={100} size={96} animate={false} />
      </div>
      <h3 className="text-xl font-bold text-hlk-text mb-1">{message}</h3>
      {subMessage && (
        <p className="text-sm text-hlk-text-secondary text-center">{subMessage}</p>
      )}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-hlk-primary animate-soft-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
