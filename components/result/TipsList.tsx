'use client';

interface TipsListProps {
  tips: string[];
}

export function TipsList({ tips }: TipsListProps) {
  return (
    <div className="bg-alma-surface rounded-2xl border border-alma-border p-6">
      <h3 className="text-base font-bold text-alma-text mb-4">맞춤 관리 팁</h3>
      <div className="space-y-3">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-alma-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-[15px] text-alma-text leading-snug">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
