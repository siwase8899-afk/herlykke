'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import { CONDITION_LEVELS } from '@/lib/dailyLogConstants';
import { columns } from '@/lib/columnsData';
import { TodaySymptomsWidget } from '@/components/community/TodaySymptomsWidget';
import { BreathingLoader } from '@/components/ui/BreathingLoader';
import { SleepCycleViz } from '@/components/ui/SleepCycleViz';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { PersonalizedFeed } from '@/components/dashboard/PersonalizedFeed';
import { TodaysReading } from '@/components/dashboard/TodaysReading';

// 데모 데이터
const DEMO_LOGS = [
  { log_date: '2026-05-31', overall_condition: 4, symptoms: ['fatigue'], mood_tags: ['calm'], sleep_hours: 7, sleep_quality: 4 },
  { log_date: '2026-05-30', overall_condition: 3, symptoms: ['hot_flash', 'insomnia'], mood_tags: ['tired'], sleep_hours: 5, sleep_quality: 2 },
  { log_date: '2026-05-29', overall_condition: 4, symptoms: ['fatigue'], mood_tags: ['happy'], sleep_hours: 7.5, sleep_quality: 4 },
  { log_date: '2026-05-28', overall_condition: 2, symptoms: ['mood_swing', 'anxiety'], mood_tags: ['anxious'], sleep_hours: 4.5, sleep_quality: 1 },
  { log_date: '2026-05-27', overall_condition: 3, symptoms: ['brain_fog'], mood_tags: ['tired'], sleep_hours: 6, sleep_quality: 3 },
];

