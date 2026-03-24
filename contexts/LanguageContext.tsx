
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DICTIONARY } from '../constants';
import { ContentData, Language, Video } from '../types';
import { supabase } from '../lib/supabase';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  customContent: ContentData;
  updateCustomContent: (data: Partial<ContentData>) => void;
  addVideo: (video: Video) => void;
  removeVideo: (id: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const CONTENT_KEY = 'flexiaura_content_v1';

const initialContent: ContentData = {
  heroTitle: "",
  heroSubtitle: "",
  contactInfo: "",
  videos: []
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [isLoading, setIsLoading] = useState(true);
  const [customContent, setCustomContent] = useState<ContentData>(initialContent);

  // Helper to sync to Supabase
  const syncToSupabase = async (content: ContentData) => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ 
          key: CONTENT_KEY, 
          value: content as any,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (error) {
        console.error('Error syncing to Supabase:', error);
      }
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    } catch (err) {
      console.error('Sync error:', err);
    }
  };

  // Initial load from Supabase
  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('value')
          .eq('key', CONTENT_KEY)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows returned'
          console.error('Error fetching content from Supabase:', error);
        }

        if (data?.value) {
          let parsedData = data.value;
          if (typeof data.value === 'string') {
            try {
              parsedData = JSON.parse(data.value);
            } catch (e) {
              console.error('Failed to parse data.value from supabase:', e);
            }
          }
          setCustomContent(parsedData as unknown as ContentData);
          // Also update localStorage as backup
          localStorage.setItem(CONTENT_KEY, JSON.stringify(parsedData));
        } else {
          // Fallback to localStorage if no data in Supabase
          const saved = localStorage.getItem(CONTENT_KEY);
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              setCustomContent(parsed);
              // Push local fallback to Supabase to ensure cloud sync
              await syncToSupabase(parsed);
            } catch (e) {
              console.error('Error parsing saved local content:', e);
            }
          } else {
             // Push initial empty content to supabase
             await syncToSupabase(initialContent);
          }
        }
      } catch (err) {
        console.error('Unexpected error loading content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const updateCustomContent = (data: Partial<ContentData>) => {
    setCustomContent(prev => {
      const next = { ...prev, ...data };
      syncToSupabase(next);
      return next;
    });
  };

  const addVideo = (video: Video) => {
    setCustomContent(prev => {
      const next = {
        ...prev,
        videos: [video, ...prev.videos]
      };
      syncToSupabase(next);
      return next;
    });
  };

  const removeVideo = (id: string) => {
    setCustomContent(prev => {
      const next = {
        ...prev,
        videos: prev.videos.filter(v => v.id !== id)
      };
      syncToSupabase(next);
      return next;
    });
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
      removeVideo,
      isLoading
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
