'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MatchRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/community?tab=match');
  }, [router]);

  return (
    <div className="min-h-screen bg-alma-bg flex items-center justify-center">
      <div className="text-alma-text-secondary">이동 중...</div>
    </div>
  );
}
