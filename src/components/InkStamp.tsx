import { forwardRef, type CSSProperties } from 'react';

// Gouttes projetées autour du tampon : position (en % du tampon), rayon (px),
// et décalage de départ (vers le centre) pour l'effet de projection.
const SPLATTER = [
  { x: -6, y: 18, r: 7 },
  { x: -12, y: 48, r: 3.5 },
  { x: -4, y: 82, r: 5 },
  { x: 8, y: 112, r: 4 },
  { x: 30, y: -10, r: 5.5 },
  { x: 48, y: -18, r: 2.5 },
  { x: 70, y: -8, r: 4 },
  { x: 104, y: 12, r: 6 },
  { x: 114, y: 40, r: 3 },
  { x: 106, y: 74, r: 4.5 },
  { x: 92, y: 110, r: 3.5 },
  { x: 40, y: 114, r: 6.5 },
  { x: 60, y: 120, r: 2.5 },
  { x: -16, y: -8, r: 2 },
  { x: 120, y: -6, r: 2.5 },
];

// Coulures sous le tampon : position horizontale (%), largeur et longueur (px).
const DRIPS = [
  { x: 14, w: 9, h: 30 },
  { x: 49, w: 7, h: 16 },
  { x: 79, w: 11, h: 50 },
];

/**
 * « ON JOUE. VOUS DANSEZ. » tamponné sur l'affiche vidéo : bords irréguliers,
 * grain d'encre, éclaboussures à l'impact et coulures qui glissent sur la vidéo.
 * Tout est en SVG/CSS ; sans animation (prefers-reduced-motion), on voit l'état final.
 */
const InkStamp = forwardRef<HTMLSpanElement>((_, ref) => (
  <span ref={ref} className="ink-stamp absolute -right-4 bottom-[60px] -rotate-[9deg]" aria-hidden="true">
    <svg width="0" height="0" className="absolute">
      <defs>
        {/* Bords « caoutchouc » : le contour et le texte ondulent légèrement… */}
        <filter id="ink-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" xChannelSelector="R" yChannelSelector="G" result="rough" />
          {/* …et l'encre ne prend pas partout : petits manques aléatoires. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.38" numOctaves="3" seed="11" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -16 0 0 0 10.9"
            result="holes"
          />
          <feComposite in="rough" in2="holes" operator="in" />
        </filter>
        <filter id="ink-blob" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="2" seed="2" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Coulures : ondulation douce, l'encre file sans se déchiqueter. */}
        <filter id="ink-drip" x="-100%" y="-10%" width="300%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="1" seed="5" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>

    <svg className="ink-stamp__splatter" filter="url(#ink-blob)">
      {SPLATTER.map((drop, i) => (
        <circle
          key={i}
          cx={`${drop.x}%`}
          cy={`${drop.y}%`}
          r={drop.r}
          style={
            {
              '--from-x': `${(50 - drop.x) * 0.4}%`,
              '--from-y': `${(50 - drop.y) * 0.4}%`,
              animationDelay: `${1.42 + (i % 5) * 0.02}s`,
            } as CSSProperties
          }
        />
      ))}
    </svg>

    <span className="ink-stamp__body">
      ON JOUE.
      <br />
      VOUS DANSEZ.
    </span>

    {/* Les coulures suivent la gravité : on compense la rotation du tampon. */}
    {DRIPS.map((drip, i) => (
      <span
        key={i}
        className="ink-stamp__drip"
        style={{ left: `${drip.x}%`, width: drip.w, height: drip.h, animationDelay: `${1.6 + i * 0.25}s` }}
      />
    ))}
  </span>
));

InkStamp.displayName = 'InkStamp';

export default InkStamp;
