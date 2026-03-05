'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    emoji: '🌙',
    title: '수면 상태 체크인',
    desc: '5가지 질문으로 내 수면 유형 파악. 1분이면 충분해요.',
    color: 'bg-hlk-primary-light',
    textColor: 'text-hlk-primary',
  },
  {
    step: '02',
    emoji: '💬',
    title: '갱년기 동기들과 연결',
    desc: '비슷한 경험의 동료들과 익명으로 이야기해요. 나만 이런 게 아니에요.',
    color: 'bg-hlk-surface-warm',
    textColor: 'text-hlk-text',
  },
  {
    step: '03',
    emoji: '✨',
    title: '언니 PICK 레시피 발견',
    desc: '먼저 겪은 언니들이 직접 써본 방법. 커뮤니티가 검증했어요.',
    color: 'bg-hlk-accent-light',
    textColor: 'text-hlk-accent',
  },
];

export default function SleepHowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-hlk-bg">
      <div className="max-w-3xl mx-auto">
        {/* 헤딩 */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text mb-4">
            어떻게 시작하나요?
          </h2>
          <p className="text-hlk-text-secondary text-lg">
            3단계로 수면을 되찾는 여정이 시작됩니다
          </p>
        </div>

        {/* 스텝 카드 */}
        <div className="flex flex-col gap-4 mb-12">
          {STEPS.map((item, i) => (
            <div
              key={item.step}
              className={`flex items-start gap-5 p-6 rounded-2xl border border-hlk-border bg-hlk-surface transition-all duration-700 hover:-translate-y-0.5 hover:shadow-md ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* 스텝 번호 */}
              <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <span className={`text-lg font-bold ${item.textColor}`}>{item.step}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{item.emoji}</span>
                  <h3 className="font-bold text-hlk-text">{item.title}</h3>
                </div>
                <p className="text-hlk-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <Link
            href="/checkin"
            className="inline-flex items-center gap-2 px-10 py-4 bg-hlk-primary text-white text-lg font-semibold rounded-2xl hover:bg-hlk-primary-dark transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-hlk-primary/20 animate-subtle-pulse"
          >
            🌙 지금 내 수면 상태 확인하기
          </Link>
          <p className="text-hlk-text-tertiary text-sm mt-3">
            가입 없이 바로 · 1분 소요 · 닉네임으로 활동
          </p>
        </div>
      </div>
    </section>
  );
}