const SLEEP_EMOJIS = [
  { value: 1, emoji: '😢', label: '거의 못 잤어요' },
  { value: 2, emoji: '😕', label: '뒤척였어요' },
  { value: 3, emoji: '😐', label: '그저 그래요' },
  { value: 4, emoji: '🙂', label: '잘 잤어요' },
  { value: 5, emoji: '😊', label: '숙면했어요' },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: authLoading, isDemo } = useAuth();
  const [logs, setLogs] = useState(DEMO_LOGS);
  const [dataLoading, setDataLoading] = useState(true);
  const [todayLogged, setTodayLogged] = useState(false);
  const [selectedSleep, setSelectedSleep] = useState<number | null>(null);
  const [sleepSaved, setSleepSaved] = useState(false);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [authLoading, isLoggedIn, router]);

  useEffect(() => {
    if (authLoading || !isLoggedIn) return;

    if (isDemo) {
      setDataLoading(false);
      return;
    }

    const fetchLogs = async () => {
      const { data } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user!.id)
        .order('log_date', { ascending: false })
        .limit(30);

      if (data) {
        setLogs(data);
        const today = new Date().toISOString().split('T')[0];
        setTodayLogged(data.some(log => log.log_date === today));
      }
      setDataLoading(false);
    };

    fetchLogs();
  }, [authLoading, isLoggedIn, isDemo, user]);

  const todayColumn = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return columns[dayOfYear % columns.length];
  }, []);

  const getConditionEmoji = (condition: number) =>
    CONDITION_LEVELS.find(c => c.value === condition)?.emoji || '😐';

  const getConditionColor = (condition: number) =>
    CONDITION_LEVELS.find(c => c.value === condition)?.color || 'bg-gray-300';

  // Stats
  const avgSleep = logs.length > 0
    ? (logs.reduce((sum, log) => sum + ((log as any).sleep_hours || 0), 0) / logs.length).toFixed(1)
    : '-';
  const avgSleepQuality = logs.length > 0
    ? (logs.reduce((sum, log) => sum + ((log as any).sleep_quality || 0), 0) / logs.length).toFixed(1)
    : '-';

  // Sleep readiness (simple calculation from recent logs)
  const sleepReadiness = useMemo(() => {
    if (logs.length === 0) return 50;
    const recentLogs = logs.slice(0, 5);
    const avgQuality = recentLogs.reduce((sum, log) => sum + ((log as any).sleep_quality || 3), 0) / recentLogs.length;
    const avgCond = recentLogs.reduce((sum, log) => sum + (log.overall_condition || 3), 0) / recentLogs.length;
    return Math.round(Math.min(95, Math.max(20, (avgQuality * 10 + avgCond * 10))));
  }, [logs]);

  // Night disruption score from recent symptoms
  const nightDisruption = useMemo(() => {
    const recentSymptoms = logs.slice(0, 5).flatMap(log => log.symptoms || []);
    const disruptors = ['anxiety', 'mood_swing', 'insomnia', 'hot_flash', 'night_sweat'];
    const count = recentSymptoms.filter(s => disruptors.includes(s)).length;
    if (count >= 4) return { level: 75, label: '수면 방해 요인이 많아요', emoji: '🌊', color: '#D98B8B' };
    if (count >= 2) return { level: 50, label: '가끔 깨는 밤이 있어요', emoji: '🌗', color: '#E0C49A' };
    return { level: 25, label: '비교적 안정적이에요', emoji: '🌙', color: '#6F9CA6' };
  }, [logs]);

  // Sleep trend (improving / declining / stable)
  const sleepTrend = useMemo(() => {
    if (logs.length < 3) return null;
    const recent = logs.slice(0, 3).reduce((sum, log) => sum + ((log as any).sleep_quality || 3), 0) / 3;
    const older = logs.slice(3, 6).reduce((sum, log) => sum + ((log as any).sleep_quality || 3), 0) / Math.min(3, logs.slice(3, 6).length || 1);
    const diff = recent - older;
    if (diff > 0.5) return { label: '수면이 좋아지고 있어요', icon: '📈', color: 'text-green-600' };
    if (diff < -0.5) return { label: '수면에 신경 써보세요', icon: '📉', color: 'text-red-500' };
    return { label: '수면 패턴이 일정해요', icon: '➡️', color: 'text-amber-500' };
  }, [logs]);

  const displayName = user?.user_metadata?.name || '회원';

  const handleSleepSelect = (value: number) => {
    setSelectedSleep(value);
    setSleepSaved(true);
    setTimeout(() => setSleepSaved(false), 2000);
  };

  if (authLoading || !isLoggedIn || dataLoading) {
    return (
      <div className="min-h-screen bg-hlk-bg flex flex-col items-center justify-center gap-4">
        <BreathingLoader size="lg" showGuide />
        <p className="text-sm text-hlk-text-tertiary mt-4 animate-slow-fade-in-delay-2">
          잠시만요, 준비하고 있어요...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hlk-bg relative">
      <FloatingOrbs />
      <main className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-10">
        {/* Welcome + greeting */}
        <div className="mb-8 animate-slow-fade-in">
          <h1 className="text-2xl font-extrabold text-hlk-text mb-1">
            안녕하세요, {displayName}님
          </h1>
          <p className="text-hlk-text-secondary text-sm">
            {todayLogged ? '오늘의 수면 기록이 완료되었어요' : '어젯밤 잠은 어떠셨어요?'}
          </p>
        </div>

        {/* ── Sleep Check-in ── */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-hlk-border/60 shadow-sm mb-5 animate-slow-fade-in-delay-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-hlk-text">어젯밤 수면</h2>
              <p className="text-xs text-hlk-text-tertiary">어젯밤 수면을 평가해주세요</p>
            </div>
            {sleepSaved && (
              <span className="text-xs text-hlk-primary font-medium animate-pulse">저장됨</span>
            )}
          </div>
          <div className="flex justify-between gap-2">
            {SLEEP_EMOJIS.map((item) => (
              <button
                key={item.value}
                onClick={() => handleSleepSelect(item.value)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all duration-200 ${
                  selectedSleep === item.value
                    ? 'bg-hlk-primary-light border border-hlk-primary/30 scale-105 shadow-sm'
                    : 'bg-hlk-bg/50 border border-transparent hover:bg-hlk-bg'
                }`}
              >
                <span className={`text-2xl transition-transform duration-200 ${selectedSleep === item.value ? 'scale-110' : ''}`}>
                  {item.emoji}
                </span>
                <span className={`text-[11px] font-medium ${
                  selectedSleep === item.value ? 'text-hlk-primary' : 'text-hlk-text-tertiary'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          {selectedSleep && (
            <div className="mt-4 pt-3 border-t border-hlk-border/40">
              <Link
                href="/log/new"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm text-hlk-primary font-medium hover:bg-hlk-primary-light/50 rounded-xl transition-colors"
              >
                상세 수면 기록하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* ── Sleep Score + Night Disruption ── */}
        <div className="grid grid-cols-2 gap-4 mb-5 animate-slow-fade-in-delay-2">
          {/* Sleep Score — Moon Phase */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-hlk-border/60 shadow-sm">
            <p className="text-xs font-semibold text-hlk-text-tertiary tracking-wide uppercase mb-3">수면 점수</p>
            <div className="flex flex-col items-center mb-2">
              <SleepCycleViz quality={sleepReadiness} size={72} />
              <p className="text-2xl font-extrabold text-hlk-text mt-2 tabular-nums">{sleepReadiness}</p>
            </div>
            <p className="text-center text-[11px] text-hlk-text-tertiary">
              {sleepReadiness >= 70 ? '깊은 잠을 자고 있어요' : sleepReadiness >= 50 ? '조금 더 챙겨보세요' : '수면 회복이 필요해요'}
            </p>
          </div>

          {/* Night Disruption */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-hlk-border/60 shadow-sm">
            <p className="text-xs font-semibold text-hlk-text-tertiary tracking-wide uppercase mb-4">야간 방해 요인</p>
            <div className="flex flex-col items-center mb-3">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{ backgroundColor: nightDisruption.color + '18' }}
                >
                  <span className="text-2xl">
                    {nightDisruption.emoji}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-hlk-border rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${nightDisruption.level}%`, backgroundColor: nightDisruption.color }}
              />
            </div>
            <p className="text-center text-[11px] text-hlk-text-tertiary">{nightDisruption.label}</p>
          </div>
        </div>

        {/* ── Quick CTA if not logged today ── */}
        {!todayLogged && (
          <Link
            href="/log/new"
            className="group flex items-center gap-4 bg-gradient-to-r from-hlk-primary to-hlk-primary-dark rounded-2xl p-5 mb-5 text-white hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-hlk-primary/10 animate-glow-pulse"
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold">오늘의 수면 기록하기</p>
              <p className="text-white/60 text-xs">어젯밤 수면, 컨디션, 증상을 기록해요</p>
            </div>
            <svg className="w-5 h-5 text-white/40 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        {/* ── Sleep Stats ── */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-hlk-border/60 text-center">
            <p className="text-2xl font-extrabold text-hlk-primary">{logs.length}</p>
            <p className="text-[11px] text-hlk-text-tertiary mt-0.5">기록한 밤</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-hlk-border/60 text-center">
            <p className="text-2xl font-extrabold text-hlk-text">{avgSleep}h</p>
            <p className="text-[11px] text-hlk-text-tertiary mt-0.5">평균 수면</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-hlk-border/60 text-center">
            <p className="text-2xl font-extrabold text-hlk-accent">{avgSleepQuality}</p>
            <p className="text-[11px] text-hlk-text-tertiary mt-0.5">수면의 질</p>
          </div>
        </div>

        {/* ── Sleep Trend ── */}
        {sleepTrend && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-hlk-border/60 mb-5 flex items-center justify-center gap-2">
            <span className="text-lg">{sleepTrend.icon}</span>
            <span className={`text-sm font-medium ${sleepTrend.color}`}>{sleepTrend.label}</span>
          </div>
        )}


        {/* ── Personalized Content Feed ── */}
        <PersonalizedFeed symptoms={logs.slice(0, 5).flatMap(log => log.symptoms || [])} />

        {/* ── Today's Reading (column + recipe + tip) ── */}
        <TodaysReading />

        {/* ── Community Preview ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-hlk-text">함께하기</h2>
            <Link href="/community" className="text-xs text-hlk-primary hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="space-y-3">
            <TodaySymptomsWidget />

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-hlk-border/60 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEE500]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#3C1E1E]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.62 0 0-.02.16.08.22.1.06.22.01.22.01.29-.04 3.37-2.2 3.9-2.57.69.1 1.4.15 2.13.15 5.52 0 10-3.58 10-7.94S17.52 3 12 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-hlk-text">잠 못 드는 밤 토크방</p>
                  <p className="text-xs text-hlk-text-secondary">같은 고민을 나누는 동료들과 대화</p>
                </div>
              </div>
              <Link
                href="/community"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#FEE500] text-[#3C1E1E] text-sm font-bold rounded-xl hover:bg-[#FDD835] transition-colors"
              >
                토크방 참여하기
              </Link>
            </div>
          </div>
        </div>

        {/* ── Recent Sleep Logs ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-hlk-text">최근 수면 기록</h2>
            <Link href="/log" className="text-xs text-hlk-primary hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-hlk-border/60 overflow-hidden">
            {logs.length === 0 ? (
              <div className="p-10 text-center text-hlk-text-tertiary text-sm">
                아직 기록이 없어요. 오늘 밤부터 수면 기록을 시작해보세요!
              </div>
            ) : (
              <div className="divide-y divide-hlk-border/40">
                {logs.slice(0, 5).map((log) => (
                  <div
                    key={log.log_date}
                    className="px-5 py-3.5 flex items-center justify-between hover:bg-hlk-bg/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${getConditionColor(log.overall_condition)} flex items-center justify-center text-lg`}>
                        {getConditionEmoji(log.overall_condition)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-hlk-text">
                          {new Date(log.log_date).toLocaleDateString('ko-KR', {
                            month: 'long',
                            day: 'numeric',
                            weekday: 'short',
                          })}
                        </p>
                        <p className="text-xs text-hlk-text-tertiary">
                          {(log as any).sleep_hours ? `${(log as any).sleep_hours}시간 수면` : '수면 기록 없음'}
                          {log.symptoms?.length > 0 && ` · ${log.symptoms.length}개 증상`}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/log/${log.log_date}`}
                      className="text-xs text-hlk-text-tertiary hover:text-hlk-primary transition-colors"
                    >
                      보기 →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Sleep Pattern Report ── */}
        <Link
          href="/insights"
          className="group block bg-gradient-to-r from-hlk-primary-light/60 to-hlk-accent-light/60 rounded-2xl p-5 border border-hlk-border/40 hover:shadow-md transition-all mb-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-hlk-primary to-hlk-accent flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-hlk-text mb-0.5">나의 수면 패턴 리포트</h3>
              <p className="text-xs text-hlk-text-secondary">기록에서 발견한 나만의 수면 패턴</p>
            </div>
            <svg className="w-4 h-4 text-hlk-text-tertiary flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* ── Seller Recruitment ── */}
        <Link
          href="/seller"
          className="group block bg-white/90 backdrop-blur-sm rounded-2xl border border-hlk-accent/20 p-5 hover:shadow-md transition-all mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-hlk-accent-light flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🤝</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-sm font-bold text-hlk-text">동료 셀러 1기 모집</h3>
                <span className="px-2 py-0.5 bg-hlk-accent text-white text-[10px] font-bold rounded-full">NEW</span>
              </div>
              <p className="text-xs text-hlk-text-secondary">
                경험을 나누고, 동료 셀러로 함께 성장해요
              </p>
            </div>
            <svg className="w-4 h-4 text-hlk-text-tertiary flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* ── Gentle supportive message ── */}
        <div className="text-center py-6">
          <p className="text-sm text-hlk-text-tertiary">
            오늘 밤도 편안한 잠이 찾아오길 바라요.
            <br />
            <span className="text-hlk-text-secondary font-medium">매일의 기록이 숙면의 첫걸음이에요.</span>
          </p>
        </div>
      </main>
    </div>
  );
}
