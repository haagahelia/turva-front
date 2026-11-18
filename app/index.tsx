import { Redirect } from "expo-router";
import { useAuthStore } from "@/src/zustand/authStore";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const hasHydrated  = useAuthStore((s) => s.hasHydrated);
  const onboardingDone = useAuthStore((s) => s.isOnboardingComplete);

  if (!hasHydrated ) {
    return (
      <View
        style={[styles.loading, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!onboardingDone) return <Redirect href="/(onboarding)" />;
  return <Redirect href={isLoggedIn ? "/(tabs)/home" : "/(auth)/login"} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
