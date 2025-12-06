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
    <header className="bg-card shadow-custom fixed w-full top-0 z-[1000] py-4 transition-all duration-300">
      <div className="container mx-auto px-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src="/header-logo.jpg" alt="FlexiAura" className="h-12 w-auto" />
          <div>
            <div className="font-serif text-2xl font-semibold text-primary">FlexiAura</div>
            <div className="text-xs text-gray tracking-widest">CONSULTORIA & INDÚSTRIA 2025</div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={mobileBtnRef}
          className="lg:hidden text-2xl bg-transparent border-none text-text cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

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

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="bg-transparent border-none text-text text-xl cursor-pointer transition-colors hover:text-accent"
          >
            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
          </button>

          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="bg-light-gray border-none px-4 py-2 rounded-full text-text font-medium cursor-pointer flex items-center gap-2 transition-colors hover:bg-accent hover:text-white"
            >
              <i className="fas fa-globe"></i>
              <span>{t('langButtonText')}</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-card shadow-custom rounded-lg py-2 min-w-[150px] z-[100]">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="px-5 py-2 cursor-pointer transition-colors hover:bg-light-gray text-text"
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed top-[80px] left-0 w-full bg-card p-5 shadow-custom flex flex-col gap-4 z-[999] border-t border-light-gray"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text font-medium hover:text-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;