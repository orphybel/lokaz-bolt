import { useEffect, useRef, type CSSProperties } from 'react';
import { hasFinePointer, prefersReducedMotion, subscribeScroll, useReveal } from '../lib/motion';

const MAX_TILT = 4; // degrés
const PARALLAX = 6; // % de décalage de la photo dans son cadre, de part et d'autre
const PHOTO_RATIO = 666 / 498; // largeur / hauteur de « Lokaz tetes.avif »

export interface Face {
  name: string;
  /** Centre du visage, en % de la largeur et de la hauteur de la photo. */
  x: number;
  y: number;
  /** Rayon, en % de la largeur de la photo. */
  r: number;
}

interface BandPhotoProps {
  faces: Face[];
  active: string | null;
  onActiveChange: (name: string | null) => void;
}

/**
 * Photo du groupe : elle glisse dans son cadre pendant le scroll (le cadre reste
 * immobile, ce qui accompagne le `sticky` en desktop) et s'incline vers la souris
 * avec un reflet de lumière. Un projecteur éclaire le musicien survolé, depuis la
 * photo ou depuis la liste des prénoms.
 */
const BandPhoto = ({ faces, active, onActiveChange }: BandPhotoProps) => {
  // Le conteneur porte le `sticky` : c'est lui qui apparaît au scroll.
  const wrapperRef = useReveal<HTMLDivElement>();
  const frameRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const hoveredFace = useRef<string | null>(null);

  // Parallaxe interne, calée sur la traversée de la section dans l'écran.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const mover = moverRef.current;
    const section = wrapper?.closest('section');
    if (!mover || !section || prefersReducedMotion()) return;

    return subscribeScroll(() => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // -1 quand la section entre par le bas, 1 quand elle sort par le haut.
      const progress = 1 - (rect.bottom / (rect.height + window.innerHeight)) * 2;
      mover.style.translate = `0 ${(progress * PARALLAX).toFixed(2)}%`;
    });
  }, [wrapperRef]);

  // Inclinaison 3D, reflet, et repérage du visage sous la souris.
  useEffect(() => {
    const frame = frameRef.current;
    const mover = moverRef.current;
    const glare = glareRef.current;
    if (!frame || !mover || !glare || !hasFinePointer()) return;
    const animate = !prefersReducedMotion();

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
      if (animate && !raf) raf = requestAnimationFrame(tick);
    };

    const setHovered = (name: string | null) => {
      if (hoveredFace.current === name) return;
      hoveredFace.current = name;
      onActiveChange(name);
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

      // Coordonnées dans la photo elle-même (zoom et parallaxe compris).
      const photo = mover.getBoundingClientRect();
      const px = ((e.clientX - photo.left) / photo.width) * 100;
      const py = ((e.clientY - photo.top) / photo.height) * 100;
      const face = faces.find((f) => Math.hypot(px - f.x, (py - f.y) / PHOTO_RATIO) < f.r);
      setHovered(face?.name ?? null);
    };
    const handleLeave = () => {
      target.x = 0;
      target.y = 0;
      glare.style.opacity = '0';
      start();
      setHovered(null);
    };

    frame.addEventListener('mousemove', handleMove);
    frame.addEventListener('mouseleave', handleLeave);
    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener('mousemove', handleMove);
      frame.removeEventListener('mouseleave', handleLeave);
    };
  }, [faces, onActiveChange]);

  // On garde la dernière position pendant le fondu de sortie.
  const lastSpot = useRef<Face | null>(null);
  const activeFace = faces.find((f) => f.name === active) ?? null;
  if (activeFace) lastSpot.current = activeFace;
  const spot = lastSpot.current;
  const spotStyle = spot
    ? ({
        '--spot-x': `${spot.x}%`,
        '--spot-y': `${spot.y}%`,
        '--spot-rx': `${spot.r}%`,
        '--spot-ry': `${spot.r * PHOTO_RATIO}%`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={wrapperRef}
      data-reveal="wipe"
      className="reveal mb-7 [perspective:1200px] md:sticky md:top-[110px] md:row-span-2 md:mb-0"
    >
      <div ref={frameRef} className="relative overflow-hidden border-b-[10px] border-accent will-change-transform">
        <div ref={moverRef} className="relative scale-[1.14]">
          <img src="/Lokaz tetes.avif" alt="Les 5 musiciens du groupe L'OkaZ" className="block h-auto w-full" />
          <div
            className={`band-spotlight ${activeFace ? 'is-on' : ''}`}
            style={spotStyle}
            aria-hidden="true"
          />
        </div>
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
