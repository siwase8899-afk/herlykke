'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import SleepHero from '@/components/landing/SleepHero';
import SleepStats from '@/components/landing/SleepStats';
import RecipeShowcase from '@/components/landing/RecipeShowcase';
import AnniePick from '@/components/landing/AnniePick';
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
    <main>
      {/* ① Hero: 수면 진입점 */}
      <SleepHero />

      {/* ② 수면-치매 연결 데이터 */}
      <SleepStats />

      {/* ③ 수면 레시피 미리보기 (Real Ink) */}
      <RecipeShowcase />

      {/* ④ 언니 PICK + 신뢰 3레이어 */}
      <AnniePick />

      {/* ⑤ 3스텝 플로우 */}
      <SleepHowItWorks />

      {/* ⑥ 창업자 섹션 (기존 재사용) */}
      <FounderSection />

      {/* ⑦ 최종 CTA (기존 재사용) */}
      <CTAFooter />
    </main>
  );
}
