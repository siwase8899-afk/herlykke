'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedProgressProps {
  value: number; // 0-100
  label?: string;
  color?: string;
  height?: number;
}

export default function AnimatedProgress({
  value,
  label,
  color = 'var(--color-hlk-primary)',
  height = 8,
}: AnimatedProgressProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-hlk-text">{label}</span>
          <span className="text-sm text-hlk-text-secondary">{value}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full bg-hlk-border-light overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: isVisible ? `${value}%` : '0%',
            backgroundColor: color,
            transition: 'width 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
        />
      </div>
    </div>
  );
}
