'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { HeroSection } from '../components/landing/HeroSection';
import { SymptomGrid } from '../components/landing/SymptomGrid';
import { PersonaCards } from '../components/landing/PersonaCards';
import { ProblemSection } from '../components/landing/ProblemSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { ConcreteStats } from '../components/landing/ConcreteStats';
import { FounderSection } from '../components/landing/FounderSection';
import { FAQSection } from '../components/landing/FAQSection';
import { CTAFooter } from '../components/landing/CTAFooter';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoading, isLoggedIn, router]);

  // 로딩 중이거나 리다이렉트 직전이면 빈 화면 (플래시 방지)
  if (isLoading || isLoggedIn) {
    return <div className="min-h-screen bg-alma-bg" />;
  }

  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* PHASE 1: CONNECT — 공감 + 동일시 ("이건 나를 위한 거구나") */}
      <div id="connect" className="scroll-mt-20">
        <SymptomGrid />
        <PersonaCards />
      </div>

      {/* PHASE 2: UNDERSTAND — 문제 심화 + 솔루션 제시 */}
      <div id="understand" className="scroll-mt-20">
        <ProblemSection />
        <HowItWorks />
      </div>

      {/* PHASE 3: PROVE — 후기(감정) → 숫자(이성)로 검증 */}
      <div id="prove" className="scroll-mt-20">
        <Testimonials />
        <ConcreteStats />
      </div>

      {/* PHASE 4: TRUST — 신뢰 + 전환 */}
      <div id="trust" className="scroll-mt-20">
        <FounderSection />
        <FAQSection />
        <CTAFooter />
      </div>
    </main>
  );
}
