// Evernow 인사이트: 구체적 성과 수치 + Flo 데이터 루프 가치 + Peanut 커뮤니티 활성도
export function ConcreteStats() {
  const stats = [
    {
      number: '850만',
      label: '한국 갱년기 여성',
      detail: '45-60세 여성 인구',
      color: 'text-alma-primary',
    },
    {
      number: '87%',
      label: '증상 인지 부족',
      detail: '"이게 갱년기인지 몰랐어요"',
      color: 'text-alma-accent',
    },
    {
      number: '78%',
      label: '일상관리 향상',
      detail: '4주 기록 후 자가보고',
      color: 'text-alma-primary',
    },
    {
      number: '92%',
      label: '추천 의향',
      detail: '"친구에게도 알려주고 싶어요"',
      color: 'text-alma-accent',
    },
  ];

  const insights = [
    { text: '아시아 여성 평균 폐경 연령 48-49세 (서양 51세보다 빠름)', source: 'Sol Research' },
    { text: '한국 여성 1위 증상: 관절통/근육통 (서양은 핫플래시)', source: 'Sol Asia Data' },
    { text: '갱년기 전용 커뮤니티: 한국 0개 vs 글로벌 5개+', source: 'ALMA 시장 조사' },
  ];

  return (
    <section className="px-6 md:px-8 py-24 md:py-32 bg-alma-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-alma-accent font-semibold mb-2 uppercase tracking-wider">
            Real Results
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-alma-text">
            숫자가 말해주는 ALMA
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-8 border border-alma-border text-center hover:shadow-lg transition-shadow"
            >
              <p className={`text-4xl md:text-5xl font-black ${stat.color} mb-3`}>
                {stat.number}
              </p>
              <p className="font-semibold text-alma-text mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-alma-text-tertiary">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 한국 갱년기 인사이트 — Sol/경쟁사 분석 기반 */}
        <div className="bg-white rounded-2xl p-8 border border-alma-border">
          <p className="text-sm font-semibold text-alma-primary mb-6 text-center">
            알고 계셨나요?
          </p>
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={insight.text} className="flex items-start gap-4 p-4 bg-alma-bg rounded-xl">
                <div className="w-8 h-8 rounded-full bg-alma-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-alma-primary">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-alma-text">{insight.text}</p>
                  <p className="text-xs text-alma-text-tertiary mt-1">{insight.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
