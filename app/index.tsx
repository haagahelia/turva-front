import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ONBOARDING_KEY = "IsOnboardingComplete";
const HOME_ROUTE: Href = "/(tabs)/home";
const ONBOARDING_ROUTE = "/(onboarding)";
const ONBOARDING_ROUTE_HREF = ONBOARDING_ROUTE as unknown as Href;

export default function Index() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const evaluateOnboardingStatus = async () => {
      try {
        // To reset onboarding for testing
        //await AsyncStorage.removeItem(ONBOARDING_KEY);
        //console.log("Onboarding reset");

        const storedValue = await AsyncStorage.getItem(ONBOARDING_KEY);

        router.replace(
          storedValue === "true" ? HOME_ROUTE : ONBOARDING_ROUTE_HREF,
        );
      } catch (error) {
        console.warn("Failed to read onboarding status", error);
        router.replace(ONBOARDING_ROUTE_HREF);
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    evaluateOnboardingStatus();

    return () => {
      isMounted = false;
    };
  }, [router]);

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
