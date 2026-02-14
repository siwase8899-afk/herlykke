'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CONDITION_LEVELS } from '@/lib/dailyLogConstants';

// 데모 데이터
const DEMO_LOGS = [
  { log_date: '2026-02-14', overall_condition: 4, symptoms: ['fatigue'], mood_tags: ['calm'] },
  { log_date: '2026-02-13', overall_condition: 3, symptoms: ['hot_flash', 'insomnia'], mood_tags: ['tired'] },
  { log_date: '2026-02-12', overall_condition: 4, symptoms: ['fatigue'], mood_tags: ['happy'] },
  { log_date: '2026-02-11', overall_condition: 2, symptoms: ['mood_swing', 'anxiety'], mood_tags: ['anxious'] },
  { log_date: '2026-02-10', overall_condition: 3, symptoms: ['brain_fog'], mood_tags: ['tired'] },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string; user_metadata?: { name?: string } } | null>(null);
  const [logs, setLogs] = useState(DEMO_LOGS);
  const [loading, setLoading] = useState(true);
  const [todayLogged, setTodayLogged] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    if (!isSupabaseConfigured) {
      // Demo mode
      setUser({ email: 'demo@alma.com', user_metadata: { name: '데모 사용자' } });
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);

    // Fetch logs
    const { data } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('log_date', { ascending: false })
      .limit(30);

    if (data) {
      setLogs(data);
      // Check if today is logged
      const today = new Date().toISOString().split('T')[0];
      setTodayLogged(data.some(log => log.log_date === today));
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    router.push('/');
  };

  const getConditionEmoji = (condition: number) => {
    return CONDITION_LEVELS.find(c => c.value === condition)?.emoji || '😐';
  };

  const getConditionColor = (condition: number) => {
    return CONDITION_LEVELS.find(c => c.value === condition)?.color || 'bg-gray-300';
  };

  // Calculate stats
  const avgCondition = logs.length > 0
    ? (logs.reduce((sum, log) => sum + (log.overall_condition || 0), 0) / logs.length).toFixed(1)
    : '-';

  const streakDays = logs.length; // Simplified

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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-alma-primary">
            ALMA
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-alma-text-secondary">
              {user?.user_metadata?.name || user?.email?.split('@')[0]}님
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-alma-text-tertiary hover:text-alma-text transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-5 py-8">
        {/* Welcome & CTA */}
        <div className="bg-gradient-to-br from-alma-primary to-alma-accent rounded-3xl p-8 text-white mb-8">
          <h1 className="text-2xl font-bold mb-2">
            안녕하세요, {user?.user_metadata?.name || '회원'}님!
          </h1>
          <p className="text-white/80 mb-6">
            {todayLogged
              ? '오늘의 기록을 완료했어요. 내일도 만나요!'
              : '오늘의 컨디션은 어떠세요?'}
          </p>
          {!todayLogged && (
            <Link
              href="/log"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-alma-primary font-bold rounded-xl hover:bg-white/90 transition-all"
            >
              오늘 기록하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-alma-border text-center">
            <p className="text-3xl font-bold text-alma-primary">{logs.length}</p>
            <p className="text-sm text-alma-text-secondary mt-1">기록 횟수</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-alma-border text-center">
            <p className="text-3xl font-bold text-alma-accent">{avgCondition}</p>
            <p className="text-sm text-alma-text-secondary mt-1">평균 컨디션</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-alma-border text-center">
            <p className="text-3xl font-bold text-alma-secondary">{streakDays}일</p>
            <p className="text-sm text-alma-text-secondary mt-1">연속 기록</p>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="bg-white rounded-3xl border border-alma-border overflow-hidden">
          <div className="px-6 py-4 border-b border-alma-border flex items-center justify-between">
            <h2 className="font-bold text-alma-text">최근 기록</h2>
            <Link href="/log/history" className="text-sm text-alma-primary hover:underline">
              전체 보기
            </Link>
          </div>

          {logs.length === 0 ? (
            <div className="p-12 text-center text-alma-text-tertiary">
              아직 기록이 없어요. 첫 기록을 시작해보세요!
            </div>
          ) : (
            <div className="divide-y divide-alma-border">
              {logs.slice(0, 7).map((log) => (
                <div
                  key={log.log_date}
                  className="px-6 py-4 flex items-center justify-between hover:bg-alma-bg/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${getConditionColor(log.overall_condition)} flex items-center justify-center text-xl`}>
                      {getConditionEmoji(log.overall_condition)}
                    </div>
                    <div>
                      <p className="font-medium text-alma-text">
                        {new Date(log.log_date).toLocaleDateString('ko-KR', {
                          month: 'long',
                          day: 'numeric',
                          weekday: 'short',
                        })}
                      </p>
                      <p className="text-sm text-alma-text-tertiary">
                        {log.symptoms?.length > 0
                          ? `${log.symptoms.length}개 증상 기록`
                          : '증상 없음'}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/log/${log.log_date}`}
                    className="text-sm text-alma-text-tertiary hover:text-alma-primary transition-colors"
                  >
                    상세 보기 →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Insights Preview */}
        <Link
          href="/insights"
          className="mt-8 block bg-gradient-to-r from-alma-primary-light to-alma-accent-light rounded-2xl p-5 border border-alma-border hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-alma-primary to-alma-accent flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">AI</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-alma-text mb-1">나의 AI 맞춤 조언</h3>
              <p className="text-sm text-alma-text-secondary">
                기록을 분석해서 나만의 패턴과 맞춤 조언을 확인해보세요
              </p>
            </div>
            <svg className="w-5 h-5 text-alma-text-tertiary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link
            href="/insights"
            className="bg-white rounded-2xl p-5 border border-alma-border hover:border-alma-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-alma-primary/20 to-alma-accent/20 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-alma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="font-semibold text-alma-text">AI 인사이트</p>
            <p className="text-sm text-alma-text-tertiary mt-1">맞춤 조언 확인</p>
          </Link>

          <Link
            href="/community"
            className="bg-white rounded-2xl p-5 border border-alma-border hover:border-alma-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-alma-accent-light flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-alma-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <p className="font-semibold text-alma-text">커뮤니티</p>
            <p className="text-sm text-alma-text-tertiary mt-1">비슷한 친구들과 대화</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
