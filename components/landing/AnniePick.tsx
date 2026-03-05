'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function AnniePick() {
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
    <section ref={ref} className="py-20 px-6 bg-hlk-surface-warm">
      <div className="max-w-3xl mx-auto">
        {/* 헤딩 */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-hlk-primary-light text-hlk-primary text-sm font-medium px-4 py-2 rounded-full mb-4">
            <span>✨</span>
            <span>언니 PICK</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text mb-4">
            커뮤니티가 검증한 레시피만
            <br />
            언니 PICK이 됩니다
          </h2>
          <p className="text-hlk-text-secondary text-lg leading-relaxed">
            플랫폼이 고르는 게 아니에요.
            <br className="hidden md:block" />
            갱년기 동기들의 공감이 50개 이상이면 자동으로 선정됩니다.
          </p>
        </div>

        {/* 신뢰 레이어 3단계 */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {[
            {
              emoji: '✍️',
              title: 'Real Ink',
              desc: '손글씨 1장이 있어야 레시피가 됩니다. AI 콘텐츠 차단.',
              badge: '콘텐츠 인증',
            },
            {
              emoji: '❤️',
              title: '커뮤니티 검증',
              desc: '공감 50개 이상 = 언니 PICK 자동 선정. 플랫폼 편집 없음.',
              badge: '공감 검증',
            },
            {
              emoji: '🤝',
              title: '언니의 서약',
              desc: '판매자는 "직접 경험한 것만 추천합니다"를 닉네임으로 서명.',
              badge: '판매자 신뢰',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="bg-hlk-surface rounded-2xl p-6 text-center border border-hlk-border"
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <div className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-3 py-1 rounded-full inline-block mb-3">
                {item.badge}
              </div>
              <h3 className="font-bold text-hlk-text mb-2">{item.title}</h3>
              <p className="text-hlk-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 인용 카드 */}
        <div
          className={`bg-hlk-primary rounded-2xl p-8 text-white text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-2xl font-light leading-relaxed mb-6">
            &ldquo;ChatGPT도 수면 레시피 써줍니다.
            <br />
            우리 플랫폼은 <strong className="font-bold">Real Ink</strong>만 받습니다.&rdquo;
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 bg-white text-hlk-primary px-8 py-3 rounded-full font-semibold hover:bg-hlk-primary-light transition-colors duration-200"
          >
            커뮤니티 둘러보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
