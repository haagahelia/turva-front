import { DarkTheme, LightTheme } from "@/constants/theme";

import { useThemeStore } from "@/src/zustand/store";
import {useTimeStore} from "@/src/zustand/timeStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppState } from "react-native";
import { useEffect } from "react";

export default function RootLayout() {

  // Checking the theme state and conditionally setting the theme and passing it to the PaperProvider
  const currentThemeState = useThemeStore((state) => state.theme);
  const paperTheme = currentThemeState === "light" ? LightTheme : DarkTheme;
//Logic for time tracking
  useEffect(() => {
  useTimeStore.getState().startSession();

  const timeTracking = AppState.addEventListener("change", (state) => {
    if (state === "active") {
      useTimeStore.getState().startSession();
    } else {
      useTimeStore.getState().stopSession();
    }
  });

  return () => timeTracking.remove();
}, []);
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
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
