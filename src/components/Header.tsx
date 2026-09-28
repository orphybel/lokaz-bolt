import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string, albumTitle?: string) => void;
}

const Header = ({ isMenuOpen, setIsMenuOpen, scrollToSection }: HeaderProps) => {

  const photoAlbums = [
    'Laissac 2025',
    'Fête de la Musique 2025',
    'Bal des Pompiers 2024',
    'Fête de la Musique 2024',
    'Bal des Pompiers 2023',
    'Okfe Millau 2022',
    'Marche Gourmand Millau 2020',
    'Fête de la Musique 2020',
    'Verrieres 2019',
    'St Rome de Cernon 2019',
    'Lapanouse de Cernon 2019',
    'Flavin 2019',
    'Compregnac 2019',
    'Fête de la Musique 2019',
    'Roq\'N Brebis 2018',
    'Tour de France 2018',
    'Le Glacier Saint Affrique'
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-ink/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="#accueil" className="whitespace-nowrap text-[2rem] font-black tracking-[-0.08em]" aria-label="L’OkaZ, accueil">
            L’OkaZ
            <span className="ml-3 inline-block align-middle text-xs tracking-[0.05em] text-acid">LIVE</span>
          </a>

          <nav className="hidden items-center gap-3 md:flex lg:gap-[22px]">
            <button
              onClick={() => scrollToSection('le-groupe')}
              className="text-xs font-medium text-gray-200 transition-colors hover:text-accent lg:text-sm"
            >
              Le groupe
            </button>
            <button
              onClick={() => scrollToSection('evenements')}
              className="text-xs font-medium text-gray-200 transition-colors hover:text-accent lg:text-sm"
            >
              Événements
            </button>
            <div
              className="relative group"
            >
              <button
                onClick={() => scrollToSection('photos')}
                className="flex items-center space-x-1 text-xs font-medium text-gray-200 transition-colors hover:text-accent lg:text-sm"
              >
                <span>Photos</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                <div className="max-h-96 w-64 overflow-y-auto border border-white/15 bg-[#252525] py-2">
                  {photoAlbums.map((album, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToSection('photos', album);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-accent"
                    >
                      {album}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('videos')}
              className="text-xs font-medium text-gray-200 transition-colors hover:text-accent lg:text-sm"
            >
              Vidéos
            </button>
            <button
              onClick={() => scrollToSection('la-presse')}
              className="text-xs font-medium text-gray-200 transition-colors hover:text-accent lg:text-sm"
            >
              La Presse
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-acid px-3 py-2 text-xs font-bold text-ink transition-colors hover:bg-accent lg:px-6 lg:text-sm"
            >
              Nous contacter
            </button>
          </nav>

          <button
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            className="text-gray-200 transition-colors hover:text-accent md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/15 bg-ink md:hidden">
          <nav className="max-h-[75vh] space-y-3 overflow-y-auto px-4 py-4">
            <button
              onClick={() => scrollToSection('le-groupe')}
              className="block w-full py-2 text-left font-medium text-gray-200 transition-colors hover:text-accent"
            >
              Le groupe
            </button>
            <button
              onClick={() => scrollToSection('evenements')}
              className="block w-full py-2 text-left font-medium text-gray-200 transition-colors hover:text-accent"
            >
              Événements
            </button>
            <button
              onClick={() => scrollToSection('photos')}
              className="block w-full py-2 text-left font-medium text-gray-200 transition-colors hover:text-accent"
            >
              Photos
            </button>
            <button
              onClick={() => scrollToSection('videos')}
              className="block w-full py-2 text-left font-medium text-gray-200 transition-colors hover:text-accent"
            >
              Vidéos
            </button>
            <button
              onClick={() => scrollToSection('la-presse')}
              className="block w-full py-2 text-left font-medium text-gray-200 transition-colors hover:text-accent"
            >
              La Presse
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full bg-acid px-6 py-2 text-left font-bold text-ink transition-colors hover:bg-accent"
            >
              Nous contacter
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
