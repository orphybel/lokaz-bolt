import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]';

/**
 * Anneau qui suit la souris avec un léger retard. Il grossit sur les éléments
 * cliquables et affiche une indication (« Agrandir », « Lecture »…) sur ceux
 * qui portent `data-cursor`. Le curseur natif reste visible.
 */
const CursorFollower = () => {
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const ring = ringRef.current;
    if (!enabled || !ring) return;

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let frame = 0;
    let first = true;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      ring.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (first) {
        // Pas de trajet depuis le coin de l'écran au premier mouvement.
        pos.x = target.x;
        pos.y = target.y;
        first = false;
      }
      ring.classList.add('is-visible');
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handleOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>(INTERACTIVE);
      ring.classList.toggle('is-hover', !!el);
      const text = el?.dataset.cursor ?? '';
      ring.classList.toggle('has-label', !!text);
      // On garde l'ancien texte pendant le fondu de sortie.
      if (text) setLabel(text);
    };

    const handleLeave = () => ring.classList.remove('is-visible');

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ringRef} className="cursor-follower" aria-hidden="true">
      <span className="cursor-follower__label">{label}</span>
    </div>
  );
};

export default CursorFollower;
