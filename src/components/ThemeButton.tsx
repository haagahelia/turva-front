import TextData from "@/static/drawerTexts.json";
import { Button, useTheme } from "react-native-paper";
import { useThemeStore, useLanguageStore } from "../zustand/store";

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { language } = useLanguageStore();
  const paperTheme = useTheme();
  const text = TextData[language].theme;

  return (
    <Button
      mode="contained"
      onPress={toggleTheme}
      icon={theme === "light" ? "weather-night" : "weather-sunny"}
      buttonColor={paperTheme.colors.primary}
      textColor={paperTheme.colors.onPrimary}
      style={{ marginVertical: 8 }}
    >
      {theme === "light" ? `${text.dark}` : `${text.light}`}
    </Button>
  );
};

export default ThemeButton;