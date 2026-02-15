'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const personas = [
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    name: '직장인 워킹맘',
    age: '40대 후반',
    pain: '수면장애와 감정 기복이 시작됐는데, 이게 갱년기인지 스트레스인지 모르겠어요.',
    need: '내 상태 파악하기',
    needHref: '/checkin',
    bgColor: 'bg-alma-primary-light',
    accentColor: 'text-alma-primary',
  },
  {
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
    name: '자녀 독립 후',
    age: '50대 초반',
    pain: '열감, 불면, 우울감이 심해지는데 남편은 "다 그런 거"라고 해요.',
    need: '솔직한 대화 나누기',
    needHref: '/community',
    bgColor: 'bg-alma-accent-light',
    accentColor: 'text-alma-accent',
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    name: '1인가구 싱글',
    age: '40-50대',
    pain: '혼자 겪는 건 괜찮은데, 새벽에 깼을 때 불안이 밀려와요.',
    need: '같은 동료 찾기',
    needHref: '/checkin',
    bgColor: 'bg-alma-secondary-light',
    accentColor: 'text-alma-secondary',
  },
];

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    name: '미영',
    age: 52,
    location: '서울',
    before: '남편한테도 말 못하고 혼자 끙끙 앓았어요',
    quote: '"나도 그래"라는 말 한마디가 이렇게 위로가 될 줄 몰랐어요. 혼자가 아니라는 게 가장 큰 힘이에요.',
    after: '같은 증상의 친구 3명이 생겼어요',
    symptom: '열감, 감정기복',
    weeks: 4,
  },
  {
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
    name: '정은',
    age: 47,
    location: '부산',
    before: '새벽마다 깨서 멍하니 천장만 봤어요',
    quote: '수면 기록을 꾸준히 하다 보니 패턴이 보이더라고요. AI가 추천해준 마그네슘 먹기 시작한 뒤로 확실히 나아졌어요.',
    after: '이제 6시간은 푹 자요',
    symptom: '수면장애',
    weeks: 6,
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    name: '선희',
    age: 49,
    location: '대전',
    before: '갱년기라고 인정하기 싫었어요. 남들한테 말하기 창피했고요',
    quote: '여기 오니까 다들 비슷하더라고요. 이제는 당당하게 말해요.',
    after: '이제 당당하게 "나 갱년기야!" 말해요',
    symptom: '브레인포그, 피로감',
    weeks: 8,
  },
  {
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face',
    name: '현정',
    age: 51,
    location: '인천',
    before: '회의 중 갑자기 열이 오르면 너무 창피했어요',
    quote: '여기서 배운 호흡법이 진짜 효과가 있어요. 이제 응급 대처가 가능해졌어요.',
    after: '호흡법으로 30초 만에 진정시켜요',
    symptom: '열감',
    weeks: 3,
  },
];

export function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="px-6 md:px-8 py-24 md:py-32 bg-alma-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-alma-secondary-light text-alma-secondary text-sm font-semibold rounded-full mb-4">
            <span className="flex -space-x-1">
              <span className="w-2 h-2 bg-alma-primary rounded-full" />
              <span className="w-2 h-2 bg-alma-accent rounded-full" />
              <span className="w-2 h-2 bg-alma-primary rounded-full" />
            </span>
            이런 분들을 위해 만들었어요
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text mb-4">
            혹시 나의 이야기인가요?
          </h2>
          <p className="text-lg text-alma-text-secondary">
            1,200명 이상의 여성들이 <span className="text-alma-accent font-semibold">두 번째 삶</span>을 함께 준비하고 있어요
          </p>
        </div>

        {/* Persona cards - 3개 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {personas.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-2xl border border-alma-border p-8 hover:shadow-xl hover:border-alma-primary/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-alma-border">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-alma-text">{p.name}</div>
                  <div className="text-xs text-alma-text-tertiary">{p.age}</div>
                </div>
              </div>

              <p className="text-sm text-alma-text-secondary leading-relaxed mb-5">
                &ldquo;{p.pain}&rdquo;
              </p>

              <Link
                href={p.needHref}
                className={`inline-flex items-center gap-2 text-xs font-semibold ${p.accentColor} px-3 py-1.5 ${p.bgColor} rounded-full hover:opacity-80 transition-opacity`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {p.need}
              </Link>
            </div>
          ))}
        </div>

        {/* Testimonial section */}
        <div className="bg-white rounded-3xl border border-alma-border p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-alma-text mb-2">
              실제 사용자 후기
            </h3>
            <p className="text-sm text-alma-text-secondary">
              ALMA와 함께한 여성들의 진짜 이야기
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Before / After */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-alma-bg rounded-2xl p-6 border border-alma-border relative">
                <span className="absolute -top-3 left-4 px-3 py-1 bg-alma-text-tertiary text-white text-xs font-bold rounded-full">
                  BEFORE
                </span>
                <p className="text-sm text-alma-text-secondary mt-2 leading-relaxed">
                  {testimonials[activeTestimonial].before}
                </p>
              </div>
              <div className="bg-alma-accent-light rounded-2xl p-6 border border-alma-accent/20 relative">
                <span className="absolute -top-3 left-4 px-3 py-1 bg-alma-accent text-white text-xs font-bold rounded-full">
                  AFTER
                </span>
                <p className="text-sm text-alma-accent-dark font-medium mt-2 leading-relaxed">
                  {testimonials[activeTestimonial].after}
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="relative">
              <div className="absolute -top-4 -left-2 text-6xl text-alma-primary/20 font-serif">
                &ldquo;
              </div>
              <div className="pl-8">
                <p className="text-lg md:text-xl text-alma-text leading-relaxed mb-8">
                  {testimonials[activeTestimonial].quote}
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-alma-primary">
                    <Image
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-alma-text">
                      {testimonials[activeTestimonial].name}님
                      <span className="font-normal text-alma-text-tertiary">
                        {' '}· {testimonials[activeTestimonial].age}세 · {testimonials[activeTestimonial].location}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-alma-primary-light text-alma-primary rounded-full">
                        {testimonials[activeTestimonial].symptom}
                      </span>
                      <span className="text-xs text-alma-text-tertiary">
                        {testimonials[activeTestimonial].weeks}주 사용
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial navigation */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTestimonial(i)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                    activeTestimonial === i
                      ? 'border-alma-primary scale-110 shadow-lg'
                      : 'border-alma-border opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Community CTA — 후기의 감정적 모멘텀을 커뮤니티 참여로 연결 */}
        <div className="mt-12 text-center">
          <p className="text-alma-text-secondary mb-4">
            이 분들처럼 나도 이야기 나누고 싶다면
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checkin"
              className="px-8 py-3 bg-alma-accent text-white font-semibold rounded-full hover:bg-alma-accent/90 transition-colors"
            >
              나의 상태 확인하기
            </Link>
            <Link
              href="/community"
              className="px-8 py-3 bg-white text-alma-text font-semibold rounded-full border border-alma-border hover:border-alma-primary/30 hover:text-alma-primary transition-colors"
            >
              커뮤니티 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
