import { Calendar, MapPin } from 'lucide-react';

const EventsSection = () => {
  const events = [
    { title: 'Bal des Pompiers', location: 'Rodez', year: 2023 },
    { title: 'Marché Gourmand', location: 'Millau', year: 2022 },
    { title: 'Festival d\'été', location: 'Aveyron', year: 2022 },
    { title: 'Mariage privé', location: 'Toulouse', year: 2023 },
    { title: 'Fête de la Musique', location: 'Villefranche-de-Rouergue', year: 2022 },
    { title: 'Concert de Noël', location: 'Rodez', year: 2021 },
    { title: 'Soirée d\'entreprise', location: 'Albi', year: 2023 },
    { title: 'Festival Rock & Folk', location: 'Decazeville', year: 2022 },
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
    <section id="evenements" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-100 mb-4">
          Événements
        </h2>
        <div className="w-24 h-1 bg-[#c0392b] mx-auto mb-12"></div>

        <div className="space-y-12">
          {sortedYears.map((year) => (
            <div key={year}>
              <h3 className="text-3xl font-bold text-gray-100 mb-6 flex items-center">
                <Calendar className="h-8 w-8 text-[#c0392b] mr-3" />
                {year}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsByYear[Number(year)].map((event, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-[#c0392b]"
                  >
                    <h4 className="text-xl font-bold text-gray-100 mb-3">{event.title}</h4>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-5 w-5 mr-2 text-[#c0392b]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
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
