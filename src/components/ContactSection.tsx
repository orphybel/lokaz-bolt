import { Mail, Facebook } from 'lucide-react';
import SectionTitle from './SectionTitle';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-accent py-[60px] text-ink md:py-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="text-ink">Nous contacter</SectionTitle>

        <div className="md:grid md:grid-cols-2 md:gap-x-[60px] md:gap-y-5">
          <h3 className="mb-5 text-[1.75rem] font-bold md:mb-0">
            Contactez-nous pour vos événements
          </h3>
          <p className="leading-[1.8]">
            Vous organisez un festival, un bal ou une soirée privée ?
            N'hésitez pas à nous contacter pour discuter de votre projet. Nous serons ravis
            de vous accompagner pour faire de votre événement un moment inoubliable.
          </p>

          <div className="mt-[30px] space-y-6 border-t border-ink/35 pt-[25px] md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:border-l md:border-t-0 md:pl-[50px] md:pt-0">
            <div className="flex items-start">
              <div className="mr-4 rounded-full border border-ink/40 p-3">
                <Mail className="h-6 w-6 text-ink" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Email</h4>
                <a
                  href="mailto:legroupe@lokaz.net"
                  className="text-lg underline underline-offset-[5px] [overflow-wrap:anywhere] hover:no-underline"
                >
                  legroupe@lokaz.net
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 rounded-full border border-ink/40 p-3">
                <Facebook className="h-6 w-6 text-ink" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Facebook</h4>
                <a
                  href="https://www.facebook.com/legroupe.lokaz.7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg underline underline-offset-[5px] [overflow-wrap:anywhere] hover:no-underline"
                >
                  Rejoignez-nous sur Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
