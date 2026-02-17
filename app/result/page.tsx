'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { useCheckinStore } from '../../stores/checkinStore';
import { classifyStage, classifySymptomCluster, classifyLifeContext, calculateKuppermanIndex } from '../../lib/stageClassifier';
import { syncCheckinToServer } from '@/lib/supabaseSync';
import { analytics } from '@/lib/analytics';
import { StageCard } from '../../components/result/StageCard';
import { KuppermanCard } from '../../components/result/KuppermanCard';
import { SymptomSummary } from '../../components/result/SymptomSummary';
import { TipsList } from '../../components/result/TipsList';
import { GroupRecommendation } from '../../components/result/GroupRecommendation';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

export default function ResultPage() {
  const router = useRouter();
  const store = useCheckinStore();
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const syncedRef = useRef(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || authLoading) {
    return (
      <div className="min-h-screen bg-hlk-bg flex items-center justify-center">
        <div className="text-hlk-text-tertiary">결과를 분석하고 있어요...</div>
      </div>
    );
  }

  // 체크인 완료 안 했으면 리다이렉트
  if (!store.ageRange) {
    router.push('/checkin');
    return null;
  }

  // 분류 실행
  const stageResult = classifyStage({
    ageRange: store.ageRange,
    physicalSymptoms: store.physicalSymptoms,
    emotionalSymptoms: store.emotionalSymptoms,
    symptomSeverity: store.symptomSeverity,
    symptomOnset: store.symptomOnset,
  });

  const cluster = classifySymptomCluster(store.physicalSymptoms, store.emotionalSymptoms);
  const lifeContext = classifyLifeContext(store.employment, store.maritalStatus, store.livingSituation);

  // 쿠퍼만 갱년기 지수 계산
  const kuppermanResult = calculateKuppermanIndex(
    store.physicalSymptoms,
    store.emotionalSymptoms,
    store.symptomSeverityMap,
  );

  // 체크인 완료 트래킹 + Supabase 동기화 (1회만)
  useEffect(() => {
    if (syncedRef.current || !stageResult.stage) return;
    syncedRef.current = true;

    analytics.checkinCompleted(stageResult.stage, kuppermanResult.score);

    if (user && user.id !== 'demo-user') {
      syncCheckinToServer(user.id, {
        ageRange: store.ageRange,
        maritalStatus: store.maritalStatus,
        livingSituation: store.livingSituation,
        employment: store.employment,
        physicalSymptoms: store.physicalSymptoms,
        worstPhysicalSymptom: store.worstPhysicalSymptom,
        symptomSeverity: store.symptomSeverity,
        symptomOnset: store.symptomOnset,
        emotionalSymptoms: store.emotionalSymptoms,
        worstEmotionalSymptom: store.worstEmotionalSymptom,
        sharedWith: store.sharedWith,
        currentManagement: store.currentManagement,
        managementSatisfaction: store.managementSatisfaction,
        mostWantedInfo: store.mostWantedInfo,
        desiredHelp: store.desiredHelp,
        willingnessToPay: store.willingnessToPay,
        communityOptIn: store.communityOptIn,
        preferredGroup: store.preferredGroup,
        nickname: store.nickname,
        computedStage: stageResult.stage,
        computedSymptomCluster: cluster,
        computedLifeContext: lifeContext,
      });
    }
  }, [stageResult.stage, kuppermanResult.score, user, store, cluster, lifeContext]);

  return (
    <div className="min-h-screen bg-hlk-bg">
      <div className="max-w-lg mx-auto px-6 md:px-8 py-10">
        {/* Superhuman 인사이트: "Wellness Zero" 셀레브레이션 모멘트 */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="text-6xl mb-3 animate-bounce">🎉</div>
            <div className="absolute inset-0 bg-hlk-accent/20 rounded-full blur-2xl -z-10" />
          </div>
          <h1 className="text-2xl font-bold text-hlk-text mb-2">
            첫 번째 체크인 완료!
          </h1>
          <p className="text-sm text-hlk-text-secondary mb-4">
            두 번째 삶의 여정이 시작됐어요
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-hlk-accent-light rounded-full">
            <span className="text-xl">🔥</span>
            <span className="text-sm font-semibold text-hlk-accent">1일 스트릭 시작!</span>
          </div>
        </div>

        {/* 다음 목표 */}
        <div className="bg-white rounded-2xl p-4 border border-hlk-border shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-hlk-primary-light flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-hlk-text">다음 목표: 7일 연속 체크인</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 bg-hlk-bg rounded-full overflow-hidden">
                  <div className="w-[14%] h-full bg-hlk-accent rounded-full" />
                </div>
                <span className="text-xs text-hlk-text-tertiary">1/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* 결과 카드들 */}
        <div className="space-y-6 mb-10">
          <StageCard
            stage={stageResult.stage}
            confidence={stageResult.confidence}
            description={stageResult.description}
          />
          <KuppermanCard result={kuppermanResult} />
          <SymptomSummary
            physicalSymptoms={store.physicalSymptoms}
            emotionalSymptoms={store.emotionalSymptoms}
            cluster={cluster}
          />
          <TipsList tips={stageResult.tips} />
          <GroupRecommendation cluster={cluster} />
        </div>

        {/* 추천 솔루션 미리보기 */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-hlk-text mb-3 flex items-center gap-2">
            <span>💊</span> 나에게 맞는 솔루션
          </h2>
          <p className="text-sm text-hlk-text-secondary mb-4">
            체크인 결과를 기반으로 추천하는 솔루션이에요
          </p>
          <div className="space-y-3">
            {(() => {
              const hasMoodIssues = store.emotionalSymptoms?.includes('mood_swings') || store.emotionalSymptoms?.includes('anxiety');
              const hasPhysical = store.physicalSymptoms?.includes('hot_flash') || store.physicalSymptoms?.includes('fatigue');

              const solutions = [
                hasPhysical
                  ? { title: '이 시기를 위한 명상 프로그램', desc: '열감과 불안을 다스리는 10분 호흡 명상', icon: '🧘‍♀️', price: '무료' }
                  : { title: '아침 10분 스트레칭', desc: '활기찬 하루를 시작하는 루틴', icon: '🏃‍♀️', price: '무료' },
                hasMoodIssues
                  ? { title: '이 시기 전문 심리상담', desc: '감정 기복을 전문으로 다루는 1:1 상담', icon: '💬', price: '회당 80,000원' }
                  : { title: '이 시기를 위한 종합 영양제', desc: '이소플라본, 비타민D, 칼슘 맞춤 영양제', icon: '💊', price: '월 35,000원' },
              ];

              return solutions.map((sol, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-hlk-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-hlk-primary-light flex items-center justify-center flex-shrink-0 text-xl">
                    {sol.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-hlk-text">{sol.title}</p>
                    <p className="text-xs text-hlk-text-tertiary truncate">{sol.desc}</p>
                  </div>
                  <span className="text-sm font-semibold text-hlk-primary flex-shrink-0">{sol.price}</span>
                </div>
              ));
            })()}
            {!isLoggedIn && (
              <p className="text-xs text-hlk-text-tertiary text-center">
                가입 후 맞춤 솔루션을 자세히 확인할 수 있어요
              </p>
            )}
          </div>
        </div>

        {/* 커뮤니티 인기글 미리보기 */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-hlk-text mb-3 flex items-center gap-2">
            <span>💬</span> 비슷한 분들의 이야기
          </h2>
          <div className="space-y-3">
            {[
              { content: '오늘 아침에 또 열감이 왔는데, 깊게 호흡하니까 조금 나아졌어요.', likes: 24, comments: 8, name: '따뜻한 햇살42' },
              { content: '남편한테 갱년기 증상 얘기했더니... 여기 오니까 위로가 되네요.', likes: 89, comments: 31, name: '밝은 구름77' },
            ].map((post, i) => (
              <Link key={i} href="/community" className="block bg-white rounded-xl p-4 border border-hlk-border hover:shadow-sm transition-all">
                <p className="text-sm text-hlk-text leading-relaxed line-clamp-2 mb-2">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-hlk-text-tertiary">{post.name}</span>
                  <div className="flex items-center gap-3 text-xs text-hlk-text-tertiary">
                    <span>💜 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 면책 조항 */}
        <p className="text-xs text-hlk-text-tertiary text-center mb-6 px-4">
          이 결과는 의학적 진단이 아닌 참고용입니다.<br />
          정확한 진단은 전문의 상담을 권장드려요.
        </p>

        {/* CTA — 로그인 여부에 따라 분기 */}
        {isLoggedIn ? (
          /* 로그인 상태: 대시보드로 이동 */
          <div className="space-y-3">
            <Link href="/dashboard" className="block">
              <Button variant="primary" size="lg" className="w-full bg-hlk-accent hover:bg-hlk-accent/90 text-white shadow-lg shadow-hlk-accent/30">
                대시보드로 이동
              </Button>
            </Link>
            <Link href="/log/new" className="block">
              <Button variant="secondary" size="md" className="w-full">
                지금 첫 기록 시작하기
              </Button>
            </Link>
          </div>
        ) : (
          /* 비로그인 상태: 결과 저장 → 가입 유도 */
          <>
            {/* 가입 동기 강화 */}
            <div className="bg-gradient-to-br from-hlk-primary to-hlk-accent rounded-2xl p-6 mb-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">이 결과를 저장하고 싶으신가요?</h3>
              <p className="text-white/80 text-sm mb-4">
                가입하면 이런 것들을 이용할 수 있어요
              </p>
              <div className="space-y-2 mb-5 text-left">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <span>✓</span><span>체크인 결과 저장 & 추적</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <span>✓</span><span>AI 맞춤 패턴 분석</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <span>✓</span><span>커뮤니티에서 글쓰기 & 친구 찾기</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <span>✓</span><span>증상별 맞춤 솔루션 추천</span>
                </div>
              </div>
              <Link href="/signup" className="block">
                <Button variant="secondary" size="lg" className="w-full border-white bg-white text-hlk-primary hover:bg-white/90 font-black">
                  내 결과 저장하기
                </Button>
              </Link>
            </div>

            {/* 보조 CTA */}
            <div className="space-y-3">
              <Link href="/log/new" className="block">
                <Button variant="secondary" size="md" className="w-full">
                  먼저 기록해보기
                </Button>
              </Link>
              <Link href="/community" className="block">
                <Button variant="ghost" size="md" className="w-full">
                  커뮤니티 보기
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
