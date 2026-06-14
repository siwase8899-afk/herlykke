'use client';

import { PeriodComparison, MonthlyReport } from '@/lib/patternAnalysis';
import { useState } from 'react';
import { EmojiIcon } from '@/lib/iconMap';

interface ChangeReportProps {
  weekly: PeriodComparison | null;
  monthly: MonthlyReport | null;
  totalLogs: number;
}

export function ChangeReport({ weekly, monthly, totalLogs }: ChangeReportProps) {
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  if (!weekly) {
    return (
      <div className="card-glass rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-hlk-bg flex items-center justify-center mx-auto mb-4">
          <EmojiIcon emoji="📊" size={30} className="text-hlk-primary" />
        </div>
        <h3 className="font-bold text-hlk-text mb-2">변화 리포트 준비 중</h3>
        <p className="text-sm text-hlk-text-secondary mb-4">
          {totalLogs < 7
            ? `${7 - totalLogs}일 더 기록하면 변화 리포트를 볼 수 있어요`
            : '지난주 기록이 필요해요. 꾸준히 기록해주세요!'}
        </p>
        <div className="w-full bg-hlk-bg rounded-full h-2">
          <div
            className="bg-hlk-primary h-2 rounded-full transition-all"
            style={{ width: `${Math.min((totalLogs / 14) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-hlk-text-tertiary mt-2">{totalLogs}/14일 기록</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 주간/월간 토글 */}
      <div className="flex bg-hlk-bg rounded-xl p-1">
        <button
          onClick={() => setView('weekly')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            view === 'weekly'
              ? 'bg-white text-hlk-primary shadow-sm'
              : 'text-hlk-text-tertiary'
          }`}
        >
          주간 변화
        </button>
        <button
          onClick={() => setView('monthly')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            view === 'monthly'
              ? 'bg-white text-hlk-primary shadow-sm'
              : 'text-hlk-text-tertiary'
          }`}
        >
          월간 흐름
        </button>
      </div>

      {view === 'weekly' ? (
        <WeeklyChangeView data={weekly} />
      ) : (
        <MonthlyChangeView data={monthly} weeklyFallback={weekly} />
      )}
    </div>
  );
}

// 주간 변화 뷰
function WeeklyChangeView({ data }: { data: PeriodComparison }) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div className="space-y-4">
      {/* 인사이트 카드 */}
      <div className="bg-gradient-to-br from-hlk-primary to-hlk-accent rounded-2xl p-5 text-white">
        <div className="flex items-start gap-3">
          <span className="text-2xl">
            {data.moodChangeDirection === 'up' ? '📈' : data.moodChangeDirection === 'down' ? '📉' : '➡️'}
          </span>
          <div>
            <p className="text-white/70 text-xs mb-1">
              {formatDate(data.currentPeriod.start)} ~ {formatDate(data.currentPeriod.end)}
            </p>
            <p className="font-medium text-sm leading-relaxed">{data.insight}</p>
          </div>
        </div>
      </div>

      {/* 변화 요약 3열 그리드 */}
      <div className="grid grid-cols-3 gap-3">
        {/* 기분 변화 */}
        <div className="card-glass rounded-2xl p-4 text-center">
          <p className="text-xs text-hlk-text-tertiary mb-1">기분</p>
          <p className={`text-2xl font-bold ${
            data.moodChangeDirection === 'up'
              ? 'text-hlk-success'
              : data.moodChangeDirection === 'down'
              ? 'text-hlk-error'
              : 'text-hlk-text'
          }`}>
            {data.moodChange > 0 ? '+' : ''}{data.moodChange}%
          </p>
          <p className="text-xs text-hlk-text-tertiary mt-1">
            {data.previous.avgMood > 0
              ? `${data.previous.avgMood.toFixed(1)} → ${data.current.avgMood.toFixed(1)}`
              : `평균 ${data.current.avgMood.toFixed(1)}`}
          </p>
        </div>

        {/* 수면 변화 */}
        <div className="card-glass rounded-2xl p-4 text-center">
          <p className="text-xs text-hlk-text-tertiary mb-1">수면 품질</p>
          <p className={`text-2xl font-bold ${
            data.sleepChange.quality > 0
              ? 'text-hlk-success'
              : data.sleepChange.quality < 0
              ? 'text-hlk-error'
              : 'text-hlk-text'
          }`}>
            {data.sleepChange.quality > 0 ? '+' : ''}{data.sleepChange.quality.toFixed(1)}
          </p>
          <p className="text-xs text-hlk-text-tertiary mt-1">
            {data.sleepChange.hours !== 0
              ? `수면 ${data.sleepChange.hours > 0 ? '+' : ''}${data.sleepChange.hours.toFixed(1)}h`
              : '수면 시간 동일'}
          </p>
        </div>

        {/* 기록 일수 */}
        <div className="card-glass rounded-2xl p-4 text-center">
          <p className="text-xs text-hlk-text-tertiary mb-1">기록</p>
          <p className="text-2xl font-bold text-hlk-primary">
            {data.current.totalLogs}일
          </p>
          <p className="text-xs text-hlk-text-tertiary mt-1">
            지난주 {data.previous.totalLogs}일
          </p>
        </div>
      </div>

      {/* 증상 변화 */}
      {data.symptomChanges.length > 0 && (
        <div className="card-glass rounded-2xl p-5">
          <h3 className="font-semibold text-hlk-text mb-4 flex items-center gap-2">
            <span>🩺</span>
            증상 변화
          </h3>
          <div className="space-y-3">
            {data.symptomChanges.slice(0, 5).map((symptom) => (
              <div key={symptom.symptomId} className="flex items-center gap-3">
                <span className="text-lg w-8 text-center">{symptom.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-hlk-text">{symptom.name}</span>
                    <span className={`text-xs font-semibold ${
                      symptom.direction === 'improved'
                        ? 'text-hlk-success'
                        : symptom.direction === 'worsened'
                        ? 'text-hlk-error'
                        : 'text-hlk-text-tertiary'
                    }`}>
                      {symptom.direction === 'improved'
                        ? `${Math.abs(symptom.change)}일 감소`
                        : symptom.direction === 'worsened'
                        ? `${symptom.change}일 증가`
                        : '변화 없음'}
                    </span>
                  </div>
                  {/* 비교 바 */}
                  <div className="flex gap-1 items-center">
                    <div className="flex-1 flex gap-0.5">
                      {/* 지난주 */}
                      <div className="h-2 rounded-full bg-hlk-border" style={{ width: `${(symptom.previousCount / 7) * 100}%`, minWidth: symptom.previousCount > 0 ? '8px' : '0' }} />
                      {/* 이번주 */}
                      <div className={`h-2 rounded-full ${
                        symptom.direction === 'improved' ? 'bg-hlk-success' : symptom.direction === 'worsened' ? 'bg-hlk-error' : 'bg-hlk-primary'
                      }`} style={{ width: `${(symptom.currentCount / 7) * 100}%`, minWidth: symptom.currentCount > 0 ? '8px' : '0' }} />
                    </div>
                    <span className="text-xs text-hlk-text-tertiary w-12 text-right">
                      {symptom.previousCount}→{symptom.currentCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-hlk-border">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-full bg-hlk-border" />
              <span className="text-xs text-hlk-text-tertiary">지난주</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-full bg-hlk-primary" />
              <span className="text-xs text-hlk-text-tertiary">이번주</span>
            </div>
          </div>
        </div>
      )}

      {/* 활동 영향 요약 */}
      {(data.current.bestActivity || data.current.worstTrigger) && (
        <div className="card-glass rounded-2xl p-5">
          <h3 className="font-semibold text-hlk-text mb-3 flex items-center gap-2">
            <EmojiIcon emoji="💡" size={16} className="text-hlk-accent" />
            이번 주 발견
          </h3>
          <div className="space-y-3">
            {data.current.bestActivity && (
              <div className="flex items-center gap-3 p-3 bg-hlk-primary-light rounded-xl">
                <span className="text-lg">{data.current.bestActivity.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-hlk-primary-dark">
                    {data.current.bestActivity.name}한 날 기분이 더 좋았어요
                  </p>
                  <p className="text-xs text-hlk-success">
                    평균 기분 +{data.current.bestActivity.impactScore.toFixed(1)}
                  </p>
                </div>
              </div>
            )}
            {data.current.worstTrigger && (
              <div className="flex items-center gap-3 p-3 bg-hlk-clay-light rounded-xl">
                <span className="text-lg">{data.current.worstTrigger.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-hlk-error">
                    {data.current.worstTrigger.name} 후 기분이 낮았어요
                  </p>
                  <p className="text-xs text-hlk-error">
                    평균 기분 {data.current.worstTrigger.impactScore.toFixed(1)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 월간 흐름 뷰
function MonthlyChangeView({ data, weeklyFallback }: { data: MonthlyReport | null; weeklyFallback: PeriodComparison }) {
  if (!data) {
    return (
      <div className="card-glass rounded-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-hlk-bg flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">📅</span>
        </div>
        <h3 className="font-bold text-hlk-text mb-2">월간 리포트 준비 중</h3>
        <p className="text-sm text-hlk-text-secondary">
          2주 이상 기록하면 월간 흐름을 볼 수 있어요
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 전체 트렌드 */}
      <div className="bg-gradient-to-br from-hlk-primary to-hlk-accent rounded-2xl p-5 text-white">
        <div className="flex items-start gap-3">
          <span className="text-2xl">
            {data.overallTrend === 'improving' ? '📈' : data.overallTrend === 'declining' ? '📉' : '➡️'}
          </span>
          <div>
            <p className="text-white/70 text-xs mb-1">{data.totalLogs}일간의 기록</p>
            <p className="font-medium text-sm leading-relaxed">{data.insight}</p>
          </div>
        </div>
      </div>

      {/* 주차별 기분 추이 */}
      <div className="card-glass rounded-2xl p-5">
        <h3 className="font-semibold text-hlk-text mb-4">주차별 컨디션</h3>
        <div className="space-y-3">
          {data.weeks.map((week) => {
            const formatDate = (d: string) => {
              const date = new Date(d);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            };
            const moodPercent = (week.summary.avgMood / 5) * 100;
            const moodColor = week.summary.avgMood >= 4
              ? 'bg-hlk-success'
              : week.summary.avgMood >= 3
              ? 'bg-hlk-warning-fill'
              : 'bg-hlk-error';

            return (
              <div key={week.weekNumber}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-hlk-text-secondary">
                    {week.weekNumber}주차 ({formatDate(week.period.start)}~{formatDate(week.period.end)})
                  </span>
                  <span className="text-sm font-bold text-hlk-text">
                    {week.summary.avgMood.toFixed(1)}
                  </span>
                </div>
                <div className="h-3 bg-hlk-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${moodColor}`}
                    style={{ width: `${moodPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-hlk-text-tertiary">
                    {week.summary.totalLogs}일 기록
                  </span>
                  <span className="text-xs text-hlk-text-tertiary">
                    {week.summary.topSymptom
                      ? `${week.summary.topSymptom.emoji} ${week.summary.topSymptom.name}`
                      : '증상 없음'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 수면 추이 */}
      <div className="card-glass rounded-2xl p-5">
        <h3 className="font-semibold text-hlk-text mb-4">주차별 수면</h3>
        <div className="grid grid-cols-2 gap-3">
          {data.weeks.map((week) => (
            <div key={week.weekNumber} className="bg-hlk-bg rounded-xl p-3 text-center">
              <p className="text-xs text-hlk-text-tertiary mb-1">{week.weekNumber}주차</p>
              <p className="text-lg font-bold text-hlk-primary">
                {week.sleep.avgHours > 0 ? `${week.sleep.avgHours.toFixed(1)}h` : '-'}
              </p>
              <p className="text-xs text-hlk-text-tertiary">
                품질 {week.sleep.avgQuality > 0 ? week.sleep.avgQuality.toFixed(1) : '-'}/5
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
