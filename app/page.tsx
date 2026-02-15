'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { HeroSection } from '../components/landing/HeroSection';
import { SymptomGrid } from '../components/landing/SymptomGrid';
import { ProblemSection } from '../components/landing/ProblemSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ConcreteStats } from '../components/landing/ConcreteStats';
import { SocialProof } from '../components/landing/SocialProof';
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

      {/* PHASE 1: UNDERSTAND */}
      <div id="understand" className="scroll-mt-20">
        <SymptomGrid />
        <ProblemSection />
      </div>

      {/* PHASE 2: CONNECT — 숫자+후기(감정 피크) 먼저, 기능 소개는 공감 후 */}
      <div id="connect" className="scroll-mt-20">
        <ConcreteStats />
        <SocialProof />
        <HowItWorks />
      </div>

      {/* PHASE 3: TRANSFORM */}
      <div id="transform" className="scroll-mt-20">
        <FounderSection />
        <FAQSection />
        <CTAFooter />
      </div>
    </main>
  );
}
