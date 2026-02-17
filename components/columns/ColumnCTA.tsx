'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

export function ColumnCTA({ symptomName }: { symptomName: string }) {
  const { isLoggedIn } = useAuth();

  return (
    <div className="py-10">
      <div className={`rounded-2xl p-8 text-center ${isLoggedIn ? 'bg-hlk-accent-light' : 'bg-hlk-primary-light'}`}>
        <p className="text-sm text-hlk-primary font-semibold mb-2">
          이 글이 도움이 되셨나요?
        </p>
        <h3 className="text-xl font-bold text-hlk-text mb-3">
          {isLoggedIn
            ? `오늘의 ${symptomName}, 기록으로 남겨보세요`
            : `나의 ${symptomName}, 어떤 단계인지 확인해보세요`}
        </h3>
        <p className="text-sm text-hlk-text-secondary mb-5">
          {isLoggedIn
            ? '매일 기록하면 나만의 변화 패턴이 보여요'
            : '3분 체크인으로 나만의 관리 가이드를 받아보세요'}
        </p>
        <Link
          href={isLoggedIn ? '/log/new' : '/checkin'}
          className="inline-block px-8 py-3 bg-hlk-accent text-white font-semibold rounded-full hover:bg-hlk-accent/90 transition-colors"
        >
          {isLoggedIn ? '오늘 기록하기' : '나의 상태 확인하기'}
        </Link>
      </div>
    </div>
  );
}
