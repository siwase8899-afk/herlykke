'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import { CONDITION_LEVELS } from '@/lib/dailyLogConstants';
import { columns } from '@/lib/columnsData';
import { DEMO_POSTS, CATEGORIES, formatTimeAgo } from '@/lib/communityConstants';

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
  const { user, isLoggedIn, isLoading: authLoading, isDemo } = useAuth();
  const [logs, setLogs] = useState(DEMO_LOGS);
  const [dataLoading, setDataLoading] = useState(true);
  const [todayLogged, setTodayLogged] = useState(false);

  // 비로그인 → /login 리다이렉트
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [authLoading, isLoggedIn, router]);

  // 로그 데이터 로드
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

  // 오늘의 컬럼 — 날짜 기반 1개 추천
  const todayColumn = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return columns[dayOfYear % columns.length];
  }, []);

  // 커뮤니티 미리보기 — 최근 3개
  const recentPosts = DEMO_POSTS.slice(0, 3);

  const getConditionEmoji = (condition: number) =>
    CONDITION_LEVELS.find(c => c.value === condition)?.emoji || '😐';

  const getConditionColor = (condition: number) =>
    CONDITION_LEVELS.find(c => c.value === condition)?.color || 'bg-gray-300';

  // Stats
  const avgCondition = logs.length > 0
    ? (logs.reduce((sum, log) => sum + (log.overall_condition || 0), 0) / logs.length).toFixed(1)
    : '-';
  const streakDays = logs.length;

  const displayName = user?.user_metadata?.name || '회원';

  if (authLoading || !isLoggedIn || dataLoading) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-secondary">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alma-bg">
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-10">
        {/* Section 1: 환영 + 오늘 기록하기 CTA */}
        <div className="bg-gradient-to-br from-alma-primary to-alma-accent rounded-3xl p-8 md:p-10 text-white mb-10">
          <h1 className="text-2xl font-bold mb-2">
            안녕하세요, {displayName}님!
          </h1>
          <p className="text-white/80 mb-6">
            {todayLogged
              ? '오늘의 기록을 완료했어요. 내일도 만나요!'
              : '오늘의 컨디션은 어떠세요?'}
          </p>
          {!todayLogged && (
            <Link
              href="/log/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-alma-primary font-bold rounded-xl hover:bg-white/90 transition-all"
            >
              오늘 기록하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>

        {/* Section 2: 오늘의 전문가 컬럼 */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-alma-text">오늘의 전문가 컬럼</h2>
            <Link href="/columns" className="text-sm text-alma-primary hover:underline">
              전체 보기
            </Link>
          </div>
          <Link
            href={`/columns/${todayColumn.slug}`}
            className="block bg-white rounded-2xl border border-alma-border overflow-hidden hover:shadow-md transition-all"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                    todayColumn.category === 'body'
                      ? 'bg-alma-primary/10 text-alma-primary'
                      : 'bg-alma-accent/10 text-alma-accent'
                  }`}
                >
                  {todayColumn.symptom}
                </span>
                <span className="text-xs text-alma-text-tertiary">
                  {todayColumn.readTime}분 읽기
                </span>
              </div>
              <h3 className="text-lg font-bold text-alma-text leading-snug mb-2">
                {todayColumn.title}
              </h3>
              <p className="text-sm text-alma-text-secondary leading-relaxed line-clamp-2 mb-4">
                {todayColumn.subtitle}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-alma-secondary-light flex items-center justify-center">
                  <span className="text-xs font-bold text-alma-text">
                    {todayColumn.expert.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-alma-text">{todayColumn.expert.name}</p>
                  <p className="text-xs text-alma-text-tertiary">{todayColumn.expert.title}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Section 3: 커뮤니티 미리보기 */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-alma-text">커뮤니티</h2>
            <Link href="/community" className="text-sm text-alma-primary hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="space-y-3">
            {recentPosts.map((post) => {
              const category = CATEGORIES.find(c => c.id === post.category);
              return (
                <Link
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="block bg-white rounded-2xl border border-alma-border p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${category?.color || ''}`}>
                          {category?.icon} {category?.label}
                        </span>
                        <span className="text-xs text-alma-text-tertiary">
                          {formatTimeAgo(post.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-alma-text leading-relaxed line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-alma-text-tertiary">
                        <span>💜 {post.like_count}</span>
                        <span>💬 {post.comment_count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 4: 주간 통계 + 스트릭 + 최근 기록 */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-alma-text mb-4">나의 기록</h2>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 border border-alma-border text-center">
              <p className="text-3xl font-bold text-alma-primary">{logs.length}</p>
              <p className="text-sm text-alma-text-secondary mt-1">기록 횟수</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-alma-border text-center">
              <p className="text-3xl font-bold text-alma-accent">{avgCondition}</p>
              <p className="text-sm text-alma-text-secondary mt-1">평균 컨디션</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-alma-border text-center">
              <p className="text-3xl font-bold text-alma-secondary">{streakDays}일</p>
              <p className="text-sm text-alma-text-secondary mt-1">연속 기록</p>
            </div>
          </div>

          {/* Recent Logs */}
          <div className="bg-white rounded-3xl border border-alma-border overflow-hidden">
            <div className="px-6 py-4 border-b border-alma-border flex items-center justify-between">
              <h3 className="font-bold text-alma-text">최근 기록</h3>
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
                {logs.slice(0, 5).map((log) => (
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
        </div>

        {/* AI Insights Preview */}
        <Link
          href="/insights"
          className="block bg-gradient-to-r from-alma-primary-light to-alma-accent-light rounded-2xl p-5 border border-alma-border hover:shadow-md transition-all mb-10"
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

        {/* 추천 솔루션 미리보기 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-alma-text">추천 솔루션</h2>
            <Link href="/solutions" className="text-sm text-alma-primary hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(() => {
              // 최근 기록 증상 기반 솔루션 추천
              const recentSymptoms = logs.flatMap(log => log.symptoms || []);
              const hasHotFlash = recentSymptoms.includes('hot_flash');
              const hasInsomnia = recentSymptoms.includes('insomnia');
              const hasFatigue = recentSymptoms.includes('fatigue');

              const recommendedSolutions = [
                hasHotFlash || (!hasInsomnia && !hasFatigue)
                  ? { title: '갱년기 전용 명상 프로그램', desc: '열감과 불안을 다스리는 10분 호흡 명상', icon: '🧘‍♀️', price: '무료', match: 95 }
                  : hasInsomnia
                    ? { title: '숙면을 위한 요가 니드라', desc: '깊은 이완으로 수면의 질을 높이는 가이드', icon: '🌙', price: '월 9,900원', match: 92 }
                    : { title: '아침 10분 스트레칭', desc: '활기찬 하루를 시작하는 간단한 루틴', icon: '🏃‍♀️', price: '무료', match: 85 },
                hasFatigue
                  ? { title: '여성 갱년기 종합 영양제', desc: '이소플라본, 비타민D, 칼슘 맞춤 영양제', icon: '💊', price: '월 35,000원', match: 94 }
                  : { title: '1:1 갱년기 코칭 프로그램', desc: '전문 코치와 8주간 맞춤 관리', icon: '🤝', price: '월 120,000원', match: 96 },
              ];

              return recommendedSolutions.map((sol, i) => (
                <Link
                  key={i}
                  href="/solutions"
                  className="block bg-white rounded-2xl border border-alma-border p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-alma-primary-light flex items-center justify-center flex-shrink-0 text-2xl">
                      {sol.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-alma-text truncate">{sol.title}</h3>
                        <span className="flex-shrink-0 text-xs bg-alma-primary text-white px-2 py-0.5 rounded-full">{sol.match}%</span>
                      </div>
                      <p className="text-xs text-alma-text-secondary line-clamp-1 mb-2">{sol.desc}</p>
                      <span className="text-sm font-semibold text-alma-primary">{sol.price}</span>
                    </div>
                  </div>
                </Link>
              ));
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
