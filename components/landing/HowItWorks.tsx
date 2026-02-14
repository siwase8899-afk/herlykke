import Link from 'next/link';

// SVG Icons
const CareIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const EducationIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// Elektra 인사이트: 4-Pillar Framework (Care + Education + Support + Community)
const pillars = [
  {
    id: 'care',
    pillar: 'CARE',
    title: '나를 돌보기',
    headline: '매일 3분, 몸과 마음 체크인',
    desc: '증상, 수면, 기분을 기록하면 AI가 나의 패턴을 학습해요. 기록할수록 더 정확한 인사이트를 받을 수 있어요.',
    features: ['일일 증상 기록', '수면/활동 추적', 'AI 패턴 분석'],
    Icon: CareIcon,
    color: 'bg-alma-primary',
    lightColor: 'bg-alma-primary-light',
    href: '/log',
  },
  {
    id: 'education',
    pillar: 'EDUCATION',
    title: '나를 이해하기',
    headline: 'AI가 분석한 나만의 인사이트',
    desc: '단순한 기록이 아니에요. 축적된 데이터로 나만의 증상 패턴과 트리거를 발견해요.',
    features: ['주간 리포트', '증상 트리거 분석', '맞춤 조언'],
    Icon: EducationIcon,
    color: 'bg-alma-accent',
    lightColor: 'bg-alma-accent-light',
    href: '/insights',
  },
  {
    id: 'support',
    pillar: 'SUPPORT',
    title: '맞춤 솔루션',
    headline: '증상별 큐레이션된 솔루션',
    desc: '명상, 운동, 영양제, 상담까지. 나의 증상과 라이프스타일에 맞는 솔루션을 추천받아요.',
    features: ['6개 카테고리', '매치 점수', '리뷰 기반 추천'],
    Icon: SupportIcon,
    color: 'bg-alma-secondary',
    lightColor: 'bg-alma-secondary-light',
    href: '/solutions',
  },
  {
    id: 'community',
    pillar: 'COMMUNITY',
    title: '함께하기',
    headline: '비슷한 여성들과 연결',
    desc: '같은 증상, 같은 고민을 나누는 친구를 찾아요. 익명으로 안전하게, 공감과 위로를 나눠요.',
    features: ['증상 기반 매칭', '익명 커뮤니티', '1:1 대화'],
    Icon: CommunityIcon,
    color: 'bg-gradient-to-r from-alma-primary to-alma-accent',
    lightColor: 'bg-gradient-to-r from-alma-primary-light to-alma-accent-light',
    href: '/match',
  },
];

const solutions = [
  { label: '명상/요가', desc: '마음 챙김' },
  { label: '운동 프로그램', desc: '신체 활력' },
  { label: '영양제/건기식', desc: '맞춤 보충' },
  { label: '전문 상담', desc: '심리 케어' },
  { label: '라이프스타일', desc: '슬립테크 등' },
  { label: '갱년기 코칭', desc: '1:1 동반자' },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-alma-accent-light text-alma-accent-dark text-sm font-semibold rounded-full mb-4">
            Elektra 4-Pillar Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text mb-4">
            ALMA의 <span className="text-alma-primary">4가지 약속</span>
          </h2>
          <p className="text-lg text-alma-text-secondary max-w-2xl mx-auto">
            Care · Education · Support · Community
            <br />
            갱년기 여정의 모든 순간을 함께해요.
          </p>
        </div>

        {/* Flo 인사이트: 데이터 플라이휠 설명 */}
        <div className="bg-alma-secondary rounded-2xl p-6 mb-12 text-center">
          <p className="text-white/70 text-sm mb-2">Flo 데이터 루프</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">
              기록할수록
            </span>
            <svg className="w-5 h-5 text-alma-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">
              AI 정확도 ↑
            </span>
            <svg className="w-5 h-5 text-alma-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">
              맞춤 솔루션
            </span>
            <svg className="w-5 h-5 text-alma-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="px-4 py-2 bg-alma-accent rounded-full text-white text-sm font-bold">
              더 나은 일상
            </span>
          </div>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="group relative bg-alma-bg rounded-3xl p-8 border border-alma-border hover:shadow-xl hover:border-alma-primary/30 transition-all overflow-hidden"
            >
              {/* Pillar badge */}
              <div className={`inline-block px-3 py-1 ${pillar.color} rounded-full text-white text-xs font-bold tracking-wider mb-4`}>
                {pillar.pillar}
              </div>

              {/* Content */}
              <div className="flex gap-5">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${pillar.lightColor} flex items-center justify-center flex-shrink-0 text-alma-text group-hover:scale-110 transition-transform`}>
                  <pillar.Icon />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-alma-text-tertiary mb-1">{pillar.title}</p>
                  <h3 className="text-xl font-bold text-alma-text mb-2 group-hover:text-alma-primary transition-colors">
                    {pillar.headline}
                  </h3>
                  <p className="text-sm text-alma-text-secondary leading-relaxed mb-4">
                    {pillar.desc}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {pillar.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-white rounded-full text-xs text-alma-text-secondary border border-alma-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-alma-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-alma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Solutions Preview */}
        <div className="bg-gradient-to-br from-alma-primary-light via-white to-alma-accent-light rounded-3xl p-8 md:p-10 border border-alma-border">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-alma-text mb-2">
              SUPPORT: 6가지 솔루션 카테고리
            </h3>
            <p className="text-sm text-alma-text-secondary">
              체크인 결과를 기반으로 초개인화된 웰니스 솔루션을 추천해요
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {solutions.map((sol) => (
              <Link
                key={sol.label}
                href="/solutions"
                className="px-5 py-3 bg-white rounded-full border border-alma-border hover:border-alma-primary hover:shadow-md transition-all cursor-pointer group"
              >
                <p className="text-sm font-medium text-alma-text group-hover:text-alma-primary">{sol.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/log"
            className="inline-flex items-center justify-center px-8 py-4 bg-alma-primary text-white text-base font-bold rounded-full hover:bg-alma-primary-dark active:scale-[0.98] transition-all shadow-lg shadow-alma-primary/30"
          >
            무료로 시작하기 — 첫 체크인
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-alma-text-tertiary">
            3분이면 충분해요 · 로그인 없이 바로 시작
          </p>
        </div>
      </div>
    </section>
  );
}
