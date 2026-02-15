'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="px-6 md:px-8 py-24 md:py-32 bg-alma-bg">
      <div className="max-w-6xl mx-auto">
        {/* Testimonial section */}
        <div className="bg-white rounded-3xl border border-alma-border p-8 md:p-12">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-alma-accent-light text-alma-accent text-xs font-semibold tracking-wide uppercase rounded-full mb-4">
              Real Stories
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-alma-text mb-2">
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

        {/* Community CTA */}
        <div className="mt-12 text-center">
          <p className="text-alma-text-secondary mb-4">
            이 분들처럼 나도 이야기 나누고 싶다면
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/log/new"
              className="px-8 py-3 bg-alma-accent text-white font-semibold rounded-full hover:bg-alma-accent/90 transition-colors"
            >
              오늘 나의 상황 기록하기
            </Link>
            <Link
              href="/community"
              className="px-8 py-3 bg-white text-alma-text font-semibold rounded-full border border-alma-border hover:border-alma-primary/30 hover:text-alma-primary transition-colors"
            >
              함께하기 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
