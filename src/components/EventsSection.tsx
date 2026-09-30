import { Calendar, MapPin, Clock } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

const EventsSection = () => {
  const events = [
    {
      date: '14 Juillet',
      title: 'Marchés gourmands / nocturnes des fermiers de l\'Aveyron',
      location: 'Place du Mandarous à Millau',
      time: '20h30',
      year: 2026
    },
    {
      date: '21 Juin',
      title: 'Fête de la Musique',
      location: 'Le Bouche à Oreille (BO) à Millau',
      time: '20h00',
      year: 2025
    },
    {
      date: '23 Août',
      title: 'Fête de Laissac',
      location: 'Laissac',
      time: '20h30',
      year: 2025
    },
  ];

  const eventsByYear = events.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {} as Record<number, typeof events>);

  const sortedYears = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <section id="evenements" className="border-b border-white/15 bg-paper py-[60px] text-ink md:py-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="text-ink">Événements</SectionTitle>

        <div className="space-y-12">
          {sortedYears.map((year) => (
            <div key={year}>
              <Reveal as="h3" variant="left" className="mb-6 flex items-center text-3xl font-bold">
                <Calendar className="mr-3 h-8 w-8 text-accent-dark" />
                {year}
              </Reveal>
              <div>
                {eventsByYear[Number(year)].map((event, index) => (
                  <Reveal
                    key={index}
                    delay={index * 90}
                    className="grid grid-cols-1 items-start gap-3 border-t border-ink/35 py-[26px] md:grid-cols-[140px_1fr_260px] md:gap-6"
                  >
                    <div className="text-xl font-bold text-accent-dark md:text-lg">{event.date}</div>
                    <h4 className="text-2xl font-bold md:text-[1.4rem]">{event.title}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-accent-dark" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-accent-dark" />
                        <span>Dès {event.time}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
