'use client';

import Image from 'next/image';
import Link from 'next/link';
import { symptomSlugMap } from '@/lib/columnsData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// 신체적 고충 + 정서적 고충
// Sol 인사이트: 한국 여성 증상 빈도순 재정렬 (관절통 > 수면 > 홍조)
// 전문가 한마디: 각 증상별 전문가 코멘트 (호버 시 표시)
const struggles = {
  body: [
    { symptom: '관절통/근육통', desc: '아침에 몸이 뻣뻣해요', expertTip: '에스트로겐 감소가 관절 윤활에 영향을 줘요' },
    { symptom: '수면 장애', desc: '새벽 3시에 눈이 번쩍', expertTip: '60% 이상의 갱년기 여성이 경험해요' },
    { symptom: '안면 홍조', desc: '갑자기 확 달아오르는 얼굴', expertTip: '체온 조절 중추의 일시적 오작동이에요' },
    { symptom: '만성 피로', desc: '쉬어도 충전이 안 돼요', expertTip: '의지 부족이 아닌 호르몬 변화예요' },
    { symptom: '건조함', desc: '피부도 점막도 마를 때', expertTip: '콜라겐·히알루론산 합성이 줄어들어요' },
  ],
  mind: [
    { symptom: '브레인 포그', desc: '단어가 떠오르지 않아요', expertTip: '치매가 아니에요, 1-2년 후 회복돼요' },
    { symptom: '감정 기복', desc: '이유 없이 눈물이 나요', expertTip: '세로토닌 불안정이 원인이에요' },
    { symptom: '불안감', desc: '괜히 마음이 불안해요', expertTip: 'GABA 브레이크가 약해진 거예요' },
    { symptom: '정체성 질문', desc: '나는 누구인가...?', expertTip: '위기가 아닌 "중년의 각성"이에요' },
  ],
};

