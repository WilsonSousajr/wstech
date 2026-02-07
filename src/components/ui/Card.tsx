import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#232323] bg-[#141414] p-6 transition-all duration-300 hover:bg-[#1a1a1a] hover:border-[#2a2a2a] ${className}`}
    >
      {children}
    </div>
  );
}
