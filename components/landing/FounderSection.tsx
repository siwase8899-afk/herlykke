'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function FounderSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [chipsVisible, setChipsVisible] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chipsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setChipsVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(chipsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`px-6 md:px-8 py-24 md:py-32 bg-hlk-surface-warm ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <p className="text-xs font-semibold text-hlk-primary tracking-[0.2em] uppercase mb-4">
          Our Story
        </p>
        <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text leading-tight mb-14">
          창업자의 이야기
        </h2>

        {/* Founder card — modern split layout */}
        <div className="card-glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
            {/* Left — full-bleed founder photo */}
            <div className="relative bg-hlk-primary-light min-h-[340px] lg:min-h-[420px]">
              <Image
                src="/founder.png"
                alt="Becca, HERLYKKE 창업자"
                fill
                sizes="(max-width: 1024px) 100vw, 280px"
                className="object-cover object-[center_28%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-6 pb-5 pt-12">
                <p className="text-lg font-bold text-white">Becca</p>
                <p className="text-sm text-white/85">HERLYKKE Founder</p>
              </div>
            </div>

            {/* Right — quote */}
            <div className="p-8 md:p-10 lg:p-12">
              <blockquote className="text-base md:text-lg text-hlk-text leading-[1.85] space-y-4">
                <p>
                  &ldquo;혼자 지내던 어느 시기, 저는
                  회사의 바쁜 리듬 속에서 번아웃이 찾아왔어요.
                  노화와 신체 변화가 겹치면서 막연한 불안이 엄습했고,
                  매일 밤 불면은 아닌데 한 번도 개운한 적이 없었어요.
                </p>
                <p>
                  계속해서 무언가에 흔들리고,
                  사람들과의 관계 속에서도 안정을 찾기 힘들었어요.
                  그러다 정말 충동적으로 — 이전부터 동경하던 휘게의 삶을 찾아
                  <span className="text-hlk-primary font-semibold"> 덴마크 호이스콜레</span>로 떠났습니다.
                </p>
                <p>
                  거기서 같은 시기를 지나는 사람들을 만났어요.
                  &lsquo;나만 이런 줄 알았다&rsquo;는 말을 처음 들었어요.
                  작은 독립 서점의 북토크, Full Moon 모임 —
                  별것 아닌 공감이었는데{' '}
                  <span className="text-hlk-accent font-semibold">생각보다 훨씬 큰 위로</span>가 됐어요.
                </p>
                <p>
                  한국에 돌아와서도 그 연결감이 필요했어요.
                  먼저 겪은 메이트에게 물어볼 수 있는 곳.
                  그래서 HERLYKKE를 만들었습니다.&rdquo;
                </p>
              </blockquote>

              {/* Values — minimal chips */}
              <div ref={chipsRef} className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-hlk-border">
                {['손글씨 인증만', '경험으로 연결', '당사자가 설계', '커뮤니티가 검증'].map((v, i) => (
                  <span
                    key={v}
                    className={`px-4 py-2 bg-hlk-bg text-sm text-hlk-text-secondary rounded-full border border-hlk-border ${
                      chipsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
