'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { generateDailyInsights, generateWeeklyReport, type Insight } from '@/lib/insightEngine';
import { SYMPTOMS, ACTIVITIES, type DailyLog } from '@/lib/dailyLogConstants';

// 데모 데이터
const DEMO_LOGS: DailyLog[] = [
  {
    id: '1', user_id: 'demo', log_date: '2026-02-14',
    overall_condition: 4, symptoms: ['fatigue'], symptom_intensity: 2,
    sleep_hours: 7, sleep_quality: 4, activities: ['yoga', 'walk'],
    mood_tags: ['calm'], notes: null, created_at: '', updated_at: ''
  },
  {
    id: '2', user_id: 'demo', log_date: '2026-02-13',
    overall_condition: 3, symptoms: ['hot_flash', 'insomnia'], symptom_intensity: 3,
    sleep_hours: 5, sleep_quality: 2, activities: ['meditation'],
    mood_tags: ['tired'], notes: null, created_at: '', updated_at: ''
  },
  {
    id: '3', user_id: 'demo', log_date: '2026-02-12',
    overall_condition: 4, symptoms: ['fatigue'], symptom_intensity: 2,
    sleep_hours: 7.5, sleep_quality: 4, activities: ['exercise', 'healthy_meal'],
    mood_tags: ['happy', 'energetic'], notes: null, created_at: '', updated_at: ''
  },
  {
    id: '4', user_id: 'demo', log_date: '2026-02-11',
    overall_condition: 2, symptoms: ['mood_swing', 'anxiety', 'brain_fog'], symptom_intensity: 4,
    sleep_hours: 4, sleep_quality: 1, activities: [],
    mood_tags: ['anxious', 'irritable'], notes: null, created_at: '', updated_at: ''
  },
  {
    id: '5', user_id: 'demo', log_date: '2026-02-10',
    overall_condition: 3, symptoms: ['brain_fog'], symptom_intensity: 2,
    sleep_hours: 6, sleep_quality: 3, activities: ['walk'],
    mood_tags: ['tired'], notes: null, created_at: '', updated_at: ''
  },
  {
    id: '6', user_id: 'demo', log_date: '2026-02-09',
    overall_condition: 4, symptoms: [], symptom_intensity: null,
    sleep_hours: 8, sleep_quality: 5, activities: ['yoga', 'social'],
    mood_tags: ['happy', 'calm'], notes: null, created_at: '', updated_at: ''
  },
  {
    id: '7', user_id: 'demo', log_date: '2026-02-08',
    overall_condition: 3, symptoms: ['hot_flash'], symptom_intensity: 2,
    sleep_hours: 6.5, sleep_quality: 3, activities: ['exercise'],
    mood_tags: ['calm'], notes: null, created_at: '', updated_at: ''
  },
];

