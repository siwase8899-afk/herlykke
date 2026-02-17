'use client';

interface OptionButtonProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export function OptionButton({ label, emoji, selected, onClick, multi = false }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left px-5 py-4 rounded-xl border-[1.5px] transition-all duration-150
        cursor-pointer flex items-center gap-3 min-h-[56px]
        ${selected
          ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary-dark font-semibold'
          : 'border-hlk-border bg-hlk-surface text-hlk-text hover:border-hlk-primary/40'
        }
      `}
    >
      {multi && (
        <span className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 text-xs
          ${selected ? 'border-hlk-primary bg-hlk-primary text-white' : 'border-hlk-border'}
        `}>
          {selected && '✓'}
        </span>
      )}
      {emoji && <span className="text-xl flex-shrink-0">{emoji}</span>}
      <span className="text-[15px] leading-snug">{label}</span>
    </button>
  );
}
