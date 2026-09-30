import { useState } from 'react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import BandPhoto, { type Face } from './BandPhoto';

// Position des visages sur « Lokaz tetes.avif » (en % de la photo).
const MEMBERS: (Face & { role: string })[] = [
  { name: 'Valentine', role: 'Voix', x: 12, y: 40, r: 11 },
  { name: 'Pier-O', role: 'Batterie', x: 31, y: 57, r: 9 },
  { name: 'Laurent', role: 'Clavier', x: 53, y: 60, r: 9 },
  { name: 'Teddy', role: 'Guitare', x: 79, y: 60, r: 10 },
  { name: 'PH', role: 'Basse', x: 82, y: 27, r: 17 },
];

const BandSection = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="le-groupe" className="border-b border-white/15 bg-ink py-[60px] md:py-[90px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start px-4 sm:px-6 md:grid-cols-2 md:gap-x-[50px] lg:px-8">
        <SectionTitle className="text-gray-100 md:col-span-2">Le groupe</SectionTitle>

        <BandPhoto faces={MEMBERS} active={active} onActiveChange={setActive} />

        <Reveal delay={150}>
          <p className="mb-6 text-lg leading-relaxed text-gray-300">
            L'OkaZ est un groupe de musique varié qui propose un répertoire riche mêlant les plus grands succès
            de la variété française et internationale. Avec une énergie communicative et une passion pour la scène,
            nous animons vos événements avec professionnalisme et convivialité.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            De la chanson française aux tubes internationaux, notre répertoire s'adapte à tous les publics et toutes
            les générations. Que ce soit pour un festival, un bal ou une soirée privée, nous mettons
            notre talent et notre expérience au service de votre événement pour créer des moments inoubliables.
          </p>
        </Reveal>

        <ul className="mt-6 flex flex-wrap gap-2">
          {MEMBERS.map((member, index) => (
            <Reveal as="li" key={member.name} delay={index * 80}>
              {/* Survol, focus clavier ou tap : le projecteur éclaire ce musicien sur la photo. */}
              <button
                type="button"
                aria-pressed={active === member.name}
                title={`Montrer ${member.name} sur la photo`}
                onMouseEnter={() => setActive(member.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(member.name)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(member.name)}
                className={`py-3 pr-4 text-left transition-opacity duration-300 ${
                  active && active !== member.name ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <span className="block text-lg font-bold text-accent">{member.name}</span>
                <span className="block text-sm text-gray-300">{member.role}</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BandSection;
