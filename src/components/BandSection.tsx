import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { useReveal } from '../lib/motion';

const BandSection = () => {
  // L'image est `sticky` en desktop : on anime l'image elle-même plutôt qu'un conteneur.
  const imageRef = useReveal<HTMLImageElement>();
  const members = [
    { name: 'Valentine', role: 'Voix' },
    { name: 'Pier-O', role: 'Batterie' },
    { name: 'Laurent', role: 'Clavier' },
    { name: 'Teddy', role: 'Guitare' },
    { name: 'PH', role: 'Basse' },
  ];

  return (
    <section id="le-groupe" className="border-b border-white/15 bg-ink py-[60px] md:py-[90px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start px-4 sm:px-6 md:grid-cols-2 md:gap-x-[50px] lg:px-8">
        <SectionTitle className="text-gray-100 md:col-span-2">Le groupe</SectionTitle>

        <img
          ref={imageRef}
          data-reveal="wipe"
          src="/Lokaz tetes.avif"
          alt="Les 5 musiciens du groupe L'OkaZ"
          className="reveal mb-7 h-auto w-full border-b-[10px] border-accent md:sticky md:top-[110px] md:row-span-2 md:mb-0"
        />

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
          {members.map((member, index) => (
            <Reveal as="li" key={member.name} delay={index * 80} className="py-3 pr-4">
              <h3 className="text-lg font-bold text-accent">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BandSection;
