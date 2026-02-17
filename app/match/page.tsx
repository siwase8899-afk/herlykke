'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MatchRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/community');
  }, [router]);

  return (
    <div className="min-h-screen bg-hlk-bg flex items-center justify-center">
      <div className="text-hlk-text-secondary">이동 중...</div>
    </div>
  );
}
