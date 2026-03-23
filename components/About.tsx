import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-body">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Text Content */}
          <FadeIn className="flex-1">
            <h2 className="font-serif text-4xl mb-6 text-primary">{t('aboutSectionTitle')}</h2>
            <p className="text-lg text-text mb-8 leading-relaxed">
              {t('aboutDescription')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl shadow-sm border-l-4 border-accent">
                <h3 className="font-bold text-xl mb-2 text-primary">{t('aboutMissionTitle')}</h3>
                <p className="text-gray text-sm">{t('aboutMissionDesc')}</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border-l-4 border-secondary">
                <h3 className="font-bold text-xl mb-2 text-primary">{t('aboutVisionTitle')}</h3>
                <p className="text-gray text-sm">{t('aboutVisionDesc')}</p>
              </div>
            </div>
          </FadeIn>

          {/* Visual Element (Abstract representation since no images) */}
          <FadeIn delay={200} className="flex-1 w-full">
            <div className="relative h-[400px] w-full bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl overflow-hidden flex items-center justify-center p-10 border border-gray/10">
               <div className="text-[120px] text-primary/20 animate-pulse">
                  <i className="fas fa-users"></i>
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-custom max-w-[300px] text-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="text-4xl font-serif text-accent font-bold mb-2">2025</div>
                    <div className="text-gray font-medium uppercase tracking-widest text-sm">{t('contactFoundedTitle')}</div>
                  </div>
               </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;