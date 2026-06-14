'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 디자인 씽킹 v3 벤치마킹 페르소나 기반 (Elektra+Sol+Peanut 매칭)
// Progressive Disclosure: 접힌 상태(고민) → 펼친 상태(여정 Before→HERLYKKE→After)
const personas = [
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    name: '지은',
    role: 'IT기업 마케팅 팀장',
    age: '44세, 워킹맘',
    pain: '회의 중 갑자기 얼굴이 빨개지고, 생리가 불규칙해졌는데 이게 몸의 변화인지 모르겠어요.',
    need: '내 상태 파악하기',
    needHref: '/checkin',
    bgColor: 'bg-hlk-primary-light',
    accentColor: 'text-hlk-primary',
    borderColor: 'border-hlk-primary',
    benchmark: '몸의 전환기 초기',
    journey: {
      before: '회의 중 갑자기 열이 오르고, 생리 주기가 들쭉날쭉. 검색하면 건기식 광고뿐, 병원에서는 "다 그래요".',
      herlykke: [
        '3분 체크인으로 몸의 전환기 초기 확인',
        '매일 증상 기록 시작 — 열감·스트레스 연결 패턴 발견',
      ],
      after: '회의 전 호흡법으로 대처 가능. 내 몸의 신호를 읽을 수 있게 됐어요.',
      duration: '4주',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
    name: '수진',
    role: '프리랜서 번역가',
    age: '51세, 1인가구',
    pain: '우울, 불안, 불면이 심한데 혼자 겪으니 너무 외로워요. 내 감정이 몸과 마음의 변화 때문인지 알고 싶어요.',
    need: '같은 동료 찾기',
    needHref: '/community',
    bgColor: 'bg-hlk-accent-light',
    accentColor: 'text-hlk-accent',
    borderColor: 'border-hlk-accent',
    benchmark: '몸의 전환기',
    journey: {
      before: '혼자 사니까 말할 곳이 없었어요. 우울한 건지 몸의 변화인지 구분도 안 되고, 새벽마다 깨서 천장만 봤어요.',
      herlykke: [
        '커뮤니티에서 같은 증상의 동료 발견',
        '감정 기록 → AI 분석으로 "이 시기의 우울"과 연관성 확인',
      ],
      after: '같은 증상 친구 3명이 생겼어요. 새벽에 깨도 커뮤니티에 글 쓰면 아침에 답글이 와 있어요.',
      duration: '6주',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    name: '미영',
    role: '최근 퇴직',
    age: '57세, 자녀 독립',
    pain: '증상은 좀 나아졌는데 관절통이 남아있고, 퇴직 후 정체성 혼란이 와요.',
    need: '맞춤 솔루션 찾기',
    needHref: '/solutions',
    bgColor: 'bg-hlk-secondary-light',
    accentColor: 'text-hlk-secondary',
    borderColor: 'border-hlk-secondary',
    benchmark: '전환 이후기',
    journey: {
      before: '열감은 줄었는데 관절이 아파서 계단이 무서워요. 퇴직 후 "나는 뭐 하는 사람이지?" 혼란이 왔어요.',
      herlykke: [
        '솔루션에서 관절 관리 프로그램 시작',
        '커뮤니티에서 후배들에게 경험 공유하며 멘토 역할',
      ],
      after: '맞춤 운동 루틴으로 관절통 관리 중. 커뮤니티 멘토 활동이 새로운 보람이 됐어요.',
      duration: '8주',
    },
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
    before: '몸이 달라졌다고 인정하기 싫었어요. 남들한테 말하기 창피했고요',
    quote: '여기 오니까 다들 비슷하더라고요. 이제는 당당하게 말해요.',
    after: '이제 당당하게 "나 요즘 몸이 달라지고 있어!" 말해요',
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
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  return (
    <section className="px-6 md:px-8 py-24 md:py-32 bg-hlk-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-hlk-secondary-light text-hlk-secondary text-sm font-semibold rounded-full mb-4">
            <span className="flex -space-x-1">
              <span className="w-2 h-2 bg-hlk-primary rounded-full" />
              <span className="w-2 h-2 bg-hlk-accent rounded-full" />
              <span className="w-2 h-2 bg-hlk-primary rounded-full" />
            </span>
            이런 분들을 위해 만들었어요
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text mb-4 tracking-tight">
            혹시 나의 이야기인가요?
          </h2>
          <p className="text-lg text-hlk-text-secondary">
            1,200명 이상의 사람들이 <span className="text-hlk-accent font-semibold">두 번째 삶</span>을 함께 준비하고 있어요
          </p>
        </div>

        {/* Persona cards - Progressive Disclosure */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {personas.map((p) => {
            const isExpanded = expandedPersona === p.name;

            return (
              <div
                key={p.name}
                className={`bg-white rounded-2xl border p-8 cursor-pointer ${
                  isExpanded
                    ? `${p.borderColor} shadow-xl`
                    : 'border-hlk-border hover:shadow-xl hover:border-hlk-primary/20'
                }`}
                onClick={() => setExpandedPersona(isExpanded ? null : p.name)}
                style={{ transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)' }}
              >
                {/* 프로필 헤더 — 항상 표시 */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${
                    isExpanded ? p.borderColor : 'border-hlk-border'
                  }`}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-hlk-text">{p.name} · {p.age}</div>
                    <div className="text-xs text-hlk-text-tertiary">{p.role}</div>
                  </div>
                  <span className={`ml-auto text-[10px] px-2 py-1 ${p.bgColor} ${p.accentColor} rounded-full font-medium`}>
                    {p.benchmark}
                  </span>
                </div>

                {/* 고민 — 항상 표시 */}
                <p className="text-sm text-hlk-text-secondary leading-relaxed mb-4">
                  &ldquo;{p.pain}&rdquo;
                </p>

                {/* 펼침 힌트 / 접기 표시 */}
                {!isExpanded && (
                  <div className="flex items-center justify-between">
                    <Link
                      href={p.needHref}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-2 text-xs font-semibold ${p.accentColor} px-3 py-1.5 ${p.bgColor} rounded-full hover:opacity-80 transition-opacity`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      {p.need}
                    </Link>
                    <span className="text-[11px] text-hlk-text-tertiary">
                      여정 보기
                      <svg className="w-3 h-3 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                )}

                {/* 여정 — 펼쳤을 때만 */}
                <div className={`overflow-hidden ${
                  isExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`} style={{ transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)' }}>
                  <div className="pt-4 border-t border-hlk-border space-y-5">
                    {/* BEFORE */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-hlk-text-tertiary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-hlk-text-tertiary">B</span>
                        </div>
                        <div className="w-px flex-1 bg-hlk-border mt-1" />
                      </div>
                      <div className="pb-2">
                        <p className="text-[11px] font-semibold text-hlk-text-tertiary uppercase tracking-wider mb-1">Before</p>
                        <p className="text-sm text-hlk-text-secondary leading-relaxed">{p.journey.before}</p>
                      </div>
                    </div>

                    {/* HERLYKKE */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full ${p.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-[10px] font-bold ${p.accentColor}`}>H</span>
                        </div>
                        <div className="w-px flex-1 bg-hlk-border mt-1" />
                      </div>
                      <div className="pb-2">
                        <p className={`text-[11px] font-semibold ${p.accentColor} uppercase tracking-wider mb-1`}>HERLYKKE 시작</p>
                        <ul className="space-y-1.5">
                          {p.journey.herlykke.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-hlk-text leading-relaxed">
                              <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.accentColor}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* AFTER */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-hlk-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-hlk-accent">!</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[11px] font-semibold text-hlk-accent uppercase tracking-wider">After {p.journey.duration}</p>
                        </div>
                        <p className="text-sm font-medium text-hlk-text leading-relaxed">{p.journey.after}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={p.needHref}
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center justify-center gap-2 w-full py-3 ${p.bgColor} ${p.accentColor} font-semibold text-sm rounded-xl hover:opacity-80 transition-opacity`}
                    >
                      {p.need}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>

                    {/* 접기 */}
                    <p className="text-center text-[11px] text-hlk-text-tertiary">
                      탭해서 접기
                      <svg className="w-3 h-3 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial section */}
        <div className="card-glass rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-hlk-text mb-2">
              실제 사용자 후기
            </h3>
            <p className="text-sm text-hlk-text-secondary">
              HERLYKKE와 함께한 사람들의 진짜 이야기
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Before / After */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-hlk-bg rounded-2xl p-6 border border-hlk-border relative">
                <span className="absolute -top-3 left-4 px-3 py-1 bg-hlk-text-tertiary text-white text-xs font-bold rounded-full">
                  BEFORE
                </span>
                <p className="text-sm text-hlk-text-secondary mt-2 leading-relaxed">
                  {testimonials[activeTestimonial].before}
                </p>
              </div>
              <div className="bg-hlk-accent-light rounded-2xl p-6 border border-hlk-accent/20 relative">
                <span className="absolute -top-3 left-4 px-3 py-1 bg-hlk-accent text-white text-xs font-bold rounded-full">
                  AFTER
                </span>
                <p className="text-sm text-hlk-accent-dark font-medium mt-2 leading-relaxed">
                  {testimonials[activeTestimonial].after}
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="relative">
              <div className="absolute -top-4 -left-2 text-6xl text-hlk-primary/20 font-serif">
                &ldquo;
              </div>
              <div className="pl-8">
                <p className="text-lg md:text-xl text-hlk-text leading-relaxed mb-8">
                  {testimonials[activeTestimonial].quote}
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-hlk-primary">
                    <Image
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-hlk-text">
                      {testimonials[activeTestimonial].name}님
                      <span className="font-normal text-hlk-text-tertiary">
                        {' '}· {testimonials[activeTestimonial].age}세 · {testimonials[activeTestimonial].location}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-hlk-primary-light text-hlk-primary rounded-full">
                        {testimonials[activeTestimonial].symptom}
                      </span>
                      <span className="text-xs text-hlk-text-tertiary">
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
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${
                    activeTestimonial === i
                      ? 'border-hlk-primary scale-110 shadow-lg'
                      : 'border-hlk-border opacity-60 hover:opacity-100'
                  }`}
                  style={{ transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}
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
          <p className="text-hlk-text-secondary mb-4">
            이 분들처럼 나도 이야기 나누고 싶다면
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/log/new"
              className="btn-fill-hover btn-fill-hover--accent px-8 py-3 bg-hlk-accent text-white font-semibold rounded-full hover:-translate-y-0.5"
            >
              오늘 나의 상황 기록하기
            </Link>
            <Link
              href="/community"
              className="btn-fill-hover btn-fill-hover--secondary px-8 py-3 bg-white text-hlk-text font-semibold rounded-full border border-hlk-border hover:border-hlk-primary/30 hover:text-hlk-primary hover:-translate-y-0.5"
            >
              커뮤니티 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
