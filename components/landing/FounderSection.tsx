'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function FounderSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className={`px-6 md:px-8 py-24 md:py-32 bg-white ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-hlk-primary-light text-hlk-primary text-sm font-semibold rounded-full mb-4">
            왜 HERLYKKE를 만들었나요?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text mb-4 tracking-tight">
            창업자의 이야기
          </h2>
          <p className="text-lg text-hlk-text-secondary">
            저도 잠 못 자는 언니 중 한 명이었어요
          </p>
        </div>

        {/* Founder card */}
        <div className="bg-gradient-to-br from-hlk-primary-light/50 via-white to-hlk-accent-light/50 rounded-3xl p-8 md:p-12 border border-hlk-border shadow-sm">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar and info */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face"
                  alt="Becca - HERLYKKE Founder"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <p className="text-xl font-bold text-hlk-text">Becca</p>
                <p className="text-sm text-hlk-text-secondary">HERLYKKE 대표</p>
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1">
              <blockquote className="text-base md:text-lg text-hlk-text leading-[1.9] space-y-4">
                <p>
                  &ldquo;40대 중반, 갑자기 잠이 안 왔어요.
                  분명히 피곤한데 누우면 눈이 떠지고, 새벽 3시에 깨서 천장만 바라봤어요.
                  불안했어요. 이유를 모르겠으니 더 무섭더라고요.
                </p>
                <p>
                  그 불안을 안고 <span className="text-hlk-primary font-semibold">덴마크 호이스콜레</span>로 떠났어요.
                  새로운 환경이 도움이 될까 싶어서요.
                  그런데 거기서도 잠은 쉽게 오지 않았어요.
                  대신, 같은 시기를 지나는 여성들을 만났어요.
                  &lsquo;나만 이런 줄 알았다&rsquo;는 말을 거기서 처음 들었어요.
                </p>
                <p>
                  작은 독립 서점의 &lsquo;폐경&rsquo; 북토크, Full Moon 모임 —
                  별것 아닌 공감이었는데{' '}
                  <span className="text-hlk-accent font-semibold">생각보다 훨씬 큰 위로</span>가 됐어요.
                  그날 밤, 오랜만에 잘 잤어요.
                </p>
                <p>
                  한국에 돌아와서도 그 연결감이 필요했어요.
                  먼저 겪은 언니에게 &ldquo;어떻게 했어요?&rdquo; 물어볼 수 있는 곳.
                  그게 없더라고요. 그래서{' '}
                  <span className="inline-block px-4 py-1.5 bg-hlk-accent text-white rounded-lg font-bold">
                    HERLYKKE를 만들었습니다
                  </span>.&rdquo;
                </p>
              </blockquote>

              {/* HERLYKKE의 5가지 가치 — Elektra 5 Core Values 스타일 */}
              <div className="mt-8 pt-6 border-t border-hlk-border">
                <p className="text-sm font-bold text-hlk-text mb-4">HERLYKKE의 가치</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Real Ink만', desc: '직접 써본 것만. 손글씨 1장이 있어야 레시피가 됩니다', bg: 'bg-hlk-primary-light', color: 'bg-hlk-primary' },
                    { title: '100% 익명', desc: '닉네임만 공개. 나이·직업·실명 절대 비공개', bg: 'bg-hlk-primary-light', color: 'bg-hlk-primary' },
                    { title: '당사자가 만든 서비스', desc: '같은 불면을 겪은 창업자가 직접 설계', bg: 'bg-hlk-accent-light', color: 'bg-hlk-accent' },
                    { title: '커뮤니티가 검증', desc: '공감 50개+ 받아야 언니 PICK. 알고리즘 없음', bg: 'bg-hlk-accent-light', color: 'bg-hlk-accent' },
                    { title: '수면 → 뇌건강까지', desc: '지금의 수면이 10년 후 뇌건강을 만듭니다', bg: 'bg-hlk-primary-light', color: 'bg-hlk-primary', span: true },
                  ].map((v, i) => (
                    <div key={v.title} className={`flex items-center gap-3 p-4 ${v.bg} rounded-xl ${v.span ? 'sm:col-span-2' : ''}`}>
                      <div className={`w-7 h-7 rounded-full ${v.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-hlk-text">{v.title}</p>
                        <p className="text-xs text-hlk-text-tertiary">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
