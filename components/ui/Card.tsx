interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card-glass rounded-2xl p-8 shadow-soft ${className}`}>
      {children}
    </div>
  );
}
