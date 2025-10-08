import { MotiImage } from "moti";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import TextData from './textData.json';


const Instructions = () => {
  const theme = useTheme();
  const [key, setKey] = useState(0);
  
  return (
    <SafeAreaView style={styles.container} edges={[]}>
     <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // optional
      >
        <MotiImage
          key={`image-${key}`}
          source={require("../../../../assets/images/HH_SafetyCharacters.png")}
          style={styles.image}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          resizeMode="contain"
        />
      <Text 
      variant="headlineMedium" 
      style={[styles.title, { color: theme.colors.onBackground }]}>
       {TextData.onboarding.instructions.title}
      </Text>
      <Text 
        variant="bodyLarge"
        style={styles.description}>
       {TextData.onboarding.instructions.description}
      </Text>
      <Button onPress={() => router.back()}>Jatka</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20
    },
  scrollContainer: {
    flexGrow: 1, 
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
    paddingHorizontal: 24,
    marginTop: 8,
  },
    image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    marginBottom: 16,
  },
});

export default Instructions;
