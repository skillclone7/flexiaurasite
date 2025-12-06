import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const Platforms: React.FC = () => {
  const { t } = useLanguage();

  const platforms = [
    { icon: 'fa-shopping-cart', title: 'platformTitle1', desc: 'platformDesc1' },
    { icon: 'fa-graduation-cap', title: 'platformTitle2', desc: 'platformDesc2' },
    { icon: 'fa-book-open', title: 'platformTitle3', desc: 'platformDesc3' },
    { icon: 'fa-video', title: 'platformTitle4', desc: 'platformDesc4' },
    { icon: 'fa-dice', title: 'platformTitle5', desc: 'platformDesc5' },
    { icon: 'fa-money-bill-wave', title: 'platformTitle6', desc: 'platformDesc6' },
  ];

  return (
    <section id="platforms" className="py-24 bg-light-gray">
      <div className="container mx-auto px-5">
        <h2 className="font-serif text-4xl mb-5 text-primary text-center">{t('platformsTitle')}</h2>
        <p className="text-center text-gray max-w-[700px] mx-auto mb-16 text-lg">{t('platformsSubtitle')}</p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {platforms.map((platform, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="bg-card rounded-2xl p-6 w-[200px] text-center shadow-custom transition-all hover:-translate-y-2 h-full">
                <div className="text-4xl mb-4 text-secondary">
                  <i className={`fas ${platform.icon}`}></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(platform.title)}</h3>
                <p className="text-sm text-text">{t(platform.desc)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;