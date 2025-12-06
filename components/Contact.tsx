import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      title: 'contactLocationTitle',
      icon: 'fa-map-marker-alt',
      items: [
        { icon: 'fa-map-pin', label: 'locationAddressTitle', value: 'locationAddress' },
        { 
          icon: 'fa-clock', 
          label: 'locationHoursTitle', 
          multiValue: ['locationHours1', 'locationHours2'] 
        },
      ]
    },
    {
      title: 'contactPhoneCardTitle',
      icon: 'fa-phone-alt',
      items: [
        { icon: 'fa-phone', label: 'contactPhoneTitle', rawValue: '929 294 029' },
        { icon: 'fa-envelope', label: 'contactEmailTitle', rawValue: 'info@flexiaura.com' },
        { icon: 'fa-calendar-alt', label: 'contactFoundedTitle', rawValue: '2025' },
      ]
    },
    {
      title: 'contactCoreBusinessTitle',
      icon: 'fa-briefcase',
      coreBusiness: [
        'coreBusiness1',
        'coreBusiness2',
        'coreBusiness3',
        'coreBusiness4',
        'coreBusiness5',
      ]
    }
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-5">
        <h2 className="font-serif text-4xl mb-5 text-primary text-center">{t('contactTitle')}</h2>
        <p className="text-center text-gray max-w-[700px] mx-auto mb-10 text-lg">{t('contactSubtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="bg-card rounded-2xl p-10 shadow-custom h-full">
                <h3 className="text-2xl mb-6 text-primary flex items-center gap-3">
                  <i className={`fas ${card.icon} rtl-flip`}></i>
                  <span>{t(card.title)}</span>
                </h3>

                <ul className="list-none">
                  {card.items?.map((item, idx) => (
                    <li key={idx} className="mb-4 flex items-start gap-4">
                      <i className={`fas ${item.icon} mt-1 text-accent fa-fw rtl-flip`} style={{ width: '1.25em' }}></i>
                      <div>
                        <strong className="block">{t(item.label)}</strong>
                        {item.value && <span>{t(item.value)}</span>}
                        {item.rawValue && <span>{item.rawValue}</span>}
                        {item.multiValue && item.multiValue.map((v, i) => (
                            <React.Fragment key={i}>
                                <span>{t(v)}</span><br/>
                            </React.Fragment>
                        ))}
                      </div>
                    </li>
                  ))}

                  {card.coreBusiness?.map((key, idx) => (
                     <li key={idx} className="mb-4 flex items-start gap-4">
                        <i className="fas fa-check-circle mt-1 text-accent fa-fw rtl-flip" style={{ width: '1.25em' }}></i>
                        <div>{t(key)}</div>
                     </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;