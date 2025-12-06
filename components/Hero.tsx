import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="pt-[180px] pb-[100px] bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

      <div className="container mx-auto px-5 relative z-10">
        <FadeIn className="max-w-[800px]">
          <h1 className="font-serif text-5xl md:text-6xl mb-5 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-[600px]">
            {t('heroSubtitle')}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-block bg-accent text-black px-10 py-4 rounded-full font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {t('heroCta')}
            </a>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;