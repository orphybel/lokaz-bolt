import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string, albumTitle?: string) => void;
}

const Header = ({ isMenuOpen, setIsMenuOpen, scrollToSection }: HeaderProps) => {
  const [showPhotosSubmenu, setShowPhotosSubmenu] = useState(false);

  const photoAlbums = [
    'Laissac 2025',
    'Fête de la Musique 2025',
    'Bal des Pompiers 2024',
    'Fête de la Musique 2024',
    'Bal des Pompiers 2023',
    'Okfé Millau 2022',
    'Marché Gourmand Millau 2020',
    'Fête de la Musique 2020',
    'Verrières 2019',
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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo-okaz-noir.avif" alt="L'OkaZ" className="h-36" />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('le-groupe')}
              className="text-gray-700 hover:text-[#c0392b] transition-colors font-medium"
            >
              Le groupe
            </button>
            <button
              onClick={() => scrollToSection('evenements')}
              className="text-gray-700 hover:text-[#c0392b] transition-colors font-medium"
            >
              Événements
            </button>
            <div
              className="relative"
              onMouseEnter={() => setShowPhotosSubmenu(true)}
              onMouseLeave={() => setShowPhotosSubmenu(false)}
            >
              <button
                onClick={() => scrollToSection('photos')}
                className="text-gray-700 hover:text-[#c0392b] transition-colors font-medium flex items-center space-x-1"
              >
                <span>Photos</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showPhotosSubmenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 max-h-96 overflow-y-auto">
                  {photoAlbums.map((album, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToSection('photos', album);
                        setShowPhotosSubmenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c0392b] transition-colors"
                    >
                      {album}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => scrollToSection('videos')}
              className="text-gray-700 hover:text-[#c0392b] transition-colors font-medium"
            >
              Vidéos
            </button>
            <button
              onClick={() => scrollToSection('la-presse')}
              className="text-gray-700 hover:text-[#c0392b] transition-colors font-medium"
            >
              La Presse
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#c0392b] text-white px-6 py-2 rounded-md hover:bg-[#a02e23] transition-colors font-medium"
            >
              Nous contacter
            </button>
          </nav>

          <button
            className="md:hidden text-gray-700 hover:text-[#c0392b] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('le-groupe')}
              className="block w-full text-left text-gray-700 hover:text-[#c0392b] transition-colors font-medium py-2"
            >
              Le groupe
            </button>
            <button
              onClick={() => scrollToSection('evenements')}
              className="block w-full text-left text-gray-700 hover:text-[#c0392b] transition-colors font-medium py-2"
            >
              Événements
            </button>
            <button
              onClick={() => scrollToSection('photos')}
              className="block w-full text-left text-gray-700 hover:text-[#c0392b] transition-colors font-medium py-2"
            >
              Photos
            </button>
            <button
              onClick={() => scrollToSection('videos')}
              className="block w-full text-left text-gray-700 hover:text-[#c0392b] transition-colors font-medium py-2"
            >
              Vidéos
            </button>
            <button
              onClick={() => scrollToSection('la-presse')}
              className="block w-full text-left text-gray-700 hover:text-[#c0392b] transition-colors font-medium py-2"
            >
              La Presse
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left bg-[#c0392b] text-white px-6 py-2 rounded-md hover:bg-[#a02e23] transition-colors font-medium"
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
