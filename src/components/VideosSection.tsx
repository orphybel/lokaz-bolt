import { Play } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

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
            <Reveal key={index} delay={(index % 2) * 120}>
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Lecture"
                className="group block border-b border-white/30 transition-colors duration-300 hover:border-accent"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-colors duration-300 group-hover:bg-opacity-50 flex items-center justify-center">
                    <div className="rounded-full bg-accent p-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]">
                      <Play className="h-8 w-8 fill-ink text-ink" />
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <h3 className="text-lg font-semibold text-gray-100 transition-colors duration-300 group-hover:text-accent">{video.title}</h3>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
