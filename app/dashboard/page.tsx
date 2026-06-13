'use client';

import { useState, useEffect, useMemo, type CSSProperties } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import { CONDITION_LEVELS } from '@/lib/dailyLogConstants';
import { BreathingLoader } from '@/components/ui/BreathingLoader';
import { SleepScoreRing } from '@/components/ui/SleepScoreRing';
import { AlertTriangle, ArrowRight, Meh, Smile, Sparkles, TrendingDown } from 'lucide-react';

interface DashboardLog {
  log_date: string;
  overall_condition: number;
  symptoms: string[];
  mood_tags: string[];
  sleep_hours?: number | null;
  sleep_quality?: number | null;
}

// 데모 데이터
const DEMO_LOGS: DashboardLog[] = [
  { log_date: '2026-05-31', overall_condition: 4, symptoms: ['fatigue'], mood_tags: ['calm'], sleep_hours: 7, sleep_quality: 4 },
  { log_date: '2026-05-30', overall_condition: 3, symptoms: ['hot_flash', 'insomnia'], mood_tags: ['tired'], sleep_hours: 5, sleep_quality: 2 },
  { log_date: '2026-05-29', overall_condition: 4, symptoms: ['fatigue'], mood_tags: ['happy'], sleep_hours: 7.5, sleep_quality: 4 },
  { log_date: '2026-05-28', overall_condition: 2, symptoms: ['mood_swing', 'anxiety'], mood_tags: ['anxious'], sleep_hours: 4.5, sleep_quality: 1 },
  { log_date: '2026-05-27', overall_condition: 3, symptoms: ['brain_fog'], mood_tags: ['tired'], sleep_hours: 6, sleep_quality: 3 },
];

