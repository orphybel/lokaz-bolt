import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotosSectionProps {
  onImageClick: (imageUrl: string) => void;
}

const PhotosSection = ({ onImageClick }: PhotosSectionProps) => {
  const albums = [
    {
      title: 'Bal des Pompiers Millau',
      photos: [
        '/Bal-pompiers-millau-lokaz-1.avif',
        '/Bal-pompiers-millau-lokaz-2.avif',
      ],
    },
    {
      title: 'Fête de la Musique 2019-2020',
      photos: [
        '/Fete-de-la-musique-1-2019_jp4.avif',
        '/Fete-de-la-musique-2019.avif',
        '/Fete-de-la-musique-6-2019.avif',
        '/Fete-de-la-musique-7-2019.avif',
        '/Fete-de-la-musique-8-2019.avif',
        '/Fete-de-la-musique-10-2019.avif',
        '/Lokaz-Fete-de-la-Musqiue-2020-01.avif',
        '/Lokaz-Fete-de-la-Musqiue-2020-04.avif',
        '/Lokaz-Fete-de-la-Musqiue-2020-05.avif',
      ],
    },
    {
      title: 'Compregnac 2019',
      photos: [
        '/2019-Compregnac-01_JPG.avif',
        '/2019-Compregnac-02.avif',
        '/2019-Compregnac-03_JPG.avif',
        '/2019-Compregnac-04_JPG.avif',
        '/2019-Compregnac-05_JPG.avif',
      ],
    },
    {
      title: 'Lapanouse',
      photos: [
        '/Lapanouse-LOkaZ-1_JPG.avif',
        '/Lapanouse-LOkaZ-2_JPG.avif',
        '/Lapanouse-LOkaZ-3.avif',
        '/Lapanouse-LOkaZ-4.avif',
        '/Lapanouse-LOkaZ-5.avif',
      ],
    },
    {
      title: 'Flavin',
      photos: [
        '/Legroupe-Lokaz-Flavin-0.avif',
        '/Legroupe-Lokaz-Flavin-1.avif',
        '/Legroupe-Lokaz-Flavin-2.avif',
      ],
    },
    {
      title: 'Saint Affrique - Glacier',
      photos: [
        '/LOkaZ-Glacier-Saint Affrique-1.avif',
        '/LOkaZ-Glacier-Saint Affrique-2.avif',
        '/LOkaZ-Glacier-Saint Affrique-3.avif',
      ],
    },
    {
      title: 'Concerts & Festivals',
      photos: [
        '/DSC_0138_JPG.avif',
        '/DSC_0142_JPG.avif',
        '/DSC_0166_JPG.avif',
        '/DSC_0184_JPG.avif',
        '/DSC_0206_JPG.avif',
        '/DSC_0209_JPG.avif',
        '/DSC_0216_JPG.avif',
        '/RoqNBrebis1.avif',
        '/RoqNBrebis2.avif',
      ],
    },
    {
      title: 'Événements Spéciaux',
      photos: [
        '/marche-gourmand.avif',
        '/tour_de_france.avif',
        '/tour_de_france2.avif.avif',
        '/verrieres-2019.avif',
        '/okfe1.avif',
        '/okfe2.avif',
        '/lokaz sous le viaduc.avif',
      ],
    },
  ];

  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);

  const handlePrevAlbum = () => {
    setCurrentAlbumIndex((prev) => (prev === 0 ? albums.length - 1 : prev - 1));
  };

  const handleNextAlbum = () => {
    setCurrentAlbumIndex((prev) => (prev === albums.length - 1 ? 0 : prev + 1));
  };

  const currentAlbum = albums[currentAlbumIndex];

  return (
    <section id="photos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          Photos
        </h2>
        <div className="w-24 h-1 bg-[#c0392b] mx-auto mb-12"></div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevAlbum}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Album précédent"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center flex-1">
              {currentAlbum.title}
            </h3>

            <button
              onClick={handleNextAlbum}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Album suivant"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {currentAlbum.photos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => onImageClick(photo)}
              >
                <img
                  src={photo}
                  alt={`${currentAlbum.title} - Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2">
            {albums.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAlbumIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentAlbumIndex
                    ? 'w-8 bg-[#c0392b]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à l'album ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotosSection;
