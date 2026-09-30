import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion, subscribeScroll, useReveal } from '../lib/motion';

const MAX_TILT = 4; // degrés
const PARALLAX = 6; // % de décalage de la photo dans son cadre, de part et d'autre

/**
 * Photo du groupe : elle glisse dans son cadre pendant le scroll (le cadre reste
 * immobile, ce qui accompagne le `sticky` en desktop) et s'incline vers la souris
 * avec un reflet de lumière.
 */
const BandPhoto = () => {
  // Le conteneur porte le `sticky` : c'est lui qui apparaît au scroll.
  const wrapperRef = useReveal<HTMLDivElement>();
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Parallaxe interne, calée sur la traversée de la section dans l'écran.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;
    const section = wrapper?.closest('section');
    if (!image || !section || prefersReducedMotion()) return;

    return subscribeScroll(() => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // -1 quand la section entre par le bas, 1 quand elle sort par le haut.
      const progress = 1 - (rect.bottom / (rect.height + window.innerHeight)) * 2;
      image.style.translate = `0 ${(progress * PARALLAX).toFixed(2)}%`;
    });
  }, [wrapperRef]);

  // Inclinaison 3D + reflet qui suit la souris.
  useEffect(() => {
    const frame = frameRef.current;
    const glare = glareRef.current;
    if (!frame || !glare || prefersReducedMotion() || !hasFinePointer()) return;

    let raf = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      frame.style.transform = `rotateX(${(-current.y * MAX_TILT).toFixed(2)}deg) rotateY(${(current.x * MAX_TILT).toFixed(2)}deg)`;
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      target.x = x * 2 - 1;
      target.y = y * 2 - 1;
      glare.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
      glare.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      glare.style.opacity = '1';
      start();
    };
    const handleLeave = () => {
      target.x = 0;
      target.y = 0;
      glare.style.opacity = '0';
      start();
    };

    frame.addEventListener('mousemove', handleMove);
    frame.addEventListener('mouseleave', handleLeave);
    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener('mousemove', handleMove);
      frame.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-reveal="wipe"
      className="reveal mb-7 [perspective:1200px] md:sticky md:top-[110px] md:row-span-2 md:mb-0"
    >
      <div ref={frameRef} className="relative overflow-hidden border-b-[10px] border-accent will-change-transform">
        <img
          ref={imageRef}
          src="/Lokaz tetes.avif"
          alt="Les 5 musiciens du groupe L'OkaZ"
          className="block h-auto w-full scale-[1.14]"
        />
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,0.55),transparent_60%)]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default BandPhoto;
