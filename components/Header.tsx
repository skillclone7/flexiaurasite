import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Language } from '../types';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileBtnRef.current &&
        !mobileBtnRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#home', labelKey: 'home' },
    { href: '#services', labelKey: 'servicesTitle' },
    { href: '#platforms', labelKey: 'platformsTitle' },
    { href: '#about', labelKey: 'about' },
    { href: '#games', labelKey: 'gamesTitle' },
    { href: '#contact', labelKey: 'contactTitle' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'zh', label: '中文 (Mandarim)' },
    { code: 'ar', label: 'العربية (Árabe)' },
  ];

  return (
    <header className="bg-card shadow-custom fixed w-full top-0 z-[1000] py-2 lg:py-4 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-5 flex justify-between items-center h-16 lg:h-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:gap-4 overflow-hidden">
          <img src="/header-logo.jpg" alt="FlexiAura" className="h-8 lg:h-12 w-auto object-contain" />
          <div className="flex flex-col justify-center">
            <div className="font-serif text-lg lg:text-2xl font-semibold text-primary leading-tight">FlexiAura</div>
            <div className="text-[10px] lg:text-xs text-gray tracking-widest whitespace-nowrap hidden sm:block">CONSULTORIA & INDÚSTRIA 2025</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text font-medium relative group transition-colors hover:text-accent"
            >
              {t(link.labelKey)}
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Controls & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="bg-transparent border-none text-text text-lg lg:text-xl cursor-pointer transition-colors hover:text-accent p-1"
          >
            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
          </button>

          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              aria-label="Select Language"
              className="bg-light-gray border-none px-2 py-1 lg:px-4 lg:py-2 rounded-full text-text font-medium cursor-pointer flex items-center gap-1 lg:gap-2 transition-colors hover:bg-accent hover:text-white text-sm lg:text-base"
            >
              <i className="fas fa-globe"></i>
              <span className="hidden md:inline">{t('langButtonText')}</span>
              <i className="fas fa-chevron-down text-xs lg:text-sm"></i>
            </button>
            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-card shadow-custom rounded-lg py-2 min-w-[140px] lg:min-w-[150px] z-[100]">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="px-4 lg:px-5 py-2 cursor-pointer transition-colors hover:bg-light-gray text-text text-sm lg:text-base"
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                  >
                    {lang.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileBtnRef}
            aria-label="Toggle Menu"
            className="lg:hidden text-xl bg-transparent border-none text-text cursor-pointer p-1 ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-[64px] left-0 w-full bg-card shadow-custom flex flex-col z-[999] border-t border-light-gray overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text font-medium hover:text-accent p-2 border-b border-light-gray last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;