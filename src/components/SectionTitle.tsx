import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

// Le titre « sort » d'un cache, comme une ligne d'affiche imprimée.
const SectionTitle = ({ children, className = 'text-gray-100' }: SectionTitleProps) => (
  <Reveal
    as="h2"
    variant="mask"
    className={`font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[1.05] tracking-[-0.01em] mb-7 md:mb-9 ${className}`}
  >
    <span className="block">{children}</span>
  </Reveal>
);

export default SectionTitle;
