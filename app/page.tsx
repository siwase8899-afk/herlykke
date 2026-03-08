'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { SunsetScroll } from '@/components/ui/SunsetScroll';
import SleepHero from '@/components/landing/SleepHero';
import ContentQuickAccess from '@/components/landing/ContentQuickAccess';
import RecipeShowcase from '@/components/landing/RecipeShowcase';
import FeaturedColumns from '@/components/landing/FeaturedColumns';
import SleepStats from '@/components/landing/SleepStats';
import WhatMakesDifferent from '@/components/landing/WhatMakesDifferent';
import SleepHowItWorks from '@/components/landing/SleepHowItWorks';
import { FounderSection } from '../components/landing/FounderSection';
import { CTAFooter } from '../components/landing/CTAFooter';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading || isLoggedIn) {
    return <div className="min-h-screen bg-hlk-bg" />;
  }

  return (
    <SunsetScroll>
      <main>
        {/* ① Hero: 수면 진입점 */}
        <SleepHero />

        {/* ② 콘텐츠 허브 (탭형 브라우저) */}
        <ContentQuickAccess />

        {/* ③ 수면 레시피 (확장: 6장 + AnniePick 통합) */}
        <RecipeShowcase />

        {/* ④ 전문가 컬럼 직접 노출 */}
        <FeaturedColumns />

        {/* ⑤ 수면-치매 연결 데이터 (축소 스트립) */}
        <SleepStats />

        {/* ⑥ 차별화 — HERLYKKE는 다릅니다 */}
        <WhatMakesDifferent />

        {/* ⑦ 온보딩 타임라인 — 첫 5분이면 충분해요 */}
        <SleepHowItWorks />

        {/* ⑧ 창업자 섹션 */}
        <FounderSection />

        {/* ⑨ 최종 CTA */}
        <CTAFooter />
      </main>
    </SunsetScroll>
  );
}
