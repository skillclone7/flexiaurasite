
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DICTIONARY } from '../constants';
import { ContentData, Language, Video } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  customContent: ContentData;
  updateCustomContent: (data: Partial<ContentData>) => void;
  addVideo: (video: Video) => void;
  removeVideo: (id: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Initial default videos
const defaultVideos: Video[] = [];

const initialContent: ContentData = {
  heroTitle: "",
  heroSubtitle: "",
  contactInfo: "",
  videos: defaultVideos
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [customContent, setCustomContent] = useState<ContentData>(initialContent);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('flexiaura_content_v1');
    if (savedContent) {
      setCustomContent(JSON.parse(savedContent));
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('flexiaura_content_v1', JSON.stringify(customContent));
  }, [customContent]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const updateCustomContent = (data: Partial<ContentData>) => {
    setCustomContent(prev => ({ ...prev, ...data }));
  };

  const addVideo = (video: Video) => {
    setCustomContent(prev => ({
      ...prev,
      videos: [video, ...prev.videos]
    }));
  };

  const removeVideo = (id: string) => {
    setCustomContent(prev => ({
      ...prev,
      videos: prev.videos.filter(v => v.id !== id)
    }));
  };

  const t = (key: string): string => {
    if (key === 'heroTitle' && customContent.heroTitle) return customContent.heroTitle;
    if (key === 'heroSubtitle' && customContent.heroSubtitle) return customContent.heroSubtitle;
    if (key === 'contactInfo' && customContent.contactInfo) return customContent.contactInfo;

    return DICTIONARY[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      customContent,
      updateCustomContent,
      addVideo,
      removeVideo
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