export function ProblemSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section>
      {/* Main section with photo */}
      <div ref={sectionRef} className="bg-alma-bg px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Photo */}
            <div className={`relative hidden lg:block ${sectionVisible ? 'scroll-visible-x' : 'scroll-hidden-left'}`}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop&crop=face"
                  alt="Thoughtful Asian woman"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-alma-secondary/30 to-transparent" />
              </div>
              {/* Quote card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                <p className="text-alma-text font-medium leading-relaxed">
                  &ldquo;나만 이런 줄 알았는데, 다들 비슷하더라고요&rdquo;
                </p>
                <p className="text-sm text-alma-text-tertiary mt-2">— 52세, 직장인</p>
              </div>
            </div>

            {/* Right: Content */}
            <div className={`${sectionVisible ? 'scroll-visible-x' : 'scroll-hidden-right'}`}>
              {/* Section header — August 인사이트: "축하할 일" 프레이밍 */}
              <p className="text-alma-accent font-semibold mb-4 tracking-wide uppercase text-sm">
                두 번째 삶의 시작
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-alma-text leading-tight mb-6">
                그냥 묻어 두었던 것들,
                <br />
                <span className="text-alma-primary">이제 꺼내도 괜찮아요.</span>
              </h2>
              <p className="text-lg text-alma-text-secondary mb-10">
                갱년기는 끝이 아니라 <span className="text-alma-accent font-semibold">새로운 시작</span>이에요.
                <br />
                몸과 마음이 보내는 신호, 이제 함께 읽어봐요.
              </p>

              {/* Two columns of symptoms */}
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Body signals */}
                <div className="bg-white rounded-2xl p-6 border border-alma-border shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-alma-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-alma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-alma-text">몸의 신호</h3>
                  </div>
                  <div className="space-y-1">
                    {struggles.body.map((item) => (
                      <Link
                        key={item.symptom}
                        href={`/columns?category=${symptomSlugMap[item.symptom]}`}
                        className="group/item block rounded-xl px-3 py-2.5 -mx-1 hover:bg-alma-primary/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-alma-primary shrink-0" />
                          <span className="text-sm font-medium text-alma-text group-hover/item:text-alma-primary transition-colors">{item.symptom}</span>
                          <svg className="w-3.5 h-3.5 text-alma-primary/40 group-hover/item:text-alma-primary group-hover/item:translate-x-0.5 transition-all ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        {/* 전문가 한마디 — 호버 시 슬라이드 표시 */}
                        <p className="text-xs text-alma-text-tertiary pl-[18px] mt-0 max-h-0 opacity-0 group-hover/item:max-h-8 group-hover/item:opacity-100 group-hover/item:mt-1 transition-all duration-300 overflow-hidden">
                          {item.expertTip}
                        </p>
                      </Link>
                    ))}
                  </div>
                  {/* CTA 링크 */}
                  <Link
                    href="/columns?category=body"
                    className="group/cta flex items-center justify-center gap-1.5 mt-5 pt-4 border-t border-alma-border-light text-sm font-semibold text-alma-primary hover:text-alma-primary-dark transition-colors"
                  >
                    전문가가 알려주는 몸의 변화
                    <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Mind signals */}
                <div className="bg-white rounded-2xl p-6 border border-alma-border shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-alma-accent/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-alma-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-alma-text">마음의 신호</h3>
                  </div>
                  <div className="space-y-1">
                    {struggles.mind.map((item) => (
                      <Link
                        key={item.symptom}
                        href={`/columns?category=${symptomSlugMap[item.symptom]}`}
                        className="group/item block rounded-xl px-3 py-2.5 -mx-1 hover:bg-alma-accent/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-alma-accent shrink-0" />
                          <span className="text-sm font-medium text-alma-text group-hover/item:text-alma-accent transition-colors">{item.symptom}</span>
                          <svg className="w-3.5 h-3.5 text-alma-accent/40 group-hover/item:text-alma-accent group-hover/item:translate-x-0.5 transition-all ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        {/* 전문가 한마디 — 호버 시 슬라이드 표시 */}
                        <p className="text-xs text-alma-text-tertiary pl-[18px] mt-0 max-h-0 opacity-0 group-hover/item:max-h-8 group-hover/item:opacity-100 group-hover/item:mt-1 transition-all duration-300 overflow-hidden">
                          {item.expertTip}
                        </p>
                      </Link>
                    ))}
                  </div>
                  {/* CTA 링크 */}
                  <Link
                    href="/columns?category=mind"
                    className="group/cta flex items-center justify-center gap-1.5 mt-5 pt-4 border-t border-alma-border-light text-sm font-semibold text-alma-accent hover:text-alma-accent-dark transition-colors"
                  >
                    전문가가 알려주는 마음의 변화
                    <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark accent section — Midi "We See You" + 한국 시장 구조적 공백 */}
      <div className="bg-alma-secondary text-white px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Midi 인사이트: 공감 언어 */}
          <div className="text-center mb-12">
            <p className="text-white/60 text-sm mb-6 uppercase tracking-wider">
              We See You. We Hear You.
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              당신의 이야기를 <span className="text-alma-accent">듣고 있어요</span>.
            </h3>
            <p className="text-white/70 max-w-xl mx-auto">
              한국 850만 갱년기 여성에게는 신뢰할 수 있는 정보,
              같은 경험을 공유할 동료, 맞는 솔루션을 찾을 수 있는
              <span className="text-alma-primary font-semibold"> 하나의 안전한 공간</span>이 없었어요.
            </p>
          </div>

          {/* Before → After 전환 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center mb-12">
            <div className="p-6">
              <p className="text-white/50 text-sm line-through mb-3">검색하면 건기식 광고뿐</p>
              <p className="text-xl font-bold text-alma-accent">증상 인증 리뷰만</p>
              <p className="text-xs text-white/40 mt-2">화해가 성분을 분석하듯, HERLYKKE는 증상을 분석해요</p>
            </div>
            <div className="p-6 border-y md:border-y-0 md:border-x border-white/10">
              <p className="text-white/50 text-sm line-through mb-3">병원 3분 진료, "다 그래요"</p>
              <p className="text-xl font-bold text-alma-primary">AI가 나의 패턴을 분석</p>
              <p className="text-xs text-white/40 mt-2">기록할수록 더 정확해지는 맞춤 분석</p>
            </div>
            <div className="p-6 lg:border-r border-white/10">
              <p className="text-white/50 text-sm line-through mb-3">말할 데가 없어요</p>
              <p className="text-xl font-bold text-alma-primary">같은 증상의 친구와 익명으로</p>
              <p className="text-xs text-white/40 mt-2">블라인드처럼 안전한 익명 커뮤니티</p>
            </div>
            <Link href="/solutions" className="group p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <p className="text-white/50 text-sm line-through mb-3">뭘 해야 할지 모르겠어요</p>
              <p className="text-xl font-bold text-alma-accent">나에게 맞는 솔루션 추천</p>
              <p className="text-xs text-white/40 mt-2">코칭, 명상, 운동, 영양 맞춤 큐레이션</p>
              <span className="inline-flex items-center gap-1 text-xs text-alma-accent/70 mt-3 group-hover:text-alma-accent transition-colors">
                솔루션 둘러보기
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Positive reframe */}
          <div className="text-center">
            <p className="text-white/80">
              갱년기는 <span className="text-alma-accent font-bold">두 번째 사춘기</span>예요.
              <br className="md:hidden" />
              <span className="hidden md:inline"> — </span>
              성장통이 있지만, 그만큼 <span className="text-alma-primary font-bold">새로운 나</span>를 만나게 돼요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
