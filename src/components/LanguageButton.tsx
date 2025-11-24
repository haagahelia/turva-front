import { Button, useTheme } from "react-native-paper";
import { useLanguageStore } from "../zustand/store";

const LanguageButton = () => {
  const { language, toggleLanguage } = useLanguageStore();
  const paperTheme = useTheme();

  return (
    <Button
      mode="contained"
      onPress={toggleLanguage}
      icon="translate"
      buttonColor={paperTheme.colors.primary}
      textColor={paperTheme.colors.onPrimary}
      style={{ marginVertical: 8 }}
    >
      {language === "en" ? "FI" : "EN"}
    </Button>
  );
};

export default LanguageButton;
