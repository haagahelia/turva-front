import { useLanguageStore } from "../zustand/store";

export type LocalizedText = {
  en: string;
  fi: string;
};

export const useLocalized = (text: LocalizedText): string => {
  const { language } = useLanguageStore();
  return text[language];
};

// Usage example:
// <Text>{useLocalized({ en: "Settings", fi: "Asetukset" })}</Text>
// <Button>{useLocalized({ en: "OK", fi: "OK" })}</Button>
// etc.
//
// This hook uses the language from the zustand store
// Useful for small snippets of localized text within components