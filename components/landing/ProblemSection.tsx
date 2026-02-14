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
      {/* Cream background section */}
      <div className="bg-alma-bg px-5 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mb-16">
            <p className="text-alma-accent font-medium mb-4 tracking-wide">
              Less Fear. More Clarity.
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-alma-text leading-tight mb-6">
              그냥 묻어 두었던 것들,
              <br />
              이제 꺼내도 괜찮아요.
            </h2>
            <p className="text-lg text-alma-text-secondary">
              몸과 마음이 보내는 신호, 혼자 해석하기 어려웠죠.
              <br />
              당신만 그런 게 아니에요.
            </p>
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Body signals */}
            <div className="bg-alma-surface rounded-2xl p-8 border border-alma-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-alma-accent-light flex items-center justify-center">
                  <span className="text-2xl">🌡️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-alma-text">몸이 보내는 신호</h3>
                  <p className="text-sm text-alma-text-tertiary">보이는 변화</p>
                </div>
              </div>
              <div className="space-y-4">
                {struggles.body.map((item) => (
                  <div key={item.symptom} className="flex justify-between items-center py-3 border-b border-alma-border last:border-0">
                    <span className="font-medium text-alma-text">{item.symptom}</span>
                    <span className="text-sm text-alma-text-tertiary">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mind signals */}
            <div className="bg-alma-surface rounded-2xl p-8 border border-alma-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-alma-secondary-light flex items-center justify-center">
                  <span className="text-2xl">💭</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-alma-text">마음이 보내는 신호</h3>
                  <p className="text-sm text-alma-text-tertiary">보이지 않는 변화</p>
                </div>
              </div>
              <div className="space-y-4">
                {struggles.mind.map((item) => (
                  <div key={item.symptom} className="flex justify-between items-center py-3 border-b border-alma-border last:border-0">
                    <span className="font-medium text-alma-text">{item.symptom}</span>
                    <span className="text-sm text-alma-text-tertiary">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark accent section - "ALMA는 달라요" */}
      <div className="bg-alma-secondary text-white px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-white/50 text-sm line-through mb-2">검색하면 건기식 광고뿐</p>
              <p className="text-lg font-semibold text-alma-primary">광고 없이 진짜 정보만</p>
            </div>
            <div>
              <p className="text-white/50 text-sm line-through mb-2">병원은 무섭고, 비싸고, 귀찮아</p>
              <p className="text-lg font-semibold text-alma-primary">집에서 편하게 체크</p>
            </div>
            <div>
              <p className="text-white/50 text-sm line-through mb-2">말할 데가 없어요</p>
              <p className="text-lg font-semibold text-alma-primary">비슷한 친구들과 안전하게</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
