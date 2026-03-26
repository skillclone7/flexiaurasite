
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
  videos: [],
  quemSomosPhotos: {}
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [isLoading, setIsLoading] = useState(true);
  const [customContent, setCustomContent] = useState<ContentData>(initialContent);

  // Helper to sync to Supabase - ONLY works when authenticated as admin
  const syncToSupabase = async (content: ContentData) => {
    try {
      // Check for active auth session before writing (RLS requires admin role)
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        console.warn('[Sync] No auth session — skipping Supabase write. Saving to localStorage only.');
        localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
        return;
      }

      console.log('[Sync] Authenticated user — writing to Supabase...');
      const { error } = await supabase
        .from('site_content')
        .upsert({ 
          key: CONTENT_KEY, 
          value: content as any,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (error) {
        console.error('[Sync] Error writing to Supabase:', error);
      } else {
        console.log('[Sync] Successfully synced to Supabase');
      }
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    } catch (err) {
      console.error('[Sync] Unexpected sync error:', err);
      // Still save to localStorage as fallback
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    }
  };

  // Initial load: Supabase (source of truth) → localStorage (cache) → initialContent (default)
  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log('[Load] Fetching content from Supabase...');
        const { data, error } = await supabase
          .from('site_content')
          .select('value')
          .eq('key', CONTENT_KEY)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('[Load] Supabase fetch error:', error);
        }

        if (data?.value) {
          // Supabase has data — use it as source of truth
          let parsedData = data.value;
          if (typeof data.value === 'string') {
            try {
              parsedData = JSON.parse(data.value);
            } catch (e) {
              console.error('[Load] Failed to parse Supabase value:', e);
            }
          }
          console.log('[Load] Loaded content from Supabase:', parsedData);
          setCustomContent(parsedData as unknown as ContentData);
          // Update localStorage cache
          localStorage.setItem(CONTENT_KEY, JSON.stringify(parsedData));
        } else {
          // No Supabase data — fall back to localStorage cache (read-only, do NOT try to write back)
          console.warn('[Load] No data in Supabase, falling back to localStorage...');
          const saved = localStorage.getItem(CONTENT_KEY);
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              console.log('[Load] Loaded content from localStorage:', parsed);
              setCustomContent(parsed);
              // Do NOT call syncToSupabase here — visitor may not be authenticated
            } catch (e) {
              console.error('[Load] Error parsing localStorage:', e);
            }
          } else {
            console.log('[Load] No cached data found, using defaults');
            // Do NOT call syncToSupabase here — visitor is not authenticated
          }
        }
      } catch (err) {
        console.error('[Load] Unexpected error:', err);
        // Last resort: try localStorage
        const saved = localStorage.getItem(CONTENT_KEY);
        if (saved) {
          try {
            setCustomContent(JSON.parse(saved));
          } catch (e) {
            console.error('[Load] localStorage parse error:', e);
          }
        }
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