const CONDITION_ICON_MAP = {
  1: AlertTriangle,
  2: TrendingDown,
  3: Meh,
  4: Smile,
  5: Sparkles,
} as const;

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: authLoading, isDemo } = useAuth();
  const [logs, setLogs] = useState(DEMO_LOGS);
  const [dataLoading, setDataLoading] = useState(!isDemo);
  const [todayLogged, setTodayLogged] = useState(false);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [authLoading, isLoggedIn, router]);

  useEffect(() => {
    if (authLoading || !isLoggedIn) return;
    if (isDemo) return;

    const fetchLogs = async () => {
      const { data } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user!.id)
        .order('log_date', { ascending: false })
        .limit(30);

      if (data) {
        setLogs(data as DashboardLog[]);
        const today = new Date().toISOString().split('T')[0];
        setTodayLogged(data.some(log => log.log_date === today));
      }
      setDataLoading(false);
    };

    fetchLogs();
  }, [authLoading, isLoggedIn, isDemo, user]);

  const getConditionColor = (condition: number) =>
    CONDITION_LEVELS.find(c => c.value === condition)?.color || 'bg-hlk-border';

  // 어젯밤 수면 점수 (최근 기록 기반)
  const sleepReadiness = useMemo(() => {
    if (logs.length === 0) return 50;
    const recentLogs = logs.slice(0, 5);
    const avgQuality = recentLogs.reduce((sum, log) => sum + (log.sleep_quality || 3), 0) / recentLogs.length;
    const avgCond = recentLogs.reduce((sum, log) => sum + (log.overall_condition || 3), 0) / recentLogs.length;
    return Math.round(Math.min(95, Math.max(20, (avgQuality * 10 + avgCond * 10))));
  }, [logs]);

  const scoreMessage = sleepReadiness >= 70
    ? { title: '깊이 잘 쉬셨어요', sub: '좋은 리듬을 이어가요' }
    : sleepReadiness >= 50
      ? { title: '잘 쉬고 계세요', sub: '오늘도 천천히 챙겨봐요' }
      : { title: '오늘은 더 쉬어가요', sub: '괜찮아요, 함께 돌볼게요' };

  const displayName = user?.user_metadata?.name || '회원';

  if (authLoading || !isLoggedIn || dataLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <BreathingLoader size="lg" showGuide />
        <p className="text-sm text-hlk-text-tertiary mt-4 animate-slow-fade-in-delay-2">
          잠시만요, 준비하고 있어요...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <main className="relative z-10 max-w-xl mx-auto px-6 py-12">
        {/* 인사 — 오로라 헤더 밴드 */}
        <div
          className="aurora-header rounded-3xl px-7 py-8 mb-10 animate-slow-fade-in"
          style={{ '--ah-from': '#43734F', '--ah-via': '#6E9A7C', '--ah-to': '#2F5C3D' } as CSSProperties}
        >
          <h1 className="text-2xl font-bold mb-1">안녕하세요, {displayName}님</h1>
          <p className="text-white/85">
            {todayLogged ? '오늘도 기록을 마쳤어요. 편히 쉬세요.' : '어젯밤 잠은 어떠셨어요?'}
          </p>
        </div>

        {/* 어젯밤 수면 점수 — 화면의 단 하나의 초점 */}
        <section className="card-glass rounded-3xl px-6 py-12 mb-7 flex flex-col items-center text-center animate-slow-fade-in-delay-1">
          <p className="text-xs font-semibold text-hlk-text-tertiary tracking-[0.18em] uppercase mb-6">어젯밤 수면</p>
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-44 h-44 rounded-full animate-breathe-slow"
              style={{ background: 'radial-gradient(circle, rgba(110,154,124,0.28) 0%, transparent 70%)', filter: 'blur(18px)' }}
              aria-hidden
            />
            <SleepScoreRing score={sleepReadiness} size={160} />
          </div>
          <p className="mt-8 text-xl font-semibold text-hlk-text">{scoreMessage.title}</p>
          <p className="mt-1.5 text-hlk-text-tertiary">{scoreMessage.sub}</p>
        </section>

        {/* 단 하나의 행동 */}
        {todayLogged ? (
          <div className="card-glass rounded-2xl px-6 py-5 mb-12 text-center animate-slow-fade-in-delay-2">
            <p className="text-hlk-text-secondary">오늘 밤 기록이 완료됐어요</p>
          </div>
        ) : (
          <Link
            href="/log/new"
            className="flex items-center justify-center gap-2 w-full py-4 mb-12 rounded-2xl bg-hlk-primary text-white text-base font-semibold shadow-soft hover:bg-hlk-primary-strong transition-colors animate-slow-fade-in-delay-2"
          >
            오늘 밤 기록하기
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </Link>
        )}

        {/* 최근 수면 — 아주 간결하게 (3일) */}
        {logs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-sm font-semibold text-hlk-text-secondary">최근 수면</h2>
              <Link href="/log" className="text-xs text-hlk-primary hover:underline">전체 보기</Link>
            </div>
            <div className="card-glass rounded-2xl divide-y divide-hlk-border/40 overflow-hidden">
              {logs.slice(0, 3).map((log) => {
                const ConditionIcon = CONDITION_ICON_MAP[log.overall_condition as keyof typeof CONDITION_ICON_MAP] || Meh;
                return (
                  <Link
                    key={log.log_date}
                    href={`/log/${log.log_date}`}
                    className="px-5 py-4 flex items-center gap-3 hover:bg-hlk-bg/20 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-full ${getConditionColor(log.overall_condition)} flex items-center justify-center text-white`}>
                      <ConditionIcon size={17} strokeWidth={1.75} aria-hidden />
                    </div>
                    <p className="flex-1 text-sm text-hlk-text">
                      {new Date(log.log_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                    </p>
                    <span className="text-sm text-hlk-text-tertiary">
                      {log.sleep_hours ? `${log.sleep_hours}시간` : '—'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 차분한 응원 한 줄 */}
        <p className="text-center text-sm text-hlk-text-tertiary leading-relaxed">
          오늘 밤도 편안한 잠이 찾아오길 바라요.
        </p>
      </main>
    </div>
  );
}
