import type { ReactNode } from 'react';
import Glass from '../glass/Glass';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <Glass variant="smoky" className={`rounded-[18px] sm:rounded-[20px] p-4 sm:p-6 min-w-0 overflow-hidden ${className}`}>
      {children}
    </Glass>
  );
}
