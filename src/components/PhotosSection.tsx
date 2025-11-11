import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotosSectionProps {
  onImageClick: (imageUrl: string) => void;
  selectedAlbum?: string;
}

const PhotosSection = ({ onImageClick, selectedAlbum }: PhotosSectionProps) => {
  const albums = [
    {
      title: 'Laissac 2025',
      photos: [
        '/Laissac_2025-1.jpeg',
        '/Laissac_2025-2.jpeg',
        '/Laissac_2025-3.jpeg',
        '/Laissac_2025-4.jpeg',
      ],
    },
    {
      title: 'Fête de la Musique 2025',
      photos: [
        '/Fete_de_la_Musique_2025-1.jpeg',
        '/Fete_de_la_Musique_2025-2.jpeg',
      ],
    },
    {
      title: 'Bal des Pompiers 2024',
      photos: [
        '/Bal_des_Pompiers_2024-1.jpeg',
        '/Bal_des_Pompiers_2024-2.jpeg',
        '/Bal_des_Pompiers_2024-3.jpeg',
      ],
    },
    {
      title: 'Fête de la Musique 2024',
      photos: [
        '/Fete_de_la_Musique_2024-1.jpeg',
        '/Fete_de_la_Musique_Millau_2024-2.jpg',
        '/Fete_de_la_Musique_2024-3.jpeg',
        '/Fete_de_la_Musique_2024-4.jpeg',
        '/Fete_de_la_Musique_2024-5.jpeg',
        '/Fete_de_la_Musique_2024-6.jpeg',
        '/Fete_de_la_Musique_2024-7.jpeg',
      ],
    },
    {
      title: 'Bal des Pompiers 2023',
      photos: [
        '/Bal_des_Pompiers_2023-1.avif',
        '/Bal_des_Pompiers_2023-2.avif',
      ],
    },
    {
      title: 'Okfe Millau 2022',
      photos: [
        '/Okfe_Millau_2022-1.avif',
        '/Okfe_Millau_2022-2.avif',
      ],
    },
    {
      title: 'Marche Gourmand Millau 2020',
      photos: [
        '/Marche_Gourmand_Millau_20202-1.avif',
        '/Marche_Gourmand_Millau_20202-2.avif',
      ],
    },
    {
      title: 'Fête de la Musique 2020',
      photos: [
        '/Fete_de_la_Musqiue_2020-1.avif',
        '/Fete_de_la_Musqiue_2020-2.avif',
        '/Fete_de_la_Musqiue_2020-3.avif',
      ],
    },
    {
      title: 'Verrieres 2019',
      photos: [
        '/verrieres_2019-1.avif',
      ],
    },
    {
      title: 'St Rome de Cernon 2019',
      photos: [
        '/St_Rome_de_Cernon_2019-1.avif',
        '/St_Rome_de_Cernon_2019-2.avif',
        '/St_Rome_de_Cernon_2019-3.avif',
        '/St_Rome_de_Cernon_2019-4.avif',
        '/St_Rome_de_Cernon_2019-5.avif',
        '/St_Rome_de_Cernon_2019-6.avif',
        '/St_Rome_de_Cernon_2019-7.avif',
      ],
    },
    {
      title: 'Lapanouse de Cernon 2019',
      photos: [
        '/Lapanouse_de_Cernon_2019-1.avif',
        '/Lapanouse_de_Cernon_2019-2.avif',
        '/Lapanouse_de_Cernon_2019-3.avif',
        '/Lapanouse_de_Cernon_2019-4.avif',
        '/Lapanouse_de_Cernon_2019-5.avif',
      ],
    },
    {
      title: 'Flavin 2019',
      photos: [
        '/Flavin_2019-1.avif',
        '/Flavin_2019-2.avif',
        '/Flavin_2019-3.avif',
      ],
    },
    {
      title: 'Compregnac 2019',
      photos: [
        '/Compregnac_2019-1.avif',
        '/Compregnac_2019-2.avif',
        '/Compregnac_2019-3.avif',
        '/Compregnac_2019-4.avif',
        '/Compregnac_2019-5.avif',
      ],
    },
    {
      title: 'Fête de la Musique 2019',
      photos: [
        '/Fete_de_la_musique_2019-1.avif',
        '/Fete_de_la_musique_2019-2.avif',
        '/Fete_de_la_musique_2019-3.avif',
        '/Fete_de_la_musique_2019-4.avif',
        '/Fete_de_la_musique_2019-5.avif',
        '/Fete_de_la_musique_2019-6.avif',
        '/Fete_de_la_musique_2019-7.avif',
      ],
    },
    {
      title: 'Roq\'N Brebis 2018',
      photos: [
        '/RoqN_Brebis_2018-1.avif',
        '/RoqN_Brebis_2018-2.avif',
      ],
    },
    {
      title: 'Tour de France 2018',
      photos: [
        '/Tour_de_France_2018-1.avif',
        '/Tour_de_France_2018-2.avif',
        '/Tour_de_France_2018-3.avif',
        '/Tour_de_France_2018-4.avif',
        '/Tour_de_France_2018-5.avif',
        '/Tour_de_France_2018-6.avif',
      ],
    },
    {
      title: 'Le Glacier Saint Affrique',
      photos: [
        '/Le_Glacier_Saint_Affrique-1.avif',
        '/Le_Glacier_Saint_Affrique-2.avif',
        '/Le_Glacier_Saint_Affrique-3.avif',
      ],
    },
  ];

  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(() => {
    if (selectedAlbum) {
      const index = albums.findIndex(album => album.title === selectedAlbum);
      return index !== -1 ? index : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (selectedAlbum) {
      const index = albums.findIndex(album => album.title === selectedAlbum);
      if (index !== -1) {
        setCurrentAlbumIndex(index);
      }
    }
  }, [selectedAlbum]);

  const handlePrevAlbum = () => {
    setCurrentAlbumIndex((prev) => (prev === 0 ? albums.length - 1 : prev - 1));
  };

  const handleNextAlbum = () => {
    setCurrentAlbumIndex((prev) => (prev === albums.length - 1 ? 0 : prev + 1));
  };

  const currentAlbum = albums[currentAlbumIndex];

  return (
    <section id="photos" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-100 mb-4">
          Photos
        </h2>
        <div className="w-24 h-1 bg-[#c0392b] mx-auto mb-12"></div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevAlbum}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="Album précédent"
            >
              <ChevronLeft className="h-6 w-6 text-gray-200" />
            </button>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 text-center flex-1">
              {currentAlbum.title}
            </h3>

            <button
              onClick={handleNextAlbum}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="Album suivant"
            >
              <ChevronRight className="h-6 w-6 text-gray-200" />
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
