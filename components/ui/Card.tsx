interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-hlk-surface rounded-2xl border border-hlk-border p-8 shadow-soft ${className}`}>
      {children}
    </div>
  );
}
