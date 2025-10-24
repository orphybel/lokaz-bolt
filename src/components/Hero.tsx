interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
  return (
    <section className="relative h-screen flex flex-col text-white">
      <div className="relative z-10 pt-24 px-4 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
          L'OkaZ
        </h1>
      </div>

      <div className="flex-1 relative flex items-end">
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/Affiche_groupe_foule.png)',
            backgroundSize: '200%',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pb-16 w-full">
          <p className="text-base md:text-xl mb-2">
            Valentine, Pier-O, Laurent, Teddy et PH
          </p>
          <p className="text-sm md:text-lg mb-6 max-w-2xl mx-auto">
            Groupe de musique variété française et internationale basé en Aveyron.
            Nous animons vos soirées, festivals et événements avec énergie et passion.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#c0392b] text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-[#a02e23] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
