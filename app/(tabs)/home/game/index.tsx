import { MotiImage } from "moti";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import TextData from './textData.json';

type OnboardingData = {
  title: string,
  description: string[]
}

const Onboarding = () => {
  const theme = useTheme();
  const [key, setKey] = useState(0);
  const [index, setIndex] = useState(0);

  const onboarding: OnboardingData[] = TextData.onboarding;
  const current = onboarding[index];

  const handleNext = () => {
    if (index < onboarding.length - 1) {
      setIndex(index + 1);
    } 
    if (index === onboarding.length - 1) {
      router.push('/(tabs)/home/game/worlds')
    }
  };
  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <MotiImage
          key={`image-${key}`}
          source={require("../../../../assets/images/HH_SafetyCharacters.png")}
          style={styles.image}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          resizeMode="contain"
        />
      {/* Current onboarding step */}
      <View style={styles.textContainer}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.onBackground }]}
        >
          {current.title}
        </Text>
      {/* Map through each description line */}
      <ScrollView style={styles.textContainer}>
        {current.description.map((line, i) => (
          <Text key={i} variant="bodyLarge" style={styles.description}>
            {line}
          </Text>
        ))}
        <Button mode="contained" onPress={handleNext} style={styles.button}>
        {index === onboarding.length - 1 ? "Valmiina!" : "Jatka"}
        </Button>
       {index > 0 && (
        <Button onPress={handlePrevious} style={styles.button}>
          Takaisin
        </Button>
      )}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    borderRadius: 24,
    marginTop: 8,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    marginBottom: 16,
  },
  textContainer: {
    flex: 2,
  },
});

export default Onboarding;
