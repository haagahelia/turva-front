// themeSlice.ts
import { StateCreator } from "zustand";

export type Theme = 'light' | 'dark';

export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export type StoreState = ThemeSlice;

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set,
  get
) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set({ theme: get().theme === "light" ? "dark" : "light" }),
});
