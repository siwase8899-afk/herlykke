'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import SleepHero from '@/components/landing/SleepHero';
import SleepStats from '@/components/landing/SleepStats';
import WhatMakesDifferent from '@/components/landing/WhatMakesDifferent';
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
    return <div className="min-h-screen" />;
  }

  return (
    <main className="bg-hlk-bg">
      <SleepHero />
      <SleepStats />
      <WhatMakesDifferent />
      <FounderSection />
      <CTAFooter />
    </main>
  );
}
