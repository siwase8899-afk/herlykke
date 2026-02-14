import Image from 'next/image';

// 신체적 고충 + 정서적 고충
const struggles = {
  body: [
    { symptom: '안면 홍조', desc: '갑자기 확 달아오르는 얼굴' },
    { symptom: '수면 장애', desc: '새벽 3시에 눈이 번쩍' },
    { symptom: '체중 변화', desc: '먹는 양은 그대로인데...' },
    { symptom: '만성 피로', desc: '쉬어도 충전이 안 돼요' },
  ],
  mind: [
    { symptom: '브레인 포그', desc: '단어가 떠오르지 않아요' },
    { symptom: '감정 기복', desc: '이유 없이 눈물이 나요' },
    { symptom: '불안감', desc: '괜히 마음이 불안해요' },
    { symptom: '정체성 질문', desc: '나는 누구인가...?' },
  ],
};

export function ProblemSection() {
  return (
    <section>
      {/* Main section with photo */}
      <div className="bg-alma-bg px-5 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Photo */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&h=750&fit=crop"
                  alt="Thoughtful woman"
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
            <div>
              {/* Section header */}
              <p className="text-alma-accent font-semibold mb-4 tracking-wide uppercase text-sm">
                Less Fear. More Clarity.
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-alma-text leading-tight mb-6">
                그냥 묻어 두었던 것들,
                <br />
                <span className="text-alma-primary">이제 꺼내도 괜찮아요.</span>
              </h2>
              <p className="text-lg text-alma-text-secondary mb-10">
                몸과 마음이 보내는 신호, 혼자 해석하기 어려웠죠.
                <br />
                당신만 그런 게 아니에요.
              </p>

              {/* Two columns of symptoms */}
              <div className="grid sm:grid-cols-2 gap-6">
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
                  <div className="space-y-3">
                    {struggles.body.map((item) => (
                      <div key={item.symptom} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-alma-primary" />
                        <span className="text-sm text-alma-text">{item.symptom}</span>
                      </div>
                    ))}
                  </div>
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
                  <div className="space-y-3">
                    {struggles.mind.map((item) => (
                      <div key={item.symptom} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-alma-accent" />
                        <span className="text-sm text-alma-text">{item.symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark accent section */}
      <div className="bg-alma-secondary text-white px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-white/50 text-sm line-through mb-3">검색하면 건기식 광고뿐</p>
              <p className="text-xl font-bold text-alma-primary">광고 없이 진짜 정보만</p>
            </div>
            <div className="p-6 border-y md:border-y-0 md:border-x border-white/10">
              <p className="text-white/50 text-sm line-through mb-3">병원은 무섭고, 비싸고, 귀찮아</p>
              <p className="text-xl font-bold text-alma-primary">집에서 편하게 체크</p>
            </div>
            <div className="p-6">
              <p className="text-white/50 text-sm line-through mb-3">말할 데가 없어요</p>
              <p className="text-xl font-bold text-alma-primary">비슷한 친구들과 안전하게</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
