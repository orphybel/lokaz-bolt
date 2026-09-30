import { useEffect, useRef } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Souris ou trackpad : les effets liés au curseur n'ont pas de sens au doigt. */
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Un seul écouteur de scroll pour tout le site, cadencé sur requestAnimationFrame.
type ScrollListener = (scrollY: number) => void;
const scrollListeners = new Set<ScrollListener>();
let scrollTicking = false;

const flushScroll = () => {
  scrollTicking = false;
  const y = window.scrollY;
  scrollListeners.forEach((listener) => listener(y));
};

const onScroll = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(flushScroll);
};

export const subscribeScroll = (listener: ScrollListener) => {
  if (scrollListeners.size === 0) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }
  scrollListeners.add(listener);
  listener(window.scrollY);
  return () => {
    scrollListeners.delete(listener);
    if (scrollListeners.size === 0) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };
};

// Apparition au scroll : un IntersectionObserver partagé ajoute `is-revealed` une seule fois.
let revealObserver: IntersectionObserver | null = null;

const getRevealObserver = () => {
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver?.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  return revealObserver;
};

export const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
      return;
    }
    const observer = getRevealObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return ref;
};

/** Parallaxe verticale : l'élément se décale de `speed` × la distance scrollée tant qu'il est proche de l'écran. */
export const useParallax = <T extends HTMLElement>(speed: number) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return subscribeScroll((y) => {
      if (y > window.innerHeight * 1.5) return;
      // `translate` se compose avec les `transform` Tailwind (rotation, survol…).
      el.style.translate = `0 ${(y * speed).toFixed(1)}px`;
    });
  }, [speed]);

  return ref;
};

/** Bouton « magnétique » : il suit légèrement le curseur puis revient en place. */
export const useMagnetic = <T extends HTMLElement>(strength = 0.3) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return;

    let frame = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      el.style.translate = `${current.x.toFixed(2)}px ${current.y.toFixed(2)}px`;
      const settled = Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      target.y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      start();
    };
    const handleLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.style.translate = '';
    };
  }, [strength]);

  return ref;
};
