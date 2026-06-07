'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLogStore } from '@/stores/logStore';
import { useAuth } from '@/lib/authContext';
import { DailyLog } from '@/lib/logTypes';
import {
  calculateMoodTrend,
  calculateSymptomFrequency,
  analyzeSleepPattern,
  analyzeActivityCorrelation,
  generateWeeklySummary,
  canGenerateReport,
  getReportProgress,
  compareWeeklyPeriods,
  generateMonthlyReport,
} from '@/lib/patternAnalysis';
import { MoodChart } from '@/components/report/MoodChart';
import { SymptomFrequency } from '@/components/report/SymptomFrequency';
import { WeeklySummaryCard } from '@/components/report/WeeklySummaryCard';
import { ActivityImpact } from '@/components/report/ActivityImpact';
import { ReportLocked } from '@/components/report/ReportLocked';
import { ChangeReport } from '@/components/report/ChangeReport';
import { TipsSection } from '@/components/tips/TipsSection';
import { columns } from '@/lib/columnsData';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { BreathingLoader } from '@/components/ui/BreathingLoader';

// 데모 데이터 (14일 — 변화 리포트를 위해 2주)
const DEMO_LOGS: DailyLog[] = [
  // 이번 주 (최근 7일)
  {
    id: 'demo_1', date: '2026-02-15', mood: 4, moodTags: ['calm', 'grateful'],
    symptoms: [{ symptomId: 'fatigue', severity: 2 }],
    sleep: { bedTime: '23:00', wakeTime: '07:00', quality: 4 },
    activities: ['exercise', 'meditation'], createdAt: '2026-02-15T08:00:00Z'
  },
  {
    id: 'demo_2', date: '2026-02-14', mood: 3, moodTags: ['tired', 'anxious'],
    symptoms: [{ symptomId: 'hot_flash', severity: 3 }, { symptomId: 'insomnia', severity: 2 }],
    sleep: { bedTime: '00:00', wakeTime: '06:00', quality: 2 },
    activities: ['caffeine'], createdAt: '2026-02-14T08:00:00Z'
  },
  {
    id: 'demo_3', date: '2026-02-13', mood: 4, moodTags: ['energetic'],
    symptoms: [{ symptomId: 'fatigue', severity: 2 }],
    sleep: { bedTime: '22:30', wakeTime: '06:30', quality: 4 },
    activities: ['exercise', 'walk'], createdAt: '2026-02-13T08:00:00Z'
  },
  {
    id: 'demo_4', date: '2026-02-12', mood: 2, moodTags: ['irritable', 'tearful', 'frustrated'],
    symptoms: [{ symptomId: 'mood_swings', severity: 4 }, { symptomId: 'anxiety', severity: 3 }, { symptomId: 'brain_fog', severity: 3 }],
    sleep: { bedTime: '01:00', wakeTime: '05:00', quality: 1 },
    activities: ['stress', 'alcohol'], createdAt: '2026-02-12T08:00:00Z'
  },
  {
    id: 'demo_5', date: '2026-02-11', mood: 3, moodTags: ['listless'],
    symptoms: [{ symptomId: 'brain_fog', severity: 2 }],
    sleep: { bedTime: '23:30', wakeTime: '06:30', quality: 3 },
    activities: ['walk'], createdAt: '2026-02-11T08:00:00Z'
  },
  {
    id: 'demo_6', date: '2026-02-10', mood: 5, moodTags: ['happy', 'energetic', 'proud'],
    symptoms: [],
    sleep: { bedTime: '22:00', wakeTime: '06:30', quality: 5 },
    activities: ['exercise', 'meditation', 'walk'], createdAt: '2026-02-10T08:00:00Z'
  },
  {
    id: 'demo_7', date: '2026-02-09', mood: 3, moodTags: ['tired'],
    symptoms: [{ symptomId: 'hot_flash', severity: 2 }, { symptomId: 'fatigue', severity: 2 }],
    sleep: { bedTime: '23:00', wakeTime: '06:00', quality: 3 },
    activities: ['caffeine'], createdAt: '2026-02-09T08:00:00Z'
  },
  // 지난 주 (이전 7일 — 전반적으로 더 힘든 주)
  {
    id: 'demo_8', date: '2026-02-08', mood: 2, moodTags: ['tired', 'anxious'],
    symptoms: [{ symptomId: 'hot_flash', severity: 4 }, { symptomId: 'fatigue', severity: 3 }],
    sleep: { bedTime: '00:30', wakeTime: '05:30', quality: 2 },
    activities: ['caffeine', 'stress'], createdAt: '2026-02-08T08:00:00Z'
  },
  {
    id: 'demo_9', date: '2026-02-07', mood: 3, moodTags: ['listless'],
    symptoms: [{ symptomId: 'hot_flash', severity: 3 }, { symptomId: 'insomnia', severity: 3 }],
    sleep: { bedTime: '23:30', wakeTime: '06:00', quality: 2 },
    activities: ['walk'], createdAt: '2026-02-07T08:00:00Z'
  },
  {
    id: 'demo_10', date: '2026-02-06', mood: 2, moodTags: ['irritable', 'frustrated'],
    symptoms: [{ symptomId: 'mood_swings', severity: 4 }, { symptomId: 'hot_flash', severity: 3 }],
    sleep: { bedTime: '01:00', wakeTime: '05:00', quality: 1 },
    activities: ['alcohol'], createdAt: '2026-02-06T08:00:00Z'
  },
  {
    id: 'demo_11', date: '2026-02-05', mood: 3, moodTags: ['tired'],
    symptoms: [{ symptomId: 'fatigue', severity: 3 }, { symptomId: 'brain_fog', severity: 2 }],
    sleep: { bedTime: '23:00', wakeTime: '06:00', quality: 3 },
    activities: ['caffeine'], createdAt: '2026-02-05T08:00:00Z'
  },
  {
    id: 'demo_12', date: '2026-02-04', mood: 3, moodTags: ['calm'],
    symptoms: [{ symptomId: 'hot_flash', severity: 2 }],
    sleep: { bedTime: '22:30', wakeTime: '06:30', quality: 3 },
    activities: ['exercise'], createdAt: '2026-02-04T08:00:00Z'
  },
  {
    id: 'demo_13', date: '2026-02-03', mood: 2, moodTags: ['tearful', 'anxious'],
    symptoms: [{ symptomId: 'anxiety', severity: 4 }, { symptomId: 'insomnia', severity: 3 }, { symptomId: 'hot_flash', severity: 3 }],
    sleep: { bedTime: '00:00', wakeTime: '04:30', quality: 1 },
    activities: ['stress'], createdAt: '2026-02-03T08:00:00Z'
  },
  {
    id: 'demo_14', date: '2026-02-02', mood: 3, moodTags: ['tired'],
    symptoms: [{ symptomId: 'fatigue', severity: 3 }, { symptomId: 'hot_flash', severity: 2 }],
    sleep: { bedTime: '23:30', wakeTime: '06:00', quality: 2 },
    activities: ['walk'], createdAt: '2026-02-02T08:00:00Z'
  },
];

