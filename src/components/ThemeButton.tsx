import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeStore } from "../store";

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();
  const paperTheme = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{ padding: 10, backgroundColor: paperTheme.colors.surface }}
    >
      <Text style={{ color: paperTheme.colors.primary }}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;