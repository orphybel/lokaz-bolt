import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotosSectionProps {
  onImageClick: (imageUrl: string) => void;
}

const PhotosSection = ({ onImageClick }: PhotosSectionProps) => {
  const albums = [
    {
      title: 'Bal des Pompiers 2023',
      photos: [
        '/Bal-pompiers-millau-lokaz-1.avif',
        '/Bal-pompiers-millau-lokaz-2.avif',
      
       
      ],
    },
    {
      title: 'Marché Gourmand à Millau 2022',
      photos: [
        'https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1481308/pexels-photo-1481308.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      title: 'Festival d\'été 2022',
      photos: [
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      title: 'Concert de Noël 2021',
      photos: [
        'https://images.pexels.com/photos/1820563/pexels-photo-1820563.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1449791/pexels-photo-1449791.jpeg?auto=compress&cs=tinysrgb&w=800',
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
