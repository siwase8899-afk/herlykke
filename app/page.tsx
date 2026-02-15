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

      {/* PHASE 1: UNDERSTAND — 공감 + 문제 인식 */}
      <div id="understand" className="scroll-mt-20">
        <SymptomGrid />
        <ProblemSection />
      </div>

      {/* PHASE 2: SOLVE — 문제 직후 솔루션 제시, 후기(감정)→숫자(이성) 순 */}
      <div id="solve" className="scroll-mt-20">
        <HowItWorks />
        <SocialProof />
        <ConcreteStats />
      </div>

      {/* PHASE 3: TRUST — 신뢰 + 전환 */}
      <div id="trust" className="scroll-mt-20">
        <FounderSection />
        <FAQSection />
        <CTAFooter />
      </div>
    </main>
  );
}
