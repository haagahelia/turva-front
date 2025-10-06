import { Button, useTheme } from "react-native-paper";
import { useThemeStore } from "../zustand/store";

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();
  const paperTheme = useTheme();

  return (
    <Button
      mode="contained"
      onPress={toggleTheme}
      icon={theme === "light" ? "weather-night" : "weather-sunny"}
      buttonColor={paperTheme.colors.primary}
      textColor={paperTheme.colors.onPrimary}
      style={{ marginVertical: 8 }}
    >
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
};

export default ThemeButton;