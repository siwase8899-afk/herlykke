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
          <span className="inline-block px-4 py-1.5 bg-alma-primary-light text-alma-primary text-sm font-semibold rounded-full mb-4">
            왜 HERLYKKE를 만들었나요?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text mb-4">
            창업자의 이야기
          </h2>
          <p className="text-lg text-alma-text-secondary">
            같은 시기를 지나는 한 사람으로서, 함께할 누군가를 만들고 싶었어요
          </p>
        </div>

        {/* Founder card */}
        <div className="bg-gradient-to-br from-alma-primary-light/50 via-white to-alma-accent-light/50 rounded-3xl p-8 md:p-12 border border-alma-border shadow-sm">
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
                <p className="text-xl font-bold text-alma-text">Becca</p>
                <p className="text-sm text-alma-text-secondary">HERLYKKE 대표</p>
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1">
              <blockquote className="text-base md:text-lg text-alma-text leading-[1.9] space-y-4">
                <p>
                  &ldquo;40대에 접어들면서 몸이 보내는 신호가 달라지기 시작했어요.
                  갑자기 열감이 올라오고, 이유 없이 눈물이 나고.
                  그런데 주변을 둘러보니, 이 시기를 겪는 여성의 삶은 놀라울 만큼 다양했어요.
                  비혼, 결혼, 이혼, 사별. 자녀가 독립한 사람, 아이를 낳지 않기로 한 사람. 커리어를 이어가는 사람, 경력이 단절된 사람.
                </p>
                <p>
                  작년, <span className="text-alma-primary font-semibold">덴마크 호이스콜레</span>에서
                  작은 독립 서점의 &lsquo;폐경&rsquo; 북토크 공고를 봤을 때 신선한 충격을 받았어요.
                  그곳에서 만난 Full Moon 모임 — 별것 아닌 공감과 격려가 생각보다 큰 위로가 되더라고요.
                </p>
                <p>
                  여성 호르몬의 변화로 나타나는 증상을 대부분의 여성이 겪지만,
                  받아들이는 방법은 모두 달랐어요. 그런데{' '}
                  <span className="text-alma-accent font-semibold">한 가지 공통점</span>이 있었어요.
                  누군가와 이야기하고 싶다는 마음.
                  나를 이해해주는 사람이 <span className="text-alma-primary font-semibold">단 한 명</span>만 있어도 좋겠다는 마음.
                </p>
                <p>
                  그 한 명이 되고 싶어서, 그리고 그 한 명을 서로 연결해주고 싶어서{' '}
                  <span className="inline-block px-4 py-1.5 bg-alma-accent text-white rounded-lg font-bold">
                    HERLYKKE를 만들었습니다
                  </span>.&rdquo;
                </p>
              </blockquote>

              {/* HERLYKKE의 5가지 가치 — Elektra 5 Core Values 스타일 */}
              <div className="mt-8 pt-6 border-t border-alma-border">
                <p className="text-sm font-bold text-alma-text mb-4">HERLYKKE의 가치</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: '진짜 정보만', desc: '광고가 아닌 증상 인증 리뷰와 전문가 콘텐츠', bg: 'bg-alma-primary-light', color: 'bg-alma-primary' },
                    { title: '완전한 익명', desc: '닉네임만 공개. 실명/나이 절대 비공개', bg: 'bg-alma-primary-light', color: 'bg-alma-primary' },
                    { title: '당사자가 만든 서비스', desc: '이 시기를 직접 겪는 창업자가 설계', bg: 'bg-alma-accent-light', color: 'bg-alma-accent' },
                    { title: '혼자가 아닌 함께', desc: '같은 증상의 동료와 안전하게 연결', bg: 'bg-alma-accent-light', color: 'bg-alma-accent' },
                    { title: '데이터 기반 맞춤', desc: '기록할수록 정확해지는 AI 분석', bg: 'bg-alma-primary-light', color: 'bg-alma-primary', span: true },
                  ].map((v, i) => (
                    <div key={v.title} className={`flex items-center gap-3 p-4 ${v.bg} rounded-xl ${v.span ? 'sm:col-span-2' : ''}`}>
                      <div className={`w-7 h-7 rounded-full ${v.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-alma-text">{v.title}</p>
                        <p className="text-xs text-alma-text-tertiary">{v.desc}</p>
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
