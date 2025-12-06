import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AdSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10">
      <div className="container mx-auto px-5">
        <div className="bg-accent rounded-xl p-5 text-center border-l-[5px] border-primary">
          <p className="font-semibold text-black not-italic text-lg">
            {t('adText')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdSection;