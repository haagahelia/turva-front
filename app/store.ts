import { create } from "zustand";

type Theme = 'light' | 'dark';

type ThemeStore = {
    theme: Theme; // theme state
    setTheme: (theme: Theme) => void; // sets theme
    toggleTheme: () => void; // changes theme
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
    theme: 'light', // default theme
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => 
    set({theme: get().theme === 'light' ? 'dark' : 'light'} )
     
}));