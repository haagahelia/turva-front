// languageSlice.ts
import { StateCreator } from "zustand";

export type Language = "en" | "fi";

export interface LanguageSlice {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const createLanguageSlice: StateCreator<
  LanguageSlice,
  [],
  [],
  LanguageSlice
> = (set, get) => ({
  language: "fi",
  setLanguage: (lang) => set({ language: lang }),
  toggleLanguage: () =>
    set({ language: get().language === "fi" ? "en" : "fi" }),
});

// Usage example:
// const text = TextData[language].theme;
//
// Instead of:
// const lang = "fi";
// const text = TextData[lang].theme;