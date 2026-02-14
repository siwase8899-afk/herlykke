'use client';

import Link from 'next/link';
import { Button } from '../../components/ui/Button';

const infoItems = [
  { emoji: '⏱️', text: '약 3분 소요' },
  { emoji: '🔒', text: '모든 응답은 안전하게 보호됩니다' },
  { emoji: '📊', text: '결과는 즉시 확인 가능' },
  { emoji: '👤', text: '로그인 없이 바로 시작' },
];

export default function CheckinIntro() {
  return (
    <div className="flex flex-col items-center text-center pt-12">
      <div className="text-5xl mb-6">🌸</div>
      <h1 className="text-2xl font-bold text-alma-text mb-3">
        3분 갱년기 체크인
      </h1>
      <p className="text-alma-text-secondary leading-relaxed mb-8">
        19개 질문에 답하면<br />
        나의 갱년기 단계와 맞춤 관리법을<br />
        바로 확인할 수 있어요.
      </p>

      <div className="w-full space-y-3 mb-10 text-left">
        {infoItems.map((item) => (
          <div key={item.text} className="flex items-center gap-3 px-4 py-3 bg-alma-surface rounded-xl border border-alma-border">
            <span className="text-xl">{item.emoji}</span>
            <span className="text-sm text-alma-text">{item.text}</span>
          </div>
        ))}
      </div>

      <Link href="/checkin/1" className="w-full">
        <Button variant="primary" size="lg">
          시작하기
        </Button>
      </Link>

      <Link href="/" className="mt-4 text-sm text-alma-text-tertiary hover:text-alma-text-secondary">
        ← 홈으로 돌아가기
      </Link>
    </div>
  );
}
