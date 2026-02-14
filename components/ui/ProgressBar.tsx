'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-alma-border rounded-full overflow-hidden">
        <div
          className="h-full bg-alma-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-alma-text-secondary font-medium tabular-nums min-w-[40px] text-right">
        {current}/{total}
      </span>
    </div>
  );
}
