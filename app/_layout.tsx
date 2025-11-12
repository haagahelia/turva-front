import { DarkTheme, LightTheme } from "@/constants/theme";

import { useThemeStore } from "@/src/zustand/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  // Checking the theme state and conditionally setting the theme and passing it to the PaperProvider
  const currentThemeState = useThemeStore((state) => state.theme);
  const paperTheme = currentThemeState === "light" ? LightTheme : DarkTheme;

  // SafeAreaProvider is used to ensure that the content is displayed within the safe area of the device
  // Each screen should be wrapped in a SafeAreaView
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
