import { ONBOARDING_STEPS, type Language } from "@/src/onBoardingSteps";
import { useLanguageStore } from "@/src/zustand/store";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, type Href } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ONBOARDING_KEY = "IsOnboardingComplete";
const INTRO_FADE_DURATION = 800;
const INTRO_FADE_OUT_DELAY = 400;
const HOME_ROUTE: Href = "/(tabs)/home";

//It was not used in the code
//const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function OnboardingScreen() {
  const [stage, setStage] = useState(1);
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useRouter();
  const theme = useTheme();
  const { colors } = theme;

  const language = useLanguageStore((state) => state.language) as Language;

  const steps = ONBOARDING_STEPS[language]; // get steps for current language
  const FINAL_STAGE = steps.length + 1;

  useEffect(() => {
    if (stage !== 1) {
      return;
    }

    fadeAnimation.setValue(0);

    const animation = Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: INTRO_FADE_DURATION,
        useNativeDriver: true,
      }),
      Animated.delay(INTRO_FADE_OUT_DELAY),
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: INTRO_FADE_DURATION,
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (finished) {
        setStage(2);
      }
    });

    return () => {
      animation.stop();
    };
  }, [fadeAnimation, stage]);

  const currentStep = useMemo(() => {
    if (stage <= 1) {
      return undefined;
    }

    return steps[stage - 2];
  }, [stage, steps]);

  const persistCompletion = useCallback(async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    } catch (error) {
      console.warn("Failed to persist onboarding completion", error);
    } finally {
      navigation.replace(HOME_ROUTE);
    }
  }, [navigation]);

  const handleNext = useCallback(() => {
    if (stage < FINAL_STAGE) {
      setStage((previous) => previous + 1);
      return;
    }

    persistCompletion();
  }, [persistCompletion, stage, FINAL_STAGE]);

  const handlePrevious = useCallback(() => {
    setStage((previous) => {
      if (previous <= 2) {
        return 1;
      }

      return previous - 1;
    });
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        {stage === 1 ? null : (
          <>
            <View style={styles.header}>
              {stage > 2 ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Go back one onboarding step"
                  onPress={handlePrevious}
                  style={({ pressed }) => [
                    styles.backButton,
                    pressed ? styles.backButtonPressed : null,
                    { backgroundColor: colors.surfaceVariant },
                  ]}
                >
                  <Feather name="arrow-left" size={20} color={colors.onSurface} />
                </Pressable>
              ) : null}
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, { color: colors.onSurface }]}>
                {currentStep?.title}
              </Text>
              <Text
                style={[
                  styles.description,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                {currentStep?.description}
              </Text>
              {currentStep?.image ? (
                <Image
                  source={currentStep.image}
                  style={styles.stageImage}
                  resizeMode="contain"
                />
              ) : null}
            </View>
            <View style={styles.footer}>
              <View style={styles.dotsWrapper}>
                {steps.map((step, index) => {
                  const isActive = stage - 2 === index;

                  return (
                    <View
                      key={step.key}
                      style={[
                        styles.dot,
                        {
                          backgroundColor: isActive
                            ? colors.primary
                            : colors.surfaceVariant,
                        },
                      ]}
                    />
                  );
                })}
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={handleNext}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed ? styles.primaryButtonPressed : null,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[
                    styles.primaryButtonLabel,
                    { color: colors.onPrimary },
                  ]}
                >
                  {currentStep?.buttonLabel}
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  logo: {
    width: 220,
    height: 220,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPressed: {
    opacity: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  stageImage: {
    width: "100%",
    maxWidth: 320,
    height: 260,
  },
  footer: {
    width: "100%",
    gap: 32,
  },
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});