'use client';

import { MoodTrendData } from '@/lib/patternAnalysis';
import { MOOD_OPTIONS } from '@/lib/logTypes';

interface MoodChartProps {
  data: MoodTrendData[];
}

export function MoodChart({ data }: MoodChartProps) {
  if (data.length === 0) return null;

  const maxMood = 5;
  const recentData = data.slice(-14); // 최근 14일

  return (
    <div className="bg-white rounded-2xl p-5 border border-alma-border">
      <h3 className="font-semibold text-alma-text mb-4">기분 변화</h3>

      {/* 차트 */}
      <div className="flex items-end gap-1 h-32 mb-3">
        {recentData.map((item, idx) => {
          const height = (item.mood / maxMood) * 100;
          const moodOption = MOOD_OPTIONS.find((m) => m.value === item.mood);

          // 기분에 따른 색상
          const getBarColor = (mood: number) => {
            if (mood >= 4) return 'bg-green-400';
            if (mood === 3) return 'bg-yellow-400';
            return 'bg-red-400';
          };

          return (
            <div key={item.date} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center justify-end h-24">
                <span className="text-xs mb-1">{moodOption?.emoji}</span>
                <div
                  className={`w-full rounded-t-md transition-all ${getBarColor(item.mood)}`}
                  style={{ height: `${height}%`, minHeight: '4px' }}
                />
              </div>
              <span className="text-[10px] text-alma-text-tertiary mt-1">
                {item.dayOfWeek}
              </span>
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="flex justify-center gap-4 text-xs text-alma-text-tertiary">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          좋음
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          보통
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          안좋음
        </span>
      </div>
    </div>
  );
}
