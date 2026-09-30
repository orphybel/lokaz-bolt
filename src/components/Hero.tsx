import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import { hasFinePointer, prefersReducedMotion, subscribeScroll, useMagnetic, useParallax } from '../lib/motion';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const STRIP_ITEMS = ['FESTIVALS', 'BALS', 'SOIRÉES PRIVÉES', 'LIVE & ENSEMBLE'];

const delay = (ms: number) => ({ '--intro-delay': `${ms}ms` }) as CSSProperties;

const Hero = ({ scrollToSection }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const figureRef = useParallax<HTMLDivElement>(0.08);
  const stampRef = useParallax<HTMLSpanElement>(-0.07);
  const ctaRef = useMagnetic<HTMLButtonElement>(0.25);

  // React ne pose pas toujours l'attribut `muted` : on le force pour que
  // Safari iOS accepte la lecture automatique.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion()) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  // Halo « projecteur » qui suit la souris dans l'accueil.
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow || prefersReducedMotion() || !hasFinePointer()) return;

    let frame = 0;
    const handleMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        glow.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        glow.style.setProperty('--my', `${e.clientY - rect.top}px`);
        glow.style.opacity = '1';
      });
    };
    const handleLeave = () => {
      glow.style.opacity = '0';
    };

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Le bandeau accélère avec la vitesse de scroll, puis revient à son rythme.
  useEffect(() => {
    const strip = marqueeRef.current;
    if (!strip || prefersReducedMotion()) return;
    const animation = strip.getAnimations?.()[0];
    if (!animation) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let rate = 1;
    let target = 1;
    let frame = 0;

    const tick = () => {
      target += (1 - target) * 0.06;
      rate += (target - rate) * 0.15;
      animation.playbackRate = rate;
      if (Math.abs(rate - 1) < 0.01 && Math.abs(target - 1) < 0.01) {
        animation.playbackRate = 1;
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const unsubscribe = subscribeScroll((y) => {
      const now = performance.now();
      const velocity = Math.abs(y - lastY) / Math.max(now - lastT, 1); // px/ms
      lastY = y;
      lastT = now;
      target = Math.max(target, Math.min(1 + velocity * 2.5, 6));
      if (!frame) frame = requestAnimationFrame(tick);
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="accueil" className="relative overflow-hidden bg-ink pt-[100px] md:pt-[110px]">
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 [background:radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,107,44,0.13),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1264px] px-6">
        <div
          className="intro flex justify-between gap-4 border-b border-white/20 pb-6 text-xs font-bold tracking-[0.02em] text-[#c1c1b8] md:tracking-[0.12em]"
          style={delay(0)}
        >
          <span>VARIÉTÉ FRANÇAISE &amp; INTERNATIONALE</span>
          <span className="text-right">MILLAU · AVEYRON</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-9 py-9 md:grid-cols-[19rem_1fr] md:gap-0 md:pb-12 md:pt-14">
          <div className="relative z-10">
            <p className="intro mb-6 text-xs font-bold tracking-[0.05em] text-accent md:tracking-[0.12em]" style={delay(80)}>
              CINQ MUSICIENS. UNE MÊME ÉNERGIE.
            </p>
            <h1 className="font-display md:[text-shadow:0_4px_24px_rgba(0,0,0,0.55)] text-[clamp(4.7rem,18vw,8rem)] font-normal leading-[0.98] md:text-[clamp(5rem,9.8vw,9rem)]">
              <span className="intro inline-block" style={delay(140)}>L’OkaZ</span>{' '}
              <span className="intro block whitespace-nowrap text-[0.58em] leading-[1.15] text-accent" style={delay(260)}>
                DE VIBRER.
              </span>
              <span className="sr-only">
                {' '}— groupe de musique variété française et internationale en Aveyron
              </span>
            </h1>
            <div className="intro" style={delay(380)}>
              <p className="mt-7 text-lg leading-[1.65] text-[#cfcfc8]">
                Les chansons que vous aimez.
                <br />
                L’énergie du live, ensemble.
              </p>
              <p className="mb-7 mt-3 max-w-[18rem] text-sm leading-relaxed text-[#9d9d95]">
                Groupe de variété basé en Aveyron : bals, festivals, fêtes de village et soirées privées.
              </p>
            </div>
            <div className="intro flex flex-col items-start gap-4" style={delay(480)}>
              <button
                ref={ctaRef}
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center gap-5 bg-acid px-6 py-4 font-extrabold text-ink transition hover:-translate-y-[3px] hover:bg-accent active:translate-y-0"
              >
                Nous contacter
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45"
                />
              </button>
              <button
                onClick={() => scrollToSection('videos')}
                className="group inline-flex items-center gap-2.5 border-b border-[#777] py-3 text-sm transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Play size={18} className="transition-transform duration-300 group-hover:scale-125 group-hover:fill-current" />
                Écouter le groupe
              </button>
            </div>
          </div>

          {/* Parallaxe sur l'enveloppe, entrée et rotation sur la figure : les deux ne se marchent pas dessus. */}
          <div ref={figureRef}>
            <figure
              className="intro relative mb-0 ml-1 mr-2.5 mt-2.5 rotate-3 border border-[#666] bg-[#252525] md:ml-0 md:mt-0"
              style={delay(200)}
            >
              <video
                ref={videoRef}
                className="block aspect-video w-full object-cover object-[30%_50%]"
                src="/video/hero-foule.mp4"
                poster="/video/hero-foule.webp"
                autoPlay={!prefersReducedMotion()}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
              <figcaption className="flex justify-between gap-3 p-4 text-xs font-bold tracking-[0.04em]">
                <span>L’OkaZ en live</span>
                <span>AVEYRON</span>
              </figcaption>
              <span
                ref={stampRef}
                className="intro-stamp absolute -right-4 bottom-[60px] -rotate-[9deg] border-2 border-ink bg-accent p-5 text-xl font-black leading-[1.1] text-ink"
                aria-hidden="true"
              >
                ON JOUE.
                <br />
                VOUS DANSEZ.
              </span>
            </figure>
          </div>
        </div>

        <div
          className="intro flex flex-col items-start gap-6 border-t border-white/20 pb-[38px] pt-6 text-xs font-bold leading-[1.7] tracking-[0.04em] text-[#c1c1b8] md:flex-row md:items-center md:justify-between md:leading-normal"
          style={delay(600)}
        >
          <span>Valentine · Pier-O · Laurent · Teddy · PH</span>
          <button
            onClick={() => scrollToSection('le-groupe')}
            className="group flex items-center gap-3 text-paper transition-colors hover:text-acid"
          >
            DÉCOUVRIR LE GROUPE
            <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Bandeau défilant : deux moitiés identiques, l'animation décale de -50 % pour boucler sans saut. */}
      <div className="relative overflow-hidden bg-acid py-[18px] text-ink" aria-hidden="true">
        <div ref={marqueeRef} className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              {[0, 1, 2].map((repeat) =>
                STRIP_ITEMS.map((item) => (
                  <span
                    key={`${repeat}-${item}`}
                    className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-xl md:text-[2rem]"
                  >
                    {item}
                    <span>✳</span>
                  </span>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
