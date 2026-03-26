
export type Language = 'pt' | 'en' | 'fr' | 'zh' | 'ar';
export type Theme = 'light' | 'dark';

export interface Translations {
  [key: string]: string;
}

export interface Video {
  id: string;
  title: string;
}

export interface ContentData {
  heroTitle: string;
  heroSubtitle: string;
  contactInfo: string;
  videos: Video[];
  quemSomosPhotos?: {
    ceo?: string;
    vceo?: string;
    logisticsDir?: string;
    flexihelpDir?: string;
    agentSpecialist?: string;
    flexihelpMgr?: string;
    fleximarketMgr?: string;
  };
}

export type GameType = 'snake' | 'chess' | 'checkers' | 'tetris' | 'bowandarrow';
