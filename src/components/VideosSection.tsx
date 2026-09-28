import { Play } from 'lucide-react';
import SectionTitle from './SectionTitle';

const VideosSection = () => {

  const videos = [
    {
      title: 'LokaZ Millau 1 Août 2022 Proud Mary',
      thumbnail: 'https://i.ytimg.com/vi/KBiUkjqczRY/hqdefault.jpg',
      videoId: 'KBiUkjqczRY',
    },
    {
      title: 'LokaZ Millau 1 Août 2022 Hot Stuff',
      thumbnail: 'https://i.ytimg.com/vi/HBCz8yEM6LM/hqdefault.jpg',
      videoId: 'HBCz8yEM6LM',
    },
    {
      title: 'LokaZ Millau 1 Août 2022 Corazon Espinado',
      thumbnail: 'https://i.ytimg.com/vi/tOp3EK7AZbk/hqdefault.jpg',
      videoId: 'tOp3EK7AZbk',
    },
    {
      title: 'LokaZ Millau 1 Août 2022  Baila Morena',
      thumbnail: 'https://i.ytimg.com/vi/skIlb7jcl-E/hqdefault.jpg',
      videoId: 'skIlb7jcl-E',
    },
  ];

  return (
    <section id="videos" className="border-b border-white/15 bg-[#202020] py-[60px] md:py-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Vidéos</SectionTitle>

        <div className="grid grid-cols-1 gap-[35px] md:grid-cols-2">
          {videos.map((video, index) => (
            <a
              key={index}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-white/30"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                  <div className="transform rounded-full bg-pink p-4 transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 fill-ink text-ink" />
                  </div>
                </div>
              </div>
              <div className="py-5">
                <h3 className="text-lg font-semibold text-gray-100">{video.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
