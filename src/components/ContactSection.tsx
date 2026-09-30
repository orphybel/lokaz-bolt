import { Mail, Facebook } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

const ContactSection = () => {
  const channels = [
    {
      icon: Mail,
      label: 'Email',
      text: 'legroupe@lokaz.net',
      href: 'mailto:legroupe@lokaz.net',
      external: false,
    },
    {
      icon: Facebook,
      label: 'Facebook',
      text: 'Rejoignez-nous sur Facebook',
      href: 'https://www.facebook.com/legroupe.lokaz.7',
      external: true,
    },
  ];

  return (
    <section id="contact" className="overflow-x-clip bg-accent py-[60px] text-ink md:py-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="text-ink">Nous contacter</SectionTitle>

        <div className="md:grid md:grid-cols-2 md:gap-x-[60px] md:gap-y-5">
          <Reveal as="h3" className="mb-5 text-[1.75rem] font-bold md:mb-0">
            Contactez-nous pour vos événements
          </Reveal>
          <Reveal as="p" delay={100} className="leading-[1.8]">
            Vous organisez un festival, un bal ou une soirée privée ?
            N'hésitez pas à nous contacter pour discuter de votre projet. Nous serons ravis
            de vous accompagner pour faire de votre événement un moment inoubliable.
          </Reveal>

          <Reveal
            variant="right"
            delay={150}
            className="mt-[30px] space-y-6 border-t border-ink/35 pt-[25px] md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:border-l md:border-t-0 md:pl-[50px] md:pt-0"
          >
            {channels.map(({ icon: Icon, label, text, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-start"
              >
                <span className="mr-4 rounded-full border border-ink/40 p-3 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:border-ink group-hover:bg-ink">
                  <Icon className="h-6 w-6 text-ink transition-colors duration-300 group-hover:text-acid" />
                </span>
                <span>
                  <span className="mb-1 block font-semibold">{label}</span>
                  <span className="text-lg underline underline-offset-[5px] [overflow-wrap:anywhere] group-hover:no-underline">
                    {text}
                  </span>
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
