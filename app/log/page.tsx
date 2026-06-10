'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLogStore } from '@/stores/logStore';
import { useAuth } from '@/lib/authContext';
import { SYMPTOMS, MOOD_OPTIONS } from '@/lib/logTypes';
import { EmojiIcon } from '@/lib/iconMap';

// 게스트/빈 데이터용 데모 로그
const DEMO_LOGS = [
  { id: 'demo_1', date: '2026-02-15', mood: 4, symptoms: [{ symptomId: 'fatigue', severity: 2 }], sleep: { bedTime: '23:00', wakeTime: '07:00', quality: 4 }, activities: ['exercise', 'meditation'] },
  { id: 'demo_2', date: '2026-02-14', mood: 3, symptoms: [{ symptomId: 'hot_flash', severity: 3 }, { symptomId: 'insomnia', severity: 2 }], sleep: { bedTime: '00:00', wakeTime: '06:00', quality: 2 }, activities: ['caffeine'] },
  { id: 'demo_3', date: '2026-02-13', mood: 4, symptoms: [{ symptomId: 'fatigue', severity: 2 }], sleep: { bedTime: '22:30', wakeTime: '06:30', quality: 4 }, activities: ['exercise', 'walk'] },
  { id: 'demo_4', date: '2026-02-12', mood: 2, symptoms: [{ symptomId: 'mood_swings', severity: 4 }, { symptomId: 'anxiety', severity: 3 }], sleep: { bedTime: '01:00', wakeTime: '05:00', quality: 1 }, activities: ['stress'] },
  { id: 'demo_5', date: '2026-02-11', mood: 3, symptoms: [{ symptomId: 'brain_fog', severity: 2 }], sleep: { bedTime: '23:30', wakeTime: '06:30', quality: 3 }, activities: ['walk'] },
  { id: 'demo_6', date: '2026-02-10', mood: 5, symptoms: [], sleep: { bedTime: '22:00', wakeTime: '06:30', quality: 5 }, activities: ['exercise', 'meditation', 'walk'] },
  { id: 'demo_7', date: '2026-02-09', mood: 3, symptoms: [{ symptomId: 'hot_flash', severity: 2 }, { symptomId: 'fatigue', severity: 2 }], sleep: { bedTime: '23:00', wakeTime: '06:00', quality: 3 }, activities: ['caffeine'] },
];

