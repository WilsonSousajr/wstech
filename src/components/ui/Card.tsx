import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-4 sm:p-6 min-w-0 overflow-hidden transition-all duration-300 hover:bg-surface-hover hover:border-border-hover ${className}`}
    >
      {children}
    </div>
  );
}
