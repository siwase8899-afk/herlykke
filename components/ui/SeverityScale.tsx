'use client';

interface SeverityScaleProps {
  value: number;
  onChange: (value: number) => void;
  labels: string[];
}

export function SeverityScale({ value, onChange, labels }: SeverityScaleProps) {
  return (
    <div className="flex gap-2 mt-6">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`
            flex-1 flex flex-col items-center py-4 rounded-xl border-[1.5px] gap-1.5
            transition-all duration-150 cursor-pointer
            ${value === v
              ? 'border-alma-primary bg-alma-primary-light'
              : 'border-alma-border bg-alma-surface hover:border-alma-primary/40'
            }
          `}
        >
          <span className={`
            text-xl font-bold
            ${value === v ? 'text-alma-primary' : 'text-alma-text-tertiary'}
          `}>
            {v}
          </span>
          <span className={`
            text-[11px] leading-tight text-center
            ${value === v ? 'text-alma-primary-dark font-semibold' : 'text-alma-text-tertiary'}
          `}>
            {labels[v - 1]}
          </span>
        </button>
      ))}
    </div>
  );
}
