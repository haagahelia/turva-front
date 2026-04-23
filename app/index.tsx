import { useAuthStore } from "@/src/zustand/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";


const ONBOARDING_KEY = "IsOnboardingComplete";
const HOME_ROUTE: Href = "/(tabs)/home";
const ONBOARDING_ROUTE = "/(onboarding)";
const AUTH_ROUTE: Href = "/(auth)/login"
const ONBOARDING_ROUTE_HREF = ONBOARDING_ROUTE as unknown as Href;


export default function Index() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  useEffect(() => {
    let isMounted = true;

    const evaluateStartupStatus = async () => {
      try {
        if (!hasHydrated) return;
        // To reset onboarding for testing
        //await AsyncStorage.removeItem(ONBOARDING_KEY);
        //console.log("Onboarding reset");
        const onboardingDone = await AsyncStorage.getItem(ONBOARDING_KEY);

        if (onboardingDone !== "true") {
          router.replace(ONBOARDING_ROUTE);
          return;
        }

        router.replace(isLoggedIn ? HOME_ROUTE : AUTH_ROUTE);
      } catch (error) {
        console.warn("Failed to read startup status", error);
        router.replace(ONBOARDING_ROUTE);
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    evaluateStartupStatus();

    return () => {
      isMounted = false;
    };
  }, [router, hasHydrated, isLoggedIn]);

  if (isChecking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

