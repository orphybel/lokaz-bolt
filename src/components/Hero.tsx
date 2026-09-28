import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
interface HeroProps { scrollToSection: (id: string) => void; }
const Hero = ({ scrollToSection }: HeroProps) => (
  <section className="concert-hero" id="accueil">
    <div className="hero-topline"><span>VARIÉTÉ FRANÇAISE & INTERNATIONALE</span><span>MILLAU · AVEYRON</span></div>
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="eyebrow">CINQ MUSICIENS. UNE MÊME ÉNERGIE.</p>
        <h1>L’OkaZ<span className="hero-outline">DE VIBRER.</span></h1>
        <p className="hero-description">Les chansons que vous aimez.<br />L’énergie du live, ensemble.</p>
        <div className="hero-actions">
          <button className="primary-action" onClick={() => scrollToSection('contact')}>Nous contacter <ArrowUpRight size={20} /></button>
          <button className="video-action" onClick={() => scrollToSection('videos')}><Play size={18} /> Écouter le groupe</button>
        </div>
      </div>
      <figure className="hero-photo">
        <img src="/Laissac 2025-1.jpeg" alt="L’OkaZ sur scène à Laissac en 2025" fetchPriority="high" />
        <figcaption><span>L’OkaZ sur scène</span><span>LAISSAC / 2025</span></figcaption>
        <span className="live-stamp" aria-hidden="true">ON JOUE.<br />VOUS DANSEZ.</span>
      </figure>
    </div>
    <div className="hero-bottom"><span>Valentine · Pier-O · Laurent · Teddy · PH</span><button onClick={() => scrollToSection('le-groupe')}>DÉCOUVRIR LE GROUPE <ArrowDown size={18} /></button></div>
    <div className="concert-strip" aria-hidden="true"><span>FESTIVALS</span><span>✳</span><span>BALS</span><span>✳</span><span>SOIRÉES PRIVÉES</span><span>✳</span><span>LIVE & ENSEMBLE</span></div>
  </section>
);
export default Hero;
