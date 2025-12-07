
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
}

export type GameType = 'snake' | 'chess' | 'checkers' | 'tetris';