export default function InsightsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<DailyLog[]>(DEMO_LOGS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('log_date', { ascending: false })
      .limit(30);

    if (data && data.length > 0) {
      setLogs(data);
    }
    setLoading(false);
  };

  const todayLog = logs.find(log => log.log_date === new Date().toISOString().split('T')[0]) || null;
  const dailyInsights = generateDailyInsights(todayLog, logs);
  const weeklyReport = generateWeeklyReport(logs);

  const getInsightTypeStyles = (type: Insight['type']) => {
    switch (type) {
      case 'tip':
        return 'bg-alma-primary-light border-alma-primary/20';
      case 'pattern':
        return 'bg-alma-accent-light border-alma-accent/20';
      case 'alert':
        return 'bg-red-50 border-red-200';
      case 'encouragement':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-white border-alma-border';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-secondary">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alma-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-alma-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-alma-text-tertiary hover:text-alma-text transition-colors">
            ← 대시보드
          </Link>
          <h1 className="font-bold text-alma-text">나의 인사이트</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[57px] z-40 bg-white border-b border-alma-border">
        <div className="max-w-2xl mx-auto px-5">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('daily')}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'daily'
                  ? 'border-alma-primary text-alma-primary'
                  : 'border-transparent text-alma-text-tertiary hover:text-alma-text'
              }`}
            >
              오늘의 조언
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'weekly'
                  ? 'border-alma-primary text-alma-primary'
                  : 'border-transparent text-alma-text-tertiary hover:text-alma-text'
              }`}
            >
              주간 리포트
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-5 py-6">
        {activeTab === 'daily' ? (
          <div className="space-y-4">
            {/* AI Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-alma-primary to-alma-accent flex items-center justify-center">
                <span className="text-white text-sm">AI</span>
              </div>
              <div>
                <p className="text-sm font-medium text-alma-text">AI 맞춤 조언</p>
                <p className="text-xs text-alma-text-tertiary">나의 기록을 분석해서 드리는 조언이에요</p>
              </div>
            </div>

            {/* Insights */}
            {dailyInsights.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-alma-border text-center">
                <p className="text-alma-text-secondary">아직 분석할 데이터가 부족해요.</p>
                <p className="text-sm text-alma-text-tertiary mt-1">기록을 더 쌓으면 맞춤 조언을 드릴게요!</p>
                <Link
                  href="/log"
                  className="inline-block mt-4 px-6 py-2 bg-alma-primary text-white rounded-full text-sm font-medium"
                >
                  기록하기
                </Link>
              </div>
            ) : (
              dailyInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`rounded-2xl p-5 border ${getInsightTypeStyles(insight.type)}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{insight.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-alma-text mb-1">{insight.title}</h3>
                      <p className="text-sm text-alma-text-secondary leading-relaxed">
                        {insight.description}
                      </p>
                      {insight.actionable && (
                        <Link
                          href={insight.actionable.link || '#'}
                          className="inline-block mt-3 text-sm font-medium text-alma-primary hover:underline"
                        >
                          {insight.actionable.label} →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Weekly Summary */}
            <div className="bg-gradient-to-br from-alma-primary to-alma-accent rounded-3xl p-6 text-white">
              <h2 className="text-lg font-bold mb-2">이번 주 요약</h2>
              <p className="text-white/90">{weeklyReport.summary}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <p className="text-2xl font-bold">{weeklyReport.avgCondition.toFixed(1)}</p>
                  <p className="text-xs text-white/70">평균 컨디션</p>
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <p className="text-2xl font-bold">{logs.slice(0, 7).length}</p>
                  <p className="text-xs text-white/70">기록 일수</p>
                </div>
              </div>
            </div>

            {/* Top Symptoms */}
            {weeklyReport.topSymptoms.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-alma-border">
                <h3 className="font-semibold text-alma-text mb-4">이번 주 주요 증상</h3>
                <div className="space-y-3">
                  {weeklyReport.topSymptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {SYMPTOMS.find(s => s.id === symptom.id)?.icon}
                        </span>
                        <span className="text-alma-text">{symptom.label}</span>
                      </div>
                      <span className="text-sm text-alma-text-tertiary">{symptom.count}회</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Helpful Activities */}
            {weeklyReport.helpfulActivities.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-alma-border">
                <h3 className="font-semibold text-alma-text mb-4">도움이 된 활동</h3>
                <div className="flex flex-wrap gap-2">
                  {weeklyReport.helpfulActivities.map((activityId) => {
                    const activity = ACTIVITIES.find(a => a.id === activityId);
                    return (
                      <span
                        key={activityId}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-alma-accent-light text-alma-accent-dark rounded-full text-sm font-medium"
                      >
                        {activity?.icon} {activity?.label}
                      </span>
                    );
                  })}
                </div>
                <p className="text-sm text-alma-text-tertiary mt-3">
                  이 활동을 한 날은 컨디션이 더 좋았어요!
                </p>
              </div>
            )}

            {/* Pattern Insights */}
            {weeklyReport.insights.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-alma-text">발견된 패턴</h3>
                {weeklyReport.insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`rounded-2xl p-4 border ${getInsightTypeStyles(insight.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{insight.icon}</span>
                      <div>
                        <h4 className="font-medium text-alma-text">{insight.title}</h4>
                        <p className="text-sm text-alma-text-secondary mt-1">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      {!todayLog && (
        <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-alma-border">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/log"
              className="block w-full py-4 bg-alma-primary text-white font-bold rounded-xl text-center hover:bg-alma-primary-dark transition-all"
            >
              오늘 기록하기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
