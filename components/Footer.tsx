
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <footer className="relative bg-black text-white pt-16 pb-8 overflow-hidden">
      {/* Background Logo Image */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url('/footer-logo.jpg')",
          backgroundPosition: "top center",
          backgroundSize: "min(400px, 90vw) auto",
          backgroundRepeat: "no-repeat"
        }}
      ></div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 relative z-10">
          {/* Brand */}
          <div>
            <div className="font-serif text-3xl mb-5">FlexiAura</div>
            <p className="mb-6 opacity-90">{t('footerMission')}</p>
            {t('contactInfo') && (
              <p className="mb-6 text-sm text-gray-400 border-l-2 border-accent pl-3 italic">
                {t('contactInfo')}
              </p>
            )}
            <div className="flex gap-4">
              {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map(icon => (
                <a key={icon} href="#" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white transition-all hover:bg-accent hover:-translate-y-1">
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl mb-5 font-semibold">{t('footerServicesTitle')}</h3>
            <ul className="list-none space-y-2">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <li key={num}>
                  <a href="#services" className="text-gray-300 hover:text-accent transition-colors decoration-0">
                    {t(`serviceTitle${num}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-xl mb-5 font-semibold">{t('footerPlatformsTitle')}</h3>
            <ul className="list-none space-y-2">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <li key={num}>
                  <a href="#platforms" className="text-gray-300 hover:text-accent transition-colors decoration-0">
                    {t(`platformTitle${num}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-5 font-semibold">{t('footerQuickLinksTitle')}</h3>
            <ul className="list-none space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-accent transition-colors decoration-0">{t('home')}</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-accent transition-colors decoration-0">{t('about')}</a></li>
              <li><a href="#games" className="text-gray-300 hover:text-accent transition-colors decoration-0">{t('gamesTitle')}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-accent transition-colors decoration-0">{t('contactTitle')}</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10 text-gray-400 text-sm relative z-10">
          {t('copyright')}
        </div>
      </div>

      {/* Admin Button in Footer */}
      <div className="absolute bottom-5 right-5 z-[100]">
        <button
          onClick={handleOpen}
          className="bg-card/50 backdrop-blur text-text border border-gray/20 rounded-full w-10 h-10 text-sm cursor-pointer hover:bg-accent hover:text-black transition-all flex items-center justify-center opacity-50 hover:opacity-100"
          title="Acesso Administrativo"
        >
          <i className="fas fa-lock"></i>
        </button>
      </div>

      {/* Admin Modal */}
      {isModalOpen && (
        isAuthenticated ? (
          <AdminDashboard onClose={handleClose} />
        ) : (
          <AdminLogin onClose={handleClose} />
        )
      )}
    </footer>
  );
};

export default Footer;