function LogDashboardContent() {
  const searchParams = useSearchParams();
  const justSaved = searchParams.get('saved') === 'true';

  const { logs, getTodayLog, calculateStreak, loadFromServer } = useLogStore();
  const { user, isLoggedIn, isDemo } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [hydrating, setHydrating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isRealUser = isLoggedIn && !isDemo;

  // 로그인한 실제 사용자는 서버에서 수면 로그를 불러와 localStorage와 병합
  useEffect(() => {
    if (isRealUser && user) {
      setHydrating(true);
      loadFromServer(user.id).finally(() => setHydrating(false));
    }
  }, [isRealUser, user, loadFromServer]);

  if (!mounted || (isRealUser && hydrating)) {
    return (
      <div className="min-h-screen bg-hlk-bg flex items-center justify-center">
        <div className="text-hlk-text-tertiary">로딩 중...</div>
      </div>
    );
  }

  // 게스트/미설정 환경에서만 데모 데이터 미리보기. 실제 사용자는 빈 상태 UI 노출
  const previewMode = !isRealUser && logs.length === 0;
  const displayLogs = previewMode ? DEMO_LOGS : logs;

  const todayLog = previewMode ? null : getTodayLog();
  const streakCount = previewMode ? 7 : calculateStreak();

  // 오늘 날짜
  const today = new Date();
  const dateStr = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  // 최근 7일 로그
  const recentLogs = [...displayLogs]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7);

  return (
    <div className="min-h-screen bg-hlk-bg">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* 저장 완료 메시지 */}
        {justSaved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <EmojiIcon emoji="🎉" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-800">수면 일지 완료!</p>
              <p className="text-sm text-green-600 flex items-center gap-1">오늘도 잘 기록했어요 <EmojiIcon emoji="🌙" size={14} /></p>
            </div>
          </div>
        )}

        {/* 데모 안내 배너 */}
        {previewMode && (
          <div className="mb-6 p-4 bg-hlk-accent-light border border-hlk-accent/20 rounded-2xl">
            <div className="flex items-center gap-3">
              <EmojiIcon emoji="✨" size={20} className="text-hlk-accent" />
              <div>
                <p className="text-sm font-semibold text-hlk-accent">미리보기 모드</p>
                <p className="text-xs text-hlk-text-secondary">데모 데이터로 서비스를 체험하고 있어요</p>
              </div>
              <Link href="/checkin" className="ml-auto px-4 py-2 bg-hlk-accent text-white text-xs font-bold rounded-full hover:bg-hlk-accent/90 transition-colors flex-shrink-0">
                시작하기
              </Link>
            </div>
          </div>
        )}

        {/* CARE pillar 인사말 */}
        <div className="mb-8">
          <p className="text-sm text-hlk-text-tertiary mb-1">{dateStr}</p>
          <h1 className="text-2xl font-bold text-hlk-text mb-1">
            수면 일지
          </h1>
          <p className="text-sm text-hlk-text-secondary">
            매일 3분, 어젯밤 수면을 기록해요
          </p>
        </div>

        {/* 오늘 기록 상태 카드 */}
        <div className="bg-white rounded-2xl p-6 border border-hlk-border shadow-sm mb-6">
          {todayLog ? (
            // 오늘 기록 완료
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-hlk-text">오늘 수면 일지 완료!</p>
                    <p className="text-sm text-hlk-text-tertiary">수고했어요</p>
                  </div>
                </div>
                <Link
                  href="/log/new"
                  className="text-sm text-hlk-primary font-medium hover:underline"
                >
                  수정하기
                </Link>
              </div>

              {/* 오늘 기록 요약 */}
              <div className="bg-hlk-bg rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-hlk-text-tertiary">아침 컨디션</span>
                  <EmojiIcon emoji={MOOD_OPTIONS.find((m) => m.value === todayLog.mood)?.emoji} size={20} />
                </div>
                {todayLog.symptoms.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-hlk-text-tertiary">증상</span>
                    <div className="flex gap-1">
                      {todayLog.symptoms.slice(0, 4).map((s) => (
                        <EmojiIcon key={s.symptomId} emoji={SYMPTOMS.find((sym) => sym.id === s.symptomId)?.emoji} size={18} />
                      ))}
                      {todayLog.symptoms.length > 4 && (
                        <span className="text-sm text-hlk-text-tertiary">
                          +{todayLog.symptoms.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {todayLog.sleep && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-hlk-text-tertiary">수면</span>
                    <span className="text-sm font-medium text-hlk-text">
                      {todayLog.sleep.bedTime} ~ {todayLog.sleep.wakeTime}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // 오늘 기록 안 함
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-hlk-primary-light flex items-center justify-center mx-auto mb-4">
                <EmojiIcon emoji="🌙" size={28} className="text-hlk-primary" />
              </div>
              <h2 className="text-lg font-bold text-hlk-text mb-2">
                어젯밤 수면을 기록해볼까요?
              </h2>
              <p className="text-sm text-hlk-text-secondary mb-6">
                3분이면 충분해요
              </p>
              <Link
                href="/log/new"
                className="inline-flex items-center justify-center w-full py-4 bg-hlk-accent text-white font-bold rounded-full hover:bg-hlk-accent/90 active:scale-[0.98] transition-all shadow-lg shadow-hlk-accent/30"
              >
                수면 기록하기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* 스트릭 카드 */}
        <div className="bg-gradient-to-r from-hlk-accent to-amber-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">연속 수면 기록</p>
              <p className="text-4xl font-black">{streakCount}일</p>
            </div>
            <div><EmojiIcon emoji="🔥" size={40} className="text-white/90" /></div>
          </div>
          {streakCount >= 7 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white/90">
                <EmojiIcon emoji="🎉" size={14} /> 7일 연속 달성! 수면 패턴 리포트가 열렸어요
              </p>
            </div>
          )}
          {streakCount > 0 && streakCount < 7 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white/90">
                {7 - streakCount}일 더 기록하면 수면 패턴 리포트가 열려요
              </p>
              <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(streakCount / 7) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 컨디션 변화 추적 - 최근 7일 기분 트렌드 */}
        {recentLogs.length >= 2 && (
          <div className="bg-white rounded-2xl p-6 border border-hlk-border mb-6">
            <h3 className="font-semibold text-hlk-text mb-1">아침 컨디션 변화</h3>
            <p className="text-xs text-hlk-text-tertiary mb-4">최근 {recentLogs.length}일간 기상 후 컨디션</p>
            <div className="flex items-end justify-between gap-1 h-24 px-2">
              {[...recentLogs].reverse().map((log) => {
                const mood = log.mood;
                const heightPercent = (mood / 5) * 100;
                const moodEmoji = MOOD_OPTIONS.find((m) => m.value === mood)?.emoji;
                const logDate = new Date(log.date);
                const dayLabel = logDate.toLocaleDateString('ko-KR', { weekday: 'short' });
                return (
                  <div key={log.id} className="flex-1 flex flex-col items-center gap-1">
                    <EmojiIcon emoji={moodEmoji} size={16} />
                    <div className="w-full max-w-[32px] bg-hlk-bg rounded-full overflow-hidden" style={{ height: '60px' }}>
                      <div
                        className="w-full rounded-full transition-all"
                        style={{
                          height: `${heightPercent}%`,
                          marginTop: `${100 - heightPercent}%`,
                          background: mood >= 4 ? '#7C6BC4' : mood >= 3 ? '#D4A8E0' : '#E8D5EF',
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-hlk-text-tertiary">{dayLabel}</span>
                  </div>
                );
              })}
            </div>
            {(() => {
              const avgMood = recentLogs.reduce((sum, l) => sum + l.mood, 0) / recentLogs.length;
              const trend = recentLogs.length >= 3
                ? recentLogs[0].mood - recentLogs[recentLogs.length - 1].mood
                : 0;
              return (
                <div className="mt-4 pt-3 border-t border-hlk-border flex items-center justify-between">
                  <div className="text-sm text-hlk-text-secondary">
                    평균 컨디션: <span className="font-semibold text-hlk-primary">{avgMood.toFixed(1)}</span>/5
                  </div>
                  <div className="text-sm">
                    {trend > 0 ? (
                      <span className="text-green-600 inline-flex items-center gap-1"><EmojiIcon emoji="📈" size={14} /> 개선 중</span>
                    ) : trend < 0 ? (
                      <span className="text-amber-600 inline-flex items-center gap-1"><EmojiIcon emoji="📉" size={14} /> 관리 필요</span>
                    ) : (
                      <span className="text-hlk-text-tertiary inline-flex items-center gap-1"><EmojiIcon emoji="➡️" size={14} /> 유지 중</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 수면/활동 요약 */}
        {recentLogs.length >= 2 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white rounded-2xl p-4 border border-hlk-border text-center">
              <div className="mb-1"><EmojiIcon emoji="😴" size={22} className="text-hlk-primary" /></div>
              <p className="text-xs text-hlk-text-tertiary">수면 추적</p>
              <p className="text-sm font-semibold text-hlk-text mt-1">
                {recentLogs.filter(l => l.sleep).length}/{recentLogs.length}일 기록
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-hlk-border text-center">
              <div className="mb-1"><EmojiIcon emoji="🏃" size={22} className="text-hlk-primary" /></div>
              <p className="text-xs text-hlk-text-tertiary">활동 추적</p>
              <p className="text-sm font-semibold text-hlk-text mt-1">
                {recentLogs.filter(l => l.activities && l.activities.length > 0).length}/{recentLogs.length}일 기록
              </p>
            </div>
          </div>
        )}

        {/* 최근 기록 */}
        {recentLogs.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-hlk-border">
            <h3 className="font-semibold text-hlk-text mb-4">최근 기록</h3>
            <div className="space-y-3">
              {recentLogs.map((log) => {
                const logDate = new Date(log.date);
                const isToday = log.date === today.toISOString().split('T')[0];

                return (
                  <div
                    key={log.id}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      isToday ? 'bg-hlk-primary-light' : 'bg-hlk-bg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <EmojiIcon emoji={MOOD_OPTIONS.find((m) => m.value === log.mood)?.emoji} size={22} />
                      <div>
                        <p className="text-sm font-medium text-hlk-text">
                          {logDate.toLocaleDateString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                            weekday: 'short',
                          })}
                        </p>
                        <p className="text-xs text-hlk-text-tertiary">
                          {log.symptoms.length > 0
                            ? `야간 증상 ${log.symptoms.length}개`
                            : '방해 증상 없음'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {log.symptoms.slice(0, 3).map((s) => (
                        <EmojiIcon key={s.symptomId} emoji={SYMPTOMS.find((sym) => sym.id === s.symptomId)?.emoji} size={14} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {logs.length > 7 && (
              <Link
                href="/insights"
                className="block mt-4 text-center text-sm text-hlk-primary font-medium hover:underline"
              >
                전체 기록 보기 →
              </Link>
            )}
          </div>
        )}

        {/* 빈 상태 */}
        {recentLogs.length === 0 && (
          <div className="bg-white rounded-2xl p-8 border border-hlk-border text-center">
            <div className="w-16 h-16 rounded-full bg-hlk-bg flex items-center justify-center mx-auto mb-4">
              <EmojiIcon emoji="📊" size={28} className="text-hlk-text-tertiary" />
            </div>
            <h3 className="font-semibold text-hlk-text mb-2">
              아직 기록이 없어요
            </h3>
            <p className="text-sm text-hlk-text-secondary">
              첫 수면 기록을 시작해보세요!
              <br />
              7일 연속 기록하면 수면 패턴 리포트를 볼 수 있어요
            </p>
          </div>
        )}

        {/* 하단 네비게이션 힌트 */}
        <div className="mt-8 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-hlk-primary font-medium hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            내 수면 패턴 분석 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LogDashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-hlk-bg flex items-center justify-center">
        <div className="text-hlk-text-tertiary">로딩 중...</div>
      </div>
    }>
      <LogDashboardContent />
    </Suspense>
  );
}
