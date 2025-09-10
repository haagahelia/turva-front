// add any globally needed types here 
// if lots of types needed for some spesific occasion make own specificOccasion.types.ts -file

export type Theme = 'light' | 'dark';

export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export type StoreState = ThemeSlice;