type Tab = 'report' | 'change' | 'tips';

export default function InsightsPage() {
  const { logs, getTodayLog, loadFromServer } = useLogStore();
  const { user, isLoggedIn, isDemo } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [hydrating, setHydrating] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('report');

  const isRealUser = isLoggedIn && !isDemo;

  useEffect(() => {
    setMounted(true);
  }, []);

  // 로그인한 실제 사용자는 서버에서 수면 로그를 불러와 localStorage와 병합
  useEffect(() => {
    if (isRealUser && user) {
      setHydrating(true);
      loadFromServer(user.id).finally(() => setHydrating(false));
    }
  }, [isRealUser, user, loadFromServer]);

  // 게스트/미설정 환경에서만 데모 미리보기 기본 ON. 실제 사용자는 항상 OFF(자신의 데이터, 부족 시 잠금 UI)
  useEffect(() => {
    if (isRealUser) {
      setShowDemo(false);
    } else if (logs.length === 0) {
      setShowDemo(true);
    }
  }, [isRealUser, logs.length]);

  const displayLogs = showDemo ? DEMO_LOGS : logs;

  if (!mounted || (isRealUser && hydrating)) {
    return (
      <div className="min-h-screen bg-hlk-bg flex flex-col items-center justify-center gap-4">
        <BreathingLoader size="md" showGuide />
        <p className="text-sm text-hlk-text-tertiary animate-slow-fade-in-delay-2">패턴을 분석하고 있어요...</p>
      </div>
    );
  }

  const todayLog = getTodayLog();
  const hasEnoughData = canGenerateReport(displayLogs);
  const progress = getReportProgress(displayLogs);

  // 날짜 범위 계산
  const sortedLogs = [...displayLogs].sort((a, b) => b.date.localeCompare(a.date));
  const latestDate = sortedLogs[0]?.date || '';
  const earliestDate = sortedLogs[sortedLogs.length - 1]?.date || '';

  const formatDateRange = () => {
    if (!latestDate || !earliestDate) return '';
    const latest = new Date(latestDate);
    const earliest = new Date(earliestDate);
    return `${earliest.getMonth() + 1}/${earliest.getDate()} - ${latest.getMonth() + 1}/${latest.getDate()}`;
  };

  // 패턴 분석 데이터
  const moodTrend = calculateMoodTrend(displayLogs);
  const symptomFrequency = calculateSymptomFrequency(displayLogs);
  const sleepPattern = analyzeSleepPattern(displayLogs);
  const activityCorrelation = analyzeActivityCorrelation(displayLogs);
  const weeklySummary = generateWeeklySummary(displayLogs);

  // 변화 리포트 데이터
  const weeklyComparison = compareWeeklyPeriods(displayLogs);
  const monthlyReport = generateMonthlyReport(displayLogs);

  return (
    <div className="min-h-screen bg-hlk-bg relative">
      <FloatingOrbs />
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-hlk-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/log" className="text-hlk-text-tertiary hover:text-hlk-text transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-bold text-hlk-text">패턴 리포트</h1>
          {!isRealUser ? (
            <button
              onClick={() => setShowDemo(!showDemo)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                showDemo
                  ? 'bg-hlk-accent text-white'
                  : 'bg-hlk-bg text-hlk-text-tertiary hover:bg-hlk-border'
              }`}
            >
              {showDemo ? '데모 ON' : '데모'}
            </button>
          ) : (
            <span className="w-12" />
          )}
        </div>
      </header>

      {/* 데모 모드 안내 */}
      {showDemo && (
        <div className="bg-hlk-accent-light border-b border-hlk-accent/20 px-5 py-3">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>✨</span>
              <p className="text-xs text-hlk-text-secondary">
                {logs.length === 0 ? '미리보기 모드 — 데모 데이터로 서비스를 체험 중이에요' : '데모 데이터로 보고 있어요'}
              </p>
            </div>
            {logs.length === 0 && (
              <Link href="/checkin" className="px-3 py-1.5 bg-hlk-accent text-white text-xs font-bold rounded-full hover:bg-hlk-accent/90 transition-colors flex-shrink-0">
                시작하기
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-[57px] z-40 bg-white border-b border-hlk-border">
        <div className="max-w-lg mx-auto px-5">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('report')}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'report'
                  ? 'border-hlk-primary text-hlk-primary'
                  : 'border-transparent text-hlk-text-tertiary hover:text-hlk-text'
              }`}
            >
              패턴 리포트
            </button>
            <button
              onClick={() => setActiveTab('change')}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'change'
                  ? 'border-hlk-primary text-hlk-primary'
                  : 'border-transparent text-hlk-text-tertiary hover:text-hlk-text'
              }`}
            >
              변화 리포트
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'tips'
                  ? 'border-hlk-primary text-hlk-primary'
                  : 'border-transparent text-hlk-text-tertiary hover:text-hlk-text'
              }`}
            >
              맞춤 팁
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-lg mx-auto px-5 py-6">
        {activeTab === 'change' ? (
          // 변화 리포트 탭
          <ChangeReport
            weekly={weeklyComparison}
            monthly={monthlyReport}
            totalLogs={displayLogs.length}
          />
        ) : activeTab === 'report' ? (
          // 리포트 탭
          <>
            {!hasEnoughData ? (
              // 데이터 부족 - 잠금 상태
              <ReportLocked
                currentDays={progress.current}
                targetDays={progress.target}
                percentage={progress.percentage}
              />
            ) : (
              // 리포트 표시
              <div className="space-y-6">
                {/* 주간 요약 카드 */}
                <WeeklySummaryCard summary={weeklySummary} dateRange={formatDateRange()} />

                {/* 기분 차트 */}
                <MoodChart data={moodTrend} />

                {/* 증상 빈도 */}
                <SymptomFrequency data={symptomFrequency} totalDays={displayLogs.length} />

                {/* 수면 패턴 */}
                {sleepPattern.avgHours > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-hlk-border">
                    <h3 className="font-semibold text-hlk-text mb-4">수면 패턴</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-hlk-bg rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-hlk-primary">
                          {sleepPattern.avgHours.toFixed(1)}
                        </p>
                        <p className="text-xs text-hlk-text-tertiary">평균 수면 시간</p>
                      </div>
                      <div className="bg-hlk-bg rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-hlk-primary">
                          {sleepPattern.avgQuality.toFixed(1)}
                        </p>
                        <p className="text-xs text-hlk-text-tertiary">평균 수면 품질</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                      {sleepPattern.qualityTrend === 'improving' && (
                        <>
                          <span className="text-green-500">📈</span>
                          <span className="text-hlk-text-secondary">수면 품질이 개선되고 있어요!</span>
                        </>
                      )}
                      {sleepPattern.qualityTrend === 'declining' && (
                        <>
                          <span className="text-red-500">📉</span>
                          <span className="text-hlk-text-secondary">수면에 신경 써보세요</span>
                        </>
                      )}
                      {sleepPattern.qualityTrend === 'stable' && (
                        <>
                          <span className="text-amber-500">➡️</span>
                          <span className="text-hlk-text-secondary">수면 패턴이 일정해요</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* 활동 영향 분석 */}
                <ActivityImpact data={activityCorrelation} />

                {/* 이 증상 관리 솔루션 */}
                {symptomFrequency.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-hlk-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-hlk-text flex items-center gap-2">
                        <span className="text-lg">💊</span>
                        이 증상 관리 솔루션
                      </h3>
                      <Link href="/solutions" className="text-sm text-hlk-primary hover:underline">
                        더보기
                      </Link>
                    </div>
                    <p className="text-sm text-hlk-text-secondary mb-4">
                      나의 상위 증상에 맞는 추천 솔루션이에요
                    </p>
                    <div className="space-y-3">
                      {(() => {
                        const SYMPTOM_SOLUTIONS: Record<string, { title: string; category: string; price: string }[]> = {
                          hot_flash: [
                            { title: '이 시기를 위한 명상 프로그램', category: '명상/요가', price: '무료' },
                            { title: '핫플래시 쿨링 스프레이', category: '추천 제품', price: '18,000원' },
                          ],
                          insomnia: [
                            { title: '숙면을 위한 요가 니드라', category: '명상/요가', price: '월 9,900원' },
                            { title: '숙면 마그네슘', category: '영양제', price: '월 28,000원' },
                          ],
                          fatigue: [
                            { title: '아침 10분 스트레칭', category: '운동', price: '무료' },
                            { title: '이 시기를 위한 종합 영양제', category: '영양제', price: '월 35,000원' },
                          ],
                          mood_swings: [
                            { title: '감정 조절 마음챙김', category: '명상/요가', price: '무료' },
                            { title: '이 시기 전문 심리상담', category: '상담', price: '회당 80,000원' },
                          ],
                          anxiety: [
                            { title: '감정 조절 마음챙김', category: '명상/요가', price: '무료' },
                            { title: '이 시기 전문 심리상담', category: '상담', price: '회당 80,000원' },
                          ],
                          brain_fog: [
                            { title: '이 시기 맞춤 필라테스', category: '운동', price: '월 29,000원' },
                            { title: '이 시기를 위한 종합 영양제', category: '영양제', price: '월 35,000원' },
                          ],
                        };
                        const topSymptom = symptomFrequency[0]?.symptomId || 'fatigue';
                        const solutions = SYMPTOM_SOLUTIONS[topSymptom] || SYMPTOM_SOLUTIONS['fatigue'];
                        return solutions.map((sol, i) => (
                          <Link
                            key={i}
                            href="/solutions"
                            className="flex items-center gap-4 p-3 bg-hlk-bg rounded-xl hover:bg-hlk-border transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-hlk-primary-light flex items-center justify-center flex-shrink-0">
                              <span className="text-lg">
                                {sol.category === '명상/요가' ? '🧘‍♀️' : sol.category === '영양제' ? '💊' : sol.category === '운동' ? '🏃‍♀️' : sol.category === '상담' ? '💬' : '🛍️'}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-hlk-text truncate">{sol.title}</p>
                              <p className="text-xs text-hlk-text-tertiary">{sol.category}</p>
                            </div>
                            <span className="text-sm font-semibold text-hlk-primary flex-shrink-0">{sol.price}</span>
                          </Link>
                        ));
                      })()}
                    </div>
                    <Link
                      href="/solutions"
                      className="block mt-4 py-3 bg-hlk-primary-light text-hlk-primary font-medium rounded-xl text-center hover:bg-hlk-primary hover:text-white transition-all"
                    >
                      더 많은 솔루션 보기
                    </Link>
                  </div>
                )}

                {/* 전문가 컬럼 추천 */}
                <div className="bg-white rounded-2xl p-5 border border-hlk-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-hlk-text flex items-center gap-2">
                      <span className="text-lg">🌙</span>
                      수면 회복 가이드
                    </h3>
                    <Link href="/columns" className="text-sm text-hlk-primary hover:underline">
                      전체 보기
                    </Link>
                  </div>
                  <p className="text-sm text-hlk-text-secondary mb-4">
                    나의 증상에 맞는 수면 회복 가이드로 깊이 이해해요
                  </p>
                  <div className="space-y-3">
                    {(() => {
                      // 증상 기반 관련 컬럼 추천
                      const SYMPTOM_COLUMN_MAP: Record<string, string[]> = {
                        hot_flash: ['night-waking'],
                        insomnia: ['night-waking', 'falling-asleep'],
                        fatigue: ['morning-fatigue'],
                        mood_swings: ['mind-sleep'],
                        anxiety: ['falling-asleep', 'mind-sleep'],
                        brain_fog: ['mind-sleep'],
                      };
                      const topSymptomId = symptomFrequency[0]?.symptomId || 'fatigue';
                      const relatedSlugs = SYMPTOM_COLUMN_MAP[topSymptomId] || [];
                      const relatedColumns = columns.filter(col =>
                        relatedSlugs.includes(col.sleepCategory)
                      ).slice(0, 2);
                      // fallback: 관련 컬럼이 없으면 최신 2개
                      const displayColumns = relatedColumns.length > 0 ? relatedColumns : columns.slice(0, 2);
                      return displayColumns.map((col) => (
                        <Link
                          key={col.slug}
                          href={`/columns/${col.slug}`}
                          className="flex items-start gap-3 p-3 bg-hlk-bg rounded-xl hover:bg-hlk-border transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-hlk-accent-light flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">🌙</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-hlk-text line-clamp-1">{col.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-hlk-text-tertiary">{col.expert.name}</span>
                              <span className="text-xs text-hlk-text-tertiary">·</span>
                              <span className="text-xs text-hlk-text-tertiary">{col.readTime}분 읽기</span>
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-hlk-text-tertiary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ));
                    })()}
                  </div>
                </div>

                {/* 맞춤 팁 바로가기 */}
                <button
                  onClick={() => setActiveTab('tips')}
                  className="w-full bg-gradient-to-br from-hlk-primary-light to-hlk-accent-light rounded-2xl p-5 border border-hlk-border text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <h3 className="font-semibold text-hlk-text mb-1">맞춤 케어 팁 보기</h3>
                        <p className="text-sm text-hlk-text-secondary">
                          나의 증상에 맞는 케어 방법을 확인해보세요
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-hlk-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </>
        ) : (
          // 맞춤 팁 탭
          <TipsSection logs={displayLogs} todayLog={showDemo ? DEMO_LOGS[0] : todayLog} />
        )}
      </main>

      {/* Bottom CTA */}
      {!todayLog && (
        <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-hlk-border">
          <div className="max-w-lg mx-auto">
            <Link
              href="/log/new"
              className="block w-full py-4 bg-hlk-accent text-white font-bold rounded-full text-center hover:bg-hlk-accent/90 transition-all"
            >
              오늘 기록하기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
