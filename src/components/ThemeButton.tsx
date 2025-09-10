import { Text, TouchableOpacity } from "react-native";
import { useThemeStore } from ".././store";

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ padding: 10 }}>
        {/* atm only ThemeState changes, there is no actual themes yet */}
      <Text>Switch to {theme === "light" ? "dark" : "light"} mode</Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;