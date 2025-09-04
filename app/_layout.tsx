import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // SafeAreaProvider is used to ensure that the content is displayed within the safe area of the device
  // Each screen should be wrapped in a SafeAreaView
  return (
    <SafeAreaProvider> 
      <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </SafeAreaProvider>
  );
}
