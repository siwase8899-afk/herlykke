export function ConcreteStats() {
  const stats = [
    {
      number: '92%',
      label: '추천율',
      detail: '수료생 설문 기준',
      color: 'text-alma-primary',
    },
    {
      number: '78%',
      label: '일상관리 향상',
      detail: '4주 후 자가보고',
      color: 'text-alma-accent',
    },
    {
      number: '47분',
      label: '평균 응답시간',
      detail: 'ALMA 커뮤니티',
      color: 'text-alma-secondary',
    },
    {
      number: '340+',
      label: '총 수료생',
      detail: '현재 7기 진행 중',
      color: 'text-alma-primary',
    },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
}
