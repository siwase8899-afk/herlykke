export default function RealInkBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const cls = size === 'md'
    ? 'text-sm px-3 py-1.5 gap-1.5'
    : 'text-xs px-2 py-1 gap-1';

  return (
    <span className={`inline-flex flex-col items-center ${cls} bg-white/90 backdrop-blur-sm border border-hlk-border rounded-full font-medium text-hlk-text`}>
      <span className="flex items-center gap-1">
        <span>✍️</span>
        <span>손글씨 인증</span>
      </span>
      <span className="text-[9px] text-hlk-text-tertiary leading-none -mt-0.5">Real Ink</span>
    </span>
  );
}
