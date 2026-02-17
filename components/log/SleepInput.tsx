'use client';

import { useState } from 'react';
import { SleepEntry, SLEEP_QUALITY_OPTIONS } from '@/lib/logTypes';

interface SleepInputProps {
  value: SleepEntry | null;
  onChange: (sleep: SleepEntry) => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = [0, 15, 30, 45];

function to24h(hour: number, period: 'AM' | 'PM'): number {
  if (period === 'AM' && hour === 12) return 0;
  if (period === 'PM' && hour === 12) return 12;
  return period === 'PM' ? hour + 12 : hour;
}

function from24h(h24: number): { hour: number; period: 'AM' | 'PM' } {
  if (h24 === 0) return { hour: 12, period: 'AM' };
  if (h24 === 12) return { hour: 12, period: 'PM' };
  if (h24 > 12) return { hour: h24 - 12, period: 'PM' };
  return { hour: h24, period: 'AM' };
}

function parseTime(timeStr: string) {
  const [h, m] = timeStr.split(':').map(Number);
  const { hour, period } = from24h(h);
  return { hour, minute: m, period };
}

function formatTime(hour: number, minute: number, period: 'AM' | 'PM'): string {
  const h24 = to24h(hour, period);
  return `${h24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export function SleepInput({ value, onChange }: SleepInputProps) {
  const sleep = value || { bedTime: '23:00', wakeTime: '07:00', quality: 3 as const };

  const bed = parseTime(sleep.bedTime);
  const wake = parseTime(sleep.wakeTime);

  const [showPicker, setShowPicker] = useState<'bed' | 'wake' | null>(null);

  const handleTimeChange = (
    field: 'bedTime' | 'wakeTime',
    hour: number,
    minute: number,
    period: 'AM' | 'PM'
  ) => {
    onChange({
      ...sleep,
      [field]: formatTime(hour, minute, period),
    } as SleepEntry);
  };

  const handleQualityChange = (quality: number) => {
    onChange({ ...sleep, quality } as SleepEntry);
  };

  // 수면 시간 계산
  const calculateSleepHours = () => {
    if (!sleep.bedTime || !sleep.wakeTime) return null;
    const [bedH, bedM] = sleep.bedTime.split(':').map(Number);
    const [wakeH, wakeM] = sleep.wakeTime.split(':').map(Number);
    let bedMinutes = bedH * 60 + bedM;
    let wakeMinutes = wakeH * 60 + wakeM;
    if (wakeMinutes <= bedMinutes) wakeMinutes += 24 * 60;
    const diffMinutes = wakeMinutes - bedMinutes;
    return { hours: Math.floor(diffMinutes / 60), minutes: diffMinutes % 60 };
  };

  const sleepDuration = calculateSleepHours();

  const current = showPicker === 'bed' ? bed : wake;
  const currentField = showPicker === 'bed' ? 'bedTime' : 'wakeTime';

  return (
    <div>
      <h2 className="text-2xl font-bold text-hlk-text mb-3 text-center">
        어젯밤 수면은 어땠나요?
      </h2>
      <p className="text-hlk-text-secondary mb-8 text-center">
        취침/기상 시간과 수면 품질을 알려주세요
      </p>

      <div className="max-w-sm mx-auto space-y-6">
        {/* 취침/기상 시간 버튼 */}
        <div className="bg-white rounded-2xl p-5 border border-hlk-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-hlk-text mb-2">
                취침 시간
              </label>
              <button
                onClick={() => setShowPicker(showPicker === 'bed' ? null : 'bed')}
                className={`w-full px-4 py-3 rounded-xl border text-center text-lg font-semibold transition-all ${
                  showPicker === 'bed'
                    ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary'
                    : 'border-hlk-border text-hlk-text hover:border-hlk-primary/50'
                }`}
              >
                {bed.period === 'AM' ? '오전' : '오후'} {bed.hour}:{bed.minute.toString().padStart(2, '0')}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-hlk-text mb-2">
                기상 시간
              </label>
              <button
                onClick={() => setShowPicker(showPicker === 'wake' ? null : 'wake')}
                className={`w-full px-4 py-3 rounded-xl border text-center text-lg font-semibold transition-all ${
                  showPicker === 'wake'
                    ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary'
                    : 'border-hlk-border text-hlk-text hover:border-hlk-primary/50'
                }`}
              >
                {wake.period === 'AM' ? '오전' : '오후'} {wake.hour}:{wake.minute.toString().padStart(2, '0')}
              </button>
            </div>
          </div>

          {/* 시간 선택 패널 */}
          {showPicker && (
            <div className="mt-4 pt-4 border-t border-hlk-border">
              <p className="text-xs text-hlk-text-tertiary text-center mb-3">
                {showPicker === 'bed' ? '취침' : '기상'} 시간 선택
              </p>

              {/* 오전/오후 */}
              <div className="flex justify-center gap-2 mb-4">
                {(['AM', 'PM'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => handleTimeChange(currentField, current.hour, current.minute, p)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      current.period === p
                        ? 'bg-hlk-primary text-white'
                        : 'bg-hlk-bg text-hlk-text-secondary hover:bg-hlk-border'
                    }`}
                  >
                    {p === 'AM' ? '오전' : '오후'}
                  </button>
                ))}
              </div>

              {/* 시 선택 */}
              <p className="text-xs text-hlk-text-tertiary mb-2">시</p>
              <div className="grid grid-cols-6 gap-1.5 mb-4">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    onClick={() => handleTimeChange(currentField, h, current.minute, current.period)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      current.hour === h
                        ? 'bg-hlk-primary text-white'
                        : 'bg-hlk-bg text-hlk-text-secondary hover:bg-hlk-border'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* 분 선택 */}
              <p className="text-xs text-hlk-text-tertiary mb-2">분</p>
              <div className="grid grid-cols-4 gap-1.5">
                {MINUTES.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      handleTimeChange(currentField, current.hour, m, current.period);
                      setShowPicker(null);
                    }}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      current.minute === m
                        ? 'bg-hlk-primary text-white'
                        : 'bg-hlk-bg text-hlk-text-secondary hover:bg-hlk-border'
                    }`}
                  >
                    {m.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 수면 시간 표시 */}
          {sleepDuration && !showPicker && (
            <div className="mt-4 text-center">
              <p className="text-sm text-hlk-text-tertiary">총 수면 시간</p>
              <p className="text-2xl font-bold text-hlk-primary">
                {sleepDuration.hours}시간{sleepDuration.minutes > 0 ? ` ${sleepDuration.minutes}분` : ''}
              </p>
            </div>
          )}
        </div>

        {/* 수면 품질 */}
        <div className="bg-white rounded-2xl p-5 border border-hlk-border">
          <p className="text-sm font-medium text-hlk-text mb-4 text-center">
            수면 품질은 어땠나요?
          </p>
          <div className="flex justify-center gap-3">
            {SLEEP_QUALITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleQualityChange(option.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  sleep.quality === option.value
                    ? 'bg-hlk-primary-light border-2 border-hlk-primary'
                    : 'bg-hlk-bg border-2 border-transparent hover:border-hlk-border'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span
                  className={`text-[10px] font-medium ${
                    sleep.quality === option.value
                      ? 'text-hlk-primary'
                      : 'text-hlk-text-tertiary'
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
