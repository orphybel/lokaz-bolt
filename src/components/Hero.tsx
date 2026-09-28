import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const STRIP_ITEMS = ['FESTIVALS', 'BALS', 'SOIRÉES PRIVÉES', 'LIVE & ENSEMBLE'];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Hero = ({ scrollToSection }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // React ne pose pas toujours l'attribut `muted` : on le force pour que
  // Safari iOS accepte la lecture automatique.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion()) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section id="accueil" className="overflow-hidden bg-ink pt-[100px] md:pt-[110px]">
      <div className="mx-auto max-w-[1264px] px-6">
        <div className="flex justify-between gap-4 border-b border-white/20 pb-6 text-xs font-bold tracking-[0.02em] text-[#c1c1b8] md:tracking-[0.12em]">
          <span>VARIÉTÉ FRANÇAISE &amp; INTERNATIONALE</span>
          <span className="text-right">MILLAU · AVEYRON</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-9 py-9 md:grid-cols-[1.15fr_1fr] md:gap-5 md:pb-12 md:pt-14">
          <div className="relative z-10">
            <p className="mb-6 text-xs font-bold tracking-[0.05em] text-pink md:tracking-[0.12em]">
              CINQ MUSICIENS. UNE MÊME ÉNERGIE.
            </p>
            <h1 className="font-display text-[clamp(4.7rem,18vw,8rem)] font-normal leading-[0.98] md:text-[clamp(5rem,9.8vw,9rem)]">
              L’OkaZ{' '}
              <span className="block whitespace-nowrap text-[0.58em] leading-[1.15] text-pink">DE VIBRER.</span>
              <span className="sr-only">
                {' '}— groupe de musique variété française et internationale en Aveyron
              </span>
            </h1>
            <p className="mt-7 text-lg leading-[1.65] text-[#cfcfc8]">
              Les chansons que vous aimez.
              <br />
              L’énergie du live, ensemble.
            </p>
            <p className="mb-7 mt-3 max-w-md text-sm leading-relaxed text-[#9d9d95]">
              Groupe de variété basé en Aveyron : bals, festivals, fêtes de village et soirées privées.
            </p>
            <div className="flex flex-wrap items-center gap-[22px]">
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-5 bg-acid px-6 py-4 font-extrabold text-ink transition hover:-translate-y-[3px] hover:bg-pink"
              >
                Nous contacter <ArrowUpRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection('videos')}
                className="inline-flex items-center gap-2.5 border-b border-[#777] py-3 text-sm"
              >
                <Play size={18} /> Écouter le groupe
              </button>
            </div>
          </div>

          <figure className="relative mb-0 ml-1 mr-2.5 mt-2.5 rotate-3 border border-[#666] bg-[#252525] md:ml-0 md:mt-0">
            <video
              ref={videoRef}
              className="block aspect-[16/10] w-full object-cover object-[30%_50%]"
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
              className="absolute -right-4 bottom-[60px] -rotate-[9deg] border-2 border-ink bg-pink p-5 text-xl font-black leading-[1.1] text-ink"
              aria-hidden="true"
            >
              ON JOUE.
              <br />
              VOUS DANSEZ.
            </span>
          </figure>
        </div>

        <div className="flex flex-col items-start gap-6 border-t border-white/20 pb-[38px] pt-6 text-xs font-bold leading-[1.7] tracking-[0.04em] text-[#c1c1b8] md:flex-row md:items-center md:justify-between md:leading-normal">
          <span>Valentine · Pier-O · Laurent · Teddy · PH</span>
          <button onClick={() => scrollToSection('le-groupe')} className="flex items-center gap-3 text-paper">
            DÉCOUVRIR LE GROUPE <ArrowDown size={18} />
          </button>
        </div>
      </div>

      {/* Bandeau défilant : deux moitiés identiques, l'animation décale de -50 % pour boucler sans saut. */}
      <div className="overflow-hidden bg-acid py-[18px] text-ink" aria-hidden="true">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
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
