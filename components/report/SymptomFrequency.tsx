'use client';

import { SymptomFrequencyData } from '@/lib/patternAnalysis';

interface SymptomFrequencyProps {
  data: SymptomFrequencyData[];
  totalDays: number;
}

export function SymptomFrequency({ data, totalDays }: SymptomFrequencyProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-hlk-border">
        <h3 className="font-semibold text-hlk-text mb-4">증상 빈도</h3>
        <p className="text-sm text-hlk-text-tertiary text-center py-4">
          기록된 증상이 없어요
        </p>
      </div>
    );
  }

  const topSymptoms = data.slice(0, 5);
  const maxCount = Math.max(...topSymptoms.map((s) => s.count));

  // 강도에 따른 색상
  const getSeverityColor = (avgSeverity: number) => {
    if (avgSeverity >= 4) return 'bg-red-400';
    if (avgSeverity >= 3) return 'bg-amber-400';
    return 'bg-green-400';
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-hlk-border">
      <h3 className="font-semibold text-hlk-text mb-4">주요 증상 TOP 5</h3>

      <div className="space-y-4">
        {topSymptoms.map((symptom) => {
          const barWidth = (symptom.count / maxCount) * 100;

          return (
            <div key={symptom.symptomId}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{symptom.emoji}</span>
                  <span className="text-sm font-medium text-hlk-text">
                    {symptom.name}
                  </span>
                </div>
                <span className="text-xs text-hlk-text-tertiary">
                  {symptom.count}일 / {totalDays}일
                </span>
              </div>
              <div className="h-3 bg-hlk-bg rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getSeverityColor(symptom.avgSeverity)}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-hlk-text-tertiary">
                  평균 강도: {symptom.avgSeverity.toFixed(1)} / 5
                </span>
                <span className="text-[10px] text-hlk-text-tertiary">
                  {symptom.percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
