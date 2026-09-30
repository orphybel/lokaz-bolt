import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

interface Album {
  title: string;
  photos: string[];
  // Identifiant YouTube d'un extrait joué directement dans l'album.
  videoId?: string;
}

interface PhotosSectionProps {
  onImageClick: (imageUrl: string) => void;
  selectedAlbum?: string;
}

const PhotosSection = ({ onImageClick, selectedAlbum }: PhotosSectionProps) => {
  const albums: Album[] = [
    {
      title: 'Marchés Gourmands 2026',
      videoId: 'aiTQ_Go8aRc',
      photos: [
        '/Marches Gourmands 2026-1.webp',
        '/Marches Gourmands 2026-2.webp',
        '/Marches Gourmands 2026-3.webp',
        '/Marches Gourmands 2026-4.webp',
        '/Marches Gourmands 2026-5.webp',
        '/Marches Gourmands 2026-6.webp',
        '/Marches Gourmands 2026-7.webp',
        '/Marches Gourmands 2026-8.webp',
      ],
    },
    {
      title: 'Laissac 2025',
      photos: [
        '/Laissac 2025-1.jpeg',
        '/Laissac 2025-2.jpeg',
        '/Laissac 2025-3.jpeg',
        '/Laissac 2025-4.jpeg',
      ],
    },
    {
      title: 'Fête de la Musique 2025',
      photos: [
        '/Fete de la Musique 2025-1.jpeg',
        '/Fete de la Musique 2025-2.jpeg',
      ],
    },
    {
      title: 'Bal des Pompiers 2024',
      photos: [
        '/Bal des Pompiers 2024-1.jpeg',
        '/Bal des Pompiers 2024-2.jpeg',
        '/Bal des Pompiers 2024-3.jpeg',
      ],
    },
    {
      title: 'Fête de la Musique 2024',
      photos: [
        '/Fete de la Musique 2024-1.jpeg',
        '/Fete de la Musique Millau 2024-2.jpg',
        '/Fete de la Musique 2024-3.jpeg',
        '/Fete de la Musique 2024-4.jpeg',
        '/Fete de la Musique 2024-5.jpeg',
        '/Fete de la Musique 2024-6.jpeg',
        '/Fete de la Musique 2024-7.jpeg',
      ],
    },
    {
      title: 'Bal des Pompiers 2023',
      photos: [
        '/Bal des Pompiers 2023-1.avif',
        '/Bal des Pompiers 2023-2.avif',
      ],
    },
    {
      title: 'Okfe Millau 2022',
      photos: [
        '/Okfe Millau 2022-1.avif',
        '/Okfe Millau 2022-2.avif',
      ],
    },
    {
      title: 'Marche Gourmand Millau 2020',
      photos: [
        '/Marche Gourmand Millau 20202-1.avif',
        '/Marche Gourmand Millau 20202-2.avif',
      ],
    },
    {
      title: 'Fête de la Musique 2020',
      photos: [
        '/Fete de la Musqiue 2020-1.avif',
        '/Fete de la Musqiue 2020-2.avif',
        '/Fete de la Musqiue 2020-3.avif',
      ],
    },
    {
      title: 'Verrieres 2019',
      photos: [
        '/verrieres 2019-1.avif',
      ],
    },
    {
      title: 'St Rome de Cernon 2019',
      photos: [
        '/St Rome de Cernon 2019-1.avif',
        '/St Rome de Cernon 2019-2.avif',
        '/St Rome de Cernon 2019-3.avif',
        '/St Rome de Cernon 2019-4.avif',
        '/St Rome de Cernon 2019-5.avif',
        '/St Rome de Cernon 2019-6.avif',
        '/St Rome de Cernon 2019-7.avif',
      ],
    },
    {
      title: 'Lapanouse de Cernon 2019',
      photos: [
        '/Lapanouse de Cernon 2019-1.avif',
        '/Lapanouse de Cernon 2019-2.avif',
        '/Lapanouse de Cernon 2019-3.avif',
        '/Lapanouse de Cernon 2019-4.avif',
        '/Lapanouse de Cernon 2019-5.avif',
      ],
    },
    {
      title: 'Flavin 2019',
      photos: [
        '/Flavin 2019-1.avif',
        '/Flavin 2019-2.avif',
        '/Flavin 2019-3.avif',
      ],
    },
    {
      title: 'Compregnac 2019',
      photos: [
        '/Compregnac 2019-1.avif',
        '/Compregnac 2019-2.avif',
        '/Compregnac 2019-3.avif',
        '/Compregnac 2019-4.avif',
        '/Compregnac 2019-5.avif',
      ],
    },
    {
      title: 'Fête de la Musique 2019',
      photos: [
        '/Fete de la musique 2019-1.avif',
        '/Fete de la musique 2019-2.avif',
        '/Fete de la musique 2019-3.avif',
        '/Fete de la musique 2019-4.avif',
        '/Fete de la musique 2019-5.avif',
        '/Fete de la musique 2019-6.avif',
        '/Fete de la musique 2019-7.avif',
      ],
    },
    {
      title: 'Roq\'N Brebis 2018',
      photos: [
        '/RoqN Brebis 2018-1.avif',
        '/RoqN Brebis 2018-2.avif',
      ],
    },
    {
      title: 'Tour de France 2018',
      photos: [
        '/Tour de France 2018-1.avif',
        '/Tour de France 2018-2.avif',
        '/Tour de France 2018-3.avif',
        '/Tour de France 2018-4.avif',
        '/Tour de France 2018-5.avif',
        '/Tour de France 2018-6.avif',
      ],
    },
    {
      title: 'Le Glacier Saint Affrique',
      photos: [
        '/Le Glacier Saint Affrique-1.avif',
        '/Le Glacier Saint Affrique-2.avif',
        '/Le Glacier Saint Affrique-3.avif',
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
    <section id="photos" className="border-b border-white/15 bg-ink py-[60px] md:py-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="text-accent">Photos</SectionTitle>

        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevAlbum}
              className="group rounded-full bg-[#252525] p-2 transition hover:bg-accent active:scale-90"
              aria-label="Album précédent"
            >
              <ChevronLeft className="h-6 w-6 text-gray-200 transition-transform group-hover:-translate-x-0.5 group-hover:text-ink" />
            </button>

            <h3
              key={currentAlbum.title}
              aria-live="polite"
              className="flex-1 animate-[fade-up_0.45s_var(--ease-out)_both] px-2.5 text-center text-xl font-bold text-gray-100 md:text-3xl">
              {currentAlbum.title}
            </h3>

            <button
              onClick={handleNextAlbum}
              className="group rounded-full bg-[#252525] p-2 transition hover:bg-accent active:scale-90"
              aria-label="Album suivant"
            >
              <ChevronRight className="h-6 w-6 text-gray-200 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
            </button>
          </div>

          {currentAlbum.videoId && (
            <div
              key={currentAlbum.videoId}
              className="mx-auto mb-6 aspect-video max-w-4xl overflow-hidden animate-[fade-up_0.6s_var(--ease-out)_both]"
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentAlbum.videoId}?rel=0`}
                title={`${currentAlbum.title} - Vidéo`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          )}

          <div className="mb-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {currentAlbum.photos.map((photo, index) => (
              // Clé liée à la photo : changer d'album remonte les vignettes et rejoue leur entrée en cascade.
              <div
                key={photo}
                role="button"
                data-cursor="Agrandir"
                tabIndex={0}
                aria-label={`Agrandir ${currentAlbum.title}, photo ${index + 1}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onImageClick(photo); } }}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden animate-[fade-up_0.6s_var(--ease-out)_both]"
                style={{ animationDelay: `${index * 70}ms` }}
                onClick={() => onImageClick(photo)}
              >
                <img
                  src={photo}
                  alt={`${currentAlbum.title} - Photo ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {albums.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAlbumIndex(index)}
                className={`h-3.5 rounded-full transition-all ${
                  index === currentAlbumIndex
                    ? 'w-8 bg-accent'
                    : 'w-3.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à l'album ${index + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PhotosSection;
