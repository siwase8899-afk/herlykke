const personas = [
  {
    emoji: '💼',
    name: '직장인 여성',
    age: '40대 후반',
    pain: '수면장애와 감정 기복이 시작됐는데, 이게 갱년기인지 스트레스인지 모르겠어요.',
    need: '내 상태 파악 + 같은 상황의 동료',
    bgColor: 'bg-alma-primary-light/30',
    borderColor: 'border-alma-primary/20',
  },
  {
    emoji: '🏠',
    name: '자녀 독립 후',
    age: '50대 초반',
    pain: '열감, 불면, 우울감이 심해지는데 남편은 "다 그런 거"라고 해요.',
    need: '익명 공간에서 솔직한 대화',
    bgColor: 'bg-alma-accent-light/30',
    borderColor: 'border-alma-accent/20',
  },
  {
    emoji: '🌱',
    name: '1인가구 여성',
    age: '40-50대',
    pain: '혼자 겪는 건 괜찮은데, 새벽에 깼을 때 불안이 밀려와요.',
    need: '같은 단계 동료와 연결',
    bgColor: 'bg-alma-secondary-light/30',
    borderColor: 'border-alma-secondary/20',
  },
];

export function SocialProof() {
  return (
    <section className="px-5 py-20 bg-alma-bg">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-alma-secondary-light text-alma-secondary text-sm font-semibold rounded-full mb-4">
            이런 분들을 위해 만들었어요
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text">
            혹시 나의 이야기인가요?
          </h2>
        </div>

        {/* Persona cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((p) => (
            <div
              key={p.name}
              className={`${p.bgColor} rounded-2xl border ${p.borderColor} p-6 hover:shadow-lg transition-all`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{p.emoji}</span>
                <div>
                  <div className="text-base font-bold text-alma-text">{p.name}</div>
                  <div className="text-sm text-alma-text-tertiary">{p.age}</div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-[15px] text-alma-text-secondary leading-relaxed mb-4 min-h-[4.5rem]">
                &ldquo;{p.pain}&rdquo;
              </p>

              {/* Need tag */}
              <div className="inline-flex items-center gap-1.5 text-sm text-alma-primary font-medium px-3 py-1.5 bg-alma-surface rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {p.need}
              </div>
            </div>
          ))}
        </div>

        {/* Social proof stat */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-alma-surface rounded-2xl border border-alma-border">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-alma-primary-light flex items-center justify-center text-sm">👩</div>
              <div className="w-10 h-10 rounded-full bg-alma-accent-light flex items-center justify-center text-sm">👩‍🦰</div>
              <div className="w-10 h-10 rounded-full bg-alma-secondary-light flex items-center justify-center text-sm">👩‍🦳</div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-alma-text">비슷한 여성들이 기다리고 있어요</p>
              <p className="text-xs text-alma-text-tertiary">체크인 완료 후 맞춤 그룹에 연결됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
