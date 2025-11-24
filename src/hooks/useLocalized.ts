import { useLanguageStore } from "../zustand/store";

export type LocalizedText = {
  en: string;
  fi: string;
};

export const useLocalized = (text: LocalizedText): string => {
  const { language } = useLanguageStore();
  return text[language];
};
