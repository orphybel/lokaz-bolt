import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../lib/motion';

type RevealVariant = 'up' | 'left' | 'right' | 'mask' | 'wipe';

interface RevealProps {
  children: ReactNode;
  as?: 'div' | 'li' | 'p' | 'h2' | 'h3' | 'article';
  variant?: RevealVariant;
  /** Délai en ms, pour décaler les éléments d'une même liste. */
  delay?: number;
  className?: string;
}

const Reveal = ({ children, as = 'div', variant = 'up', delay = 0, className = '' }: RevealProps) => {
  const ref = useReveal<HTMLDivElement>();
  // Toutes les balises acceptées partagent l'API HTMLElement utilisée par le hook.
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`reveal ${className}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
