import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = 'text-gray-100' }: SectionTitleProps) => (
  <h2
    className={`font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[1.05] tracking-[-0.01em] mb-7 md:mb-9 ${className}`}
  >
    {children}
  </h2>
);

export default SectionTitle;
