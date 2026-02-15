'use client';

import { SleepEntry, SLEEP_QUALITY_OPTIONS } from '@/lib/logTypes';

interface SleepInputProps {
  value: SleepEntry | null;
  onChange: (sleep: SleepEntry) => void;
}

export function SleepInput({ value, onChange }: SleepInputProps) {
  const sleep = value || { bedTime: '23:00', wakeTime: '07:00', quality: 3 as const };

  const handleChange = (field: keyof SleepEntry, newValue: string | number) => {
    onChange({
      ...sleep,
      [field]: newValue,
    } as SleepEntry);
  };

  // 수면 시간 계산
  const calculateSleepHours = () => {
    if (!sleep.bedTime || !sleep.wakeTime) return null;

    const [bedH, bedM] = sleep.bedTime.split(':').map(Number);
    const [wakeH, wakeM] = sleep.wakeTime.split(':').map(Number);

    let bedMinutes = bedH * 60 + bedM;
    let wakeMinutes = wakeH * 60 + wakeM;

    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60; // 다음날
    }

    const diffMinutes = wakeMinutes - bedMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return { hours, minutes };
  };

  const sleepDuration = calculateSleepHours();

  return (
    <div>
      <h2 className="text-2xl font-bold text-alma-text mb-3 text-center">
        어젯밤 수면은 어땠나요?
      </h2>
      <p className="text-alma-text-secondary mb-8 text-center">
        취침/기상 시간과 수면 품질을 알려주세요
      </p>

      <div className="max-w-sm mx-auto space-y-6">
        {/* 취침/기상 시간 */}
        <div className="bg-white rounded-2xl p-5 border border-alma-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-alma-text mb-2">
                취침 시간
              </label>
              <input
                type="time"
                value={sleep.bedTime}
                onChange={(e) => handleChange('bedTime', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-alma-border text-center text-lg font-semibold text-alma-text focus:outline-none focus:border-alma-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-alma-text mb-2">
                기상 시간
              </label>
              <input
                type="time"
                value={sleep.wakeTime}
                onChange={(e) => handleChange('wakeTime', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-alma-border text-center text-lg font-semibold text-alma-text focus:outline-none focus:border-alma-primary"
              />
            </div>
          </div>

          {/* 수면 시간 표시 */}
          {sleepDuration && (
            <div className="mt-4 text-center">
              <p className="text-sm text-alma-text-tertiary">총 수면 시간</p>
              <p className="text-2xl font-bold text-alma-primary">
                {sleepDuration.hours}시간 {sleepDuration.minutes > 0 && `${sleepDuration.minutes}분`}
              </p>
            </div>
          )}
        </div>

        {/* 수면 품질 */}
        <div className="bg-white rounded-2xl p-5 border border-alma-border">
          <p className="text-sm font-medium text-alma-text mb-4 text-center">
            수면 품질은 어땠나요?
          </p>
          <div className="flex justify-center gap-3">
            {SLEEP_QUALITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange('quality', option.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  sleep.quality === option.value
                    ? 'bg-alma-primary-light border-2 border-alma-primary'
                    : 'bg-alma-bg border-2 border-transparent hover:border-alma-border'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span
                  className={`text-[10px] font-medium ${
                    sleep.quality === option.value
                      ? 'text-alma-primary'
                      : 'text-alma-text-tertiary'
                  }`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
