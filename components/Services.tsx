import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    { icon: 'fa-chart-line', title: 'serviceTitle1', desc: 'serviceDesc1' },
    { icon: 'fa-code', title: 'serviceTitle2', desc: 'serviceDesc2' },
    { icon: 'fa-globe-americas', title: 'serviceTitle3', desc: 'serviceDesc3' },
    { icon: 'fa-shipping-fast', title: 'serviceTitle4', desc: 'serviceDesc4' },
    { icon: 'fa-bullhorn', title: 'serviceTitle5', desc: 'serviceDesc5' },
    { icon: 'fa-lightbulb', title: 'serviceTitle6', desc: 'serviceDesc6' },
  ];

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-5">
        <h2 className="font-serif text-4xl mb-5 text-primary text-center">{t('servicesTitle')}</h2>
        <p className="text-center text-gray max-w-[700px] mx-auto mb-16 text-lg">{t('servicesSubtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 100} className="h-full">
              <div className="bg-card rounded-2xl p-10 shadow-custom text-center transition-all hover:-translate-y-2 hover:shadow-xl h-full">
                <div className="text-5xl text-accent mb-6">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3 className="text-2xl mb-4 text-primary font-semibold">{t(service.title)}</h3>
                <p className="text-text">{t(service.desc)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;