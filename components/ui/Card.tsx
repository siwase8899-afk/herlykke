interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-alma-surface rounded-2xl border border-alma-border p-8 ${className}`}>
      {children}
    </div>
  );
}
