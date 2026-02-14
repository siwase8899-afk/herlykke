'use client';

import { useState } from 'react';
import Image from 'next/image';

// Midi 인사이트: 다양한 페르소나 + 실제 후기
const personas = [
  {
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face',
    name: '직장인 워킹맘',
    age: '40대 후반',
    pain: '수면장애와 감정 기복이 시작됐는데, 이게 갱년기인지 스트레스인지 모르겠어요.',
    need: '내 상태 파악하기',
    bgColor: 'bg-alma-primary-light',
    accentColor: 'text-alma-primary',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    name: '자녀 독립 후',
    age: '50대 초반',
    pain: '열감, 불면, 우울감이 심해지는데 남편은 "다 그런 거"라고 해요.',
    need: '솔직한 대화 나누기',
    bgColor: 'bg-alma-accent-light',
    accentColor: 'text-alma-accent',
  },
  {
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    name: '1인가구 싱글',
    age: '40-50대',
    pain: '혼자 겪는 건 괜찮은데, 새벽에 깼을 때 불안이 밀려와요.',
    need: '같은 동료 찾기',
    bgColor: 'bg-alma-secondary-light',
    accentColor: 'text-alma-secondary',
  },
  {
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
    name: '재취업 준비 중',
    age: '50대 중반',
    pain: '관절이 아파서 면접도 걱정인데, 이게 갱년기 때문인 줄 몰랐어요.',
    need: '맞춤 솔루션 찾기',
    bgColor: 'bg-alma-primary-light',
    accentColor: 'text-alma-primary',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    name: '프리랜서',
    age: '40대 초반',
    pain: '브레인포그가 심해서 업무에 지장이 있어요. 클라이언트한테 말하기도 민망하고...',
    need: '증상 관리하기',
    bgColor: 'bg-alma-accent-light',
    accentColor: 'text-alma-accent',
  },
  {
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face',
    name: '자영업자',
    age: '50대 초반',
    pain: '손님 앞에서 갑자기 열이 확 오르면 너무 당황스러워요.',
    need: '응급 대처법 배우기',
    bgColor: 'bg-alma-secondary-light',
    accentColor: 'text-alma-secondary',
  },
];

// Midi 스타일: 실제 이름 + 사진 + 상세 후기
const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face',
    name: '미영',
    age: 52,
    location: '서울',
    quote: '남편한테도 말 못했던 얘기를 여기서 처음 했어요. "나도 그래"라는 말 한마디가 이렇게 위로가 될 줄 몰랐어요. 혼자가 아니라는 게 가장 큰 힘이에요.',
    symptom: '열감, 감정기복',
    weeks: 4,
    improvement: '공감 친구 3명 만남',
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    name: '정은',
    age: 47,
    location: '부산',
    quote: '수면 기록을 꾸준히 하다 보니 패턴이 보이더라고요. AI가 추천해준 마그네슘 먹기 시작한 뒤로 확실히 나아졌어요.',
    symptom: '수면장애',
    weeks: 6,
    improvement: '수면시간 2시간 증가',
  },
  {
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
    name: '선희',
    age: 49,
    location: '대전',
    quote: '처음엔 갱년기라고 인정하기 싫었어요. 근데 여기 오니까 다들 비슷하더라고요. 이제는 당당하게 말해요. "나 갱년기야!"',
    symptom: '브레인포그, 피로감',
    weeks: 8,
    improvement: '증상 수용 + 적극적 관리',
  },
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    name: '현정',
    age: 51,
    location: '인천',
    quote: '직장에서 갑자기 열이 확 오르면 너무 창피했는데, 여기서 배운 호흡법이 진짜 효과가 있어요. 응급 대처가 가능해졌어요.',
    symptom: '열감',
    weeks: 3,
    improvement: '열감 대처법 습득',
  },
];

export function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="px-5 py-20 bg-alma-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-alma-secondary-light text-alma-secondary text-sm font-semibold rounded-full mb-4">
            이런 분들을 위해 만들었어요
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text mb-4">
            혹시 나의 이야기인가요?
          </h2>
          <p className="text-lg text-alma-text-secondary">
            1,200명 이상의 여성들이 ALMA와 함께하고 있어요
          </p>
        </div>

        {/* Persona cards - 6개 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {personas.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-2xl border border-alma-border p-5 hover:shadow-xl hover:border-alma-primary/20 transition-all"
            >
              {/* Header with photo */}
              <div className="flex items-center gap-3 mb-4">
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

              {/* Quote */}
              <p className="text-sm text-alma-text-secondary leading-relaxed mb-4">
                &ldquo;{p.pain}&rdquo;
              </p>

              {/* Need tag */}
              <div className={`inline-flex items-center gap-2 text-xs font-semibold ${p.accentColor} px-3 py-1.5 ${p.bgColor} rounded-full`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {p.need}
              </div>
            </div>
          ))}
        </div>

        {/* Midi 스타일 실제 후기 섹션 */}
        <div className="bg-white rounded-3xl border border-alma-border p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-alma-text mb-2">
              실제 사용자 후기
            </h3>
            <p className="text-sm text-alma-text-secondary">
              ALMA와 함께한 여성들의 진짜 이야기
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Quote mark */}
              <div className="absolute -top-4 -left-2 text-6xl text-alma-primary/20 font-serif">
                &ldquo;
              </div>

              {/* Content */}
              <div className="pl-8">
                <p className="text-lg md:text-xl text-alma-text leading-relaxed mb-6">
                  {testimonials[activeTestimonial].quote}
                </p>

                {/* Author */}
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

                {/* Result badge */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-alma-accent-light rounded-full">
                  <svg className="w-4 h-4 text-alma-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-alma-accent-dark">
                    {testimonials[activeTestimonial].improvement}
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial navigation */}
            <div className="flex justify-center gap-3 mt-10">
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

        {/* Social proof stat */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-2xl border border-alma-border shadow-sm">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <div key={t.name} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-alma-primary border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">+1.2K</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-alma-text">같은 증상을 겪는 여성들과 연결되세요</p>
              <p className="text-sm text-alma-text-tertiary">체크인 완료 후 맞춤 그룹에 연결됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
