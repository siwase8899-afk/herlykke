'use client';

import { ActivityCorrelationData } from '@/lib/patternAnalysis';

interface ActivityImpactProps {
  data: ActivityCorrelationData[];
}

export function ActivityImpact({ data }: ActivityImpactProps) {
  const positiveActivities = data.filter((a) => a.type === 'positive');
  const triggerActivities = data.filter((a) => a.type === 'trigger');

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-hlk-border">
        <h3 className="font-semibold text-hlk-text mb-4">활동 영향 분석</h3>
        <p className="text-sm text-hlk-text-tertiary text-center py-4">
          활동 데이터가 부족해요. 더 기록해주세요!
        </p>
      </div>
    );
  }

  const getImpactBadge = (impact: 'positive' | 'negative' | 'neutral', score: number) => {
    if (impact === 'positive') {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
          +{score.toFixed(1)}
        </span>
      );
    }
    if (impact === 'negative') {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
          {score.toFixed(1)}
        </span>
      );
    }
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
        {score.toFixed(1)}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* 긍정적 활동 */}
      <div className="bg-white rounded-2xl p-5 border border-hlk-border">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <h3 className="font-semibold text-hlk-text">도움이 되는 활동</h3>
        </div>

        {positiveActivities.length === 0 ? (
          <p className="text-sm text-hlk-text-tertiary">아직 데이터가 부족해요</p>
        ) : (
          <div className="space-y-3">
            {positiveActivities.slice(0, 4).map((activity) => (
              <div
                key={activity.activityId}
                className="flex items-center justify-between p-3 bg-hlk-bg rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activity.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-hlk-text">{activity.name}</p>
                    <p className="text-xs text-hlk-text-tertiary">
                      {activity.daysWithActivity}일 기록
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {getImpactBadge(activity.impact, activity.impactScore)}
                  <p className="text-[10px] text-hlk-text-tertiary mt-1">
                    기분 {activity.avgMoodWith.toFixed(1)}점
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 트리거 활동 */}
      <div className="bg-white rounded-2xl p-5 border border-hlk-border">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="font-semibold text-hlk-text">주의할 트리거</h3>
        </div>

        {triggerActivities.length === 0 ? (
          <p className="text-sm text-hlk-text-tertiary">아직 데이터가 부족해요</p>
        ) : (
          <div className="space-y-3">
            {triggerActivities.slice(0, 4).map((activity) => (
              <div
                key={activity.activityId}
                className="flex items-center justify-between p-3 bg-hlk-bg rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activity.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-hlk-text">{activity.name}</p>
                    <p className="text-xs text-hlk-text-tertiary">
                      {activity.daysWithActivity}일 기록
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {getImpactBadge(activity.impact, activity.impactScore)}
                  <p className="text-[10px] text-hlk-text-tertiary mt-1">
                    기분 {activity.avgMoodWith.toFixed(1)}점
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-hlk-text-tertiary mt-4 text-center">
          * 점수는 해당 활동을 한 날과 안 한 날의 기분 차이예요
        </p>
      </div>
    </div>
  );
}
