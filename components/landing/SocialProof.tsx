import Image from 'next/image';

const personas = [
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    name: '직장인 여성',
    age: '40대 후반',
    pain: '수면장애와 감정 기복이 시작됐는데, 이게 갱년기인지 스트레스인지 모르겠어요.',
    need: '내 상태 파악하기',
    bgColor: 'bg-alma-primary-light',
    accentColor: 'text-alma-primary',
  },
  {
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
    name: '자녀 독립 후',
    age: '50대 초반',
    pain: '열감, 불면, 우울감이 심해지는데 남편은 "다 그런 거"라고 해요.',
    need: '솔직한 대화 나누기',
    bgColor: 'bg-alma-accent-light',
    accentColor: 'text-alma-accent',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    name: '1인가구 여성',
    age: '40-50대',
    pain: '혼자 겪는 건 괜찮은데, 새벽에 깼을 때 불안이 밀려와요.',
    need: '같은 동료 찾기',
    bgColor: 'bg-alma-secondary-light',
    accentColor: 'text-alma-secondary',
  },
];

export function SocialProof() {
  return (
    <section className="px-5 py-20 bg-alma-bg">
      <div className="max-w-5xl mx-auto">
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
              className="bg-white rounded-2xl border border-alma-border p-6 hover:shadow-xl hover:border-alma-primary/20 transition-all"
            >
              {/* Header with photo */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-alma-border">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-base font-bold text-alma-text">{p.name}</div>
                  <div className="text-sm text-alma-text-tertiary">{p.age}</div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-[15px] text-alma-text-secondary leading-relaxed mb-5">
                &ldquo;{p.pain}&rdquo;
              </p>

              {/* Need tag */}
              <div className={`inline-flex items-center gap-2 text-sm font-semibold ${p.accentColor} px-4 py-2 ${p.bgColor} rounded-full`}>
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
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-2xl border border-alma-border shadow-sm">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                  alt="Member"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                  alt="Member"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                  alt="Member"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full bg-alma-primary border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">+999</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-alma-text">비슷한 여성들이 기다리고 있어요</p>
              <p className="text-sm text-alma-text-tertiary">체크인 완료 후 맞춤 그룹에 연결됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
