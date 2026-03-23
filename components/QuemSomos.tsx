import React from 'react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const QuemSomos: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-body">
      <div className="container mx-auto px-5">
        {/* Header Section */}
        <FadeIn className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-primary">{t('quemSomos')}</h1>
          <p className="text-xl text-gray max-w-3xl mx-auto leading-relaxed">
            {t('quemSomosSubtitle')}
          </p>
        </FadeIn>

        {/* Área Executiva */}
        <div className="mb-24">
          <FadeIn className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-serif text-primary whitespace-nowrap">{t('execArea')}</h2>
            <div className="h-px bg-gradient-to-r from-accent/50 to-transparent w-full"></div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Clésio L. Rosário José */}
            <FadeIn delay={100} className="group">
              <div className="bg-card hover:bg-card/80 transition-all duration-500 rounded-3xl p-8 md:p-10 border border-gray/10 shadow-xl relative overflow-hidden h-full flex flex-col md:flex-row gap-8 items-center md:items-start group-hover:border-accent/30 group-hover:translate-y-[-5px]">
                {/* Visual Placeholder for Photo */}
                <div className="w-48 h-64 shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-gray/10 overflow-hidden relative">
                  <img src="/dist/fotos/clesio.png" alt="Clésio L. Rosário José" className="w-full h-full object-cover" title="CEO Clesio" />
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text mb-1">Clésio L. Rosário José</h3>
                    <p className="text-accent font-medium uppercase tracking-widest text-sm">{t('ceoTitle')}</p>
                  </div>
                  <p className="text-gray text-base leading-relaxed mb-6">
                    {t('ceoBio')}
                  </p>
                  <p className="text-gray/80 text-sm italic border-l-2 border-accent/30 pl-4 py-1">
                    {t('ceoQuote')}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Cláudio Pedro Domingos Sequeira Gaspar */}
            <FadeIn delay={200} className="group">
              <div className="bg-card hover:bg-card/80 transition-all duration-500 rounded-3xl p-8 md:p-10 border border-gray/10 shadow-xl relative overflow-hidden h-full flex flex-col md:flex-row gap-8 items-center md:items-start group-hover:border-accent/30 group-hover:translate-y-[-5px]">
                {/* Visual Placeholder for Photo */}
                <div className="w-48 h-64 shrink-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center border border-gray/10 overflow-hidden relative">
                  <img src="/dist/fotos/claudio%20jpg.jpeg" alt="Cláudio Pedro Domingos Sequeira Gaspar" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text mb-1">Cláudio Pedro Domingos Sequeira Gaspar</h3>
                    <p className="text-accent font-medium uppercase tracking-widest text-sm">{t('vceoTitle')}</p>
                  </div>
                  <p className="text-gray text-base leading-relaxed mb-6">
                    {t('vceoBio')}
                  </p>
                  <p className="text-gray/80 text-sm italic border-l-2 border-accent/30 pl-4 py-1">
                    {t('vceoQuote')}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Área Diretiva */}
        <div className="mb-24">
          <FadeIn className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-serif text-primary whitespace-nowrap">{t('dirArea')}</h2>
            <div className="h-px bg-gradient-to-r from-secondary/50 to-transparent w-full"></div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Melquesidec Gerónimo Mondo */}
            <FadeIn delay={100} className="bg-card/50 hover:bg-card transition-all duration-300 rounded-3xl p-8 border border-gray/5 flex flex-col items-center text-center group shadow-lg">
              <div className="w-44 h-44 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/5 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
                <img src="/dist/fotos/MELKE%20-%20Copy.jpeg" alt="Melquesidec Gerónimo Mondo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-2">Melquesidec Gerónimo Mondo</h3>
              <p className="text-accent text-sm uppercase tracking-widest mb-6 font-semibold">{t('logisticsDirTitle')}</p>
              <p className="text-gray text-base leading-relaxed">
                {t('logisticsDirBio')}
              </p>
            </FadeIn>

            {/* Joaquim Magalhães Oliveira */}
            <FadeIn delay={200} className="bg-card/50 hover:bg-card transition-all duration-300 rounded-3xl p-8 border border-gray/5 flex flex-col items-center text-center group shadow-lg">
              <div className="w-44 h-44 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 border border-secondary/5 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
                <img src="/dist/fotos/IMG-20260323-WA0009.jpg" alt="Joaquim Magalhães Oliveira" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-2">Joaquim Magalhães Oliveira</h3>
              <p className="text-accent text-sm uppercase tracking-widest mb-6 font-semibold">{t('flexihelpDirTitle')}</p>
              <p className="text-gray text-base leading-relaxed">
                {t('flexihelpDirBio')}
              </p>
            </FadeIn>

            {/* Paulo JR Gomes */}
            <FadeIn delay={300} className="bg-card/50 hover:bg-card transition-all duration-300 rounded-3xl p-8 border border-gray/5 flex flex-col items-center text-center group shadow-lg">
              <div className="w-44 h-44 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-accent/5 group-hover:scale-110 transition-transform overflow-hidden shadow-inner">
                <img src="/dist/fotos/fitty.png" alt="Paulo Gomes" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-2">Paulo Gomes</h3>
              <p className="text-accent text-sm uppercase tracking-widest mb-6 font-semibold">{t('agentSpecialist')}</p>
              <p className="text-gray text-base leading-relaxed">
                {t('procurementMgrBio')}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Área de Gerência */}
        <div>
          <FadeIn className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-serif text-primary whitespace-nowrap">{t('mgmtArea')}</h2>
            <div className="h-px bg-gradient-to-r from-gray/30 to-transparent w-full"></div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Vladmilson Manuel Gama */}
            <FadeIn delay={100} className="group">
              <div className="bg-card hover:bg-card/80 transition-all duration-500 rounded-3xl p-8 md:p-10 border border-gray/10 shadow-xl relative overflow-hidden h-full flex flex-col md:flex-row gap-8 items-center md:items-start group-hover:border-accent/30 group-hover:translate-y-[-5px]">
                <div className="w-48 h-64 shrink-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center border border-gray/10 overflow-hidden relative shadow-md">
                  <img src="/dist/fotos/vladmilson.jpg" alt="Vladmilson Manuel Gama" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text mb-1">Vladmilson Manuel</h3>
                    <p className="text-accent font-medium uppercase tracking-widest text-sm">{t('flexihelpMgrTitle')}</p>
                  </div>
                  <p className="text-gray text-base leading-relaxed">
                    {t('vladGamaBio')}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Marcio Lopes */}
            <FadeIn delay={200} className="group">
              <div className="bg-card hover:bg-card/80 transition-all duration-500 rounded-3xl p-8 md:p-10 border border-gray/10 shadow-xl relative overflow-hidden h-full flex flex-col md:flex-row gap-8 items-center md:items-start group-hover:border-accent/30 group-hover:translate-y-[-5px]">
                <div className="w-48 h-64 shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border border-gray/10 overflow-hidden relative shadow-md">
                  <img src="/dist/fotos/marcio.jpg" alt="Marcio Lopes" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text mb-1">Márcio Lopes</h3>
                    <p className="text-accent font-medium uppercase tracking-widest text-sm">{t('fleximarketMgrTitle')}</p>
                  </div>
                  <p className="text-gray text-base leading-relaxed">
                    {t('marcioLopesBio')}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors py-3 px-8 rounded-full border border-accent/30 hover:bg-accent"
        >
          <i className="fas fa-arrow-left"></i>
          {t('backToHome')}
        </a>
      </div>
    </div>
  );
};

export default QuemSomos;
