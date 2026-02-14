'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckinStore } from '../../stores/checkinStore';
import { classifyStage, classifySymptomCluster, classifyLifeContext } from '../../lib/stageClassifier';
import { StageCard } from '../../components/result/StageCard';
import { SymptomSummary } from '../../components/result/SymptomSummary';
import { TipsList } from '../../components/result/TipsList';
import { GroupRecommendation } from '../../components/result/GroupRecommendation';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

export default function ResultPage() {
  const router = useRouter();
  const store = useCheckinStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-tertiary">결과를 분석하고 있어요...</div>
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

  return (
    <div className="min-h-screen bg-alma-bg">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✨</div>
          <h1 className="text-2xl font-bold text-alma-text mb-2">
            체크인 완료!
          </h1>
          <p className="text-sm text-alma-text-secondary">
            당신의 갱년기 상태를 분석했어요
          </p>
        </div>

        {/* 결과 카드들 */}
        <div className="space-y-4 mb-8">
          <StageCard
            stage={stageResult.stage}
            confidence={stageResult.confidence}
            description={stageResult.description}
          />
          <SymptomSummary
            physicalSymptoms={store.physicalSymptoms}
            emotionalSymptoms={store.emotionalSymptoms}
            cluster={cluster}
          />
          <TipsList tips={stageResult.tips} />
          <GroupRecommendation cluster={cluster} />
        </div>

        {/* 면책 조항 */}
        <p className="text-xs text-alma-text-tertiary text-center mb-6 px-4">
          이 결과는 의학적 진단이 아닌 참고용입니다.<br />
          정확한 진단은 전문의 상담을 권장드려요.
        </p>

        {/* CTA - 매일 기록으로 연결 */}
        <div className="bg-gradient-to-br from-alma-primary-light to-alma-accent-light rounded-2xl p-6 mb-6 border border-alma-border">
          <h3 className="font-bold text-alma-text mb-2">매일 기록하면 패턴이 보여요</h3>
          <p className="text-sm text-alma-text-secondary mb-4">
            JoyHer처럼 매일 컨디션을 기록하고, 나에게 맞는 케어 방법을 찾아보세요.
          </p>
          <Link href="/login" className="block">
            <Button variant="primary" size="lg">
              무료로 시작하기
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          <Link href="/community" className="block">
            <Button variant="secondary" size="md" className="w-full">
              커뮤니티 먼저 보기
            </Button>
          </Link>
          <Link href="/" className="block text-center">
            <Button variant="ghost" size="md" className="w-full">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
