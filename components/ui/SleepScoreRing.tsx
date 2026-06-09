// 수면 점수 방사형 링 (Oura식). 비치볼 SleepCycleViz 대체.
// 세이지 아크 + Fraunces 세리프 숫자(인디고). DESIGN.md "차분한 신뢰" 데이터 톤.

export function SleepScoreRing({ score, size = 96 }: { score: number; size?: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - clamped / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-hlk-border)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-hlk-primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.19,1,0.22,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-[family-name:var(--font-serif)] font-semibold text-hlk-indigo leading-none tabular-nums"
          style={{ fontSize: size * 0.32 }}
        >
          {clamped}
        </span>
      </div>
    </div>
  );
}
