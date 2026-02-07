import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-violet-600 bg-zinc-900 p-6 ${
        hover ? 'hover:border-violet-500 hover:scale-[1.01] transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
