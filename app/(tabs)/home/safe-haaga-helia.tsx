import { Language } from "@/src/types/types";
import TextData from '@/static/drawerTexts.json';
import { useIsFocused } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { MotiImage, MotiView } from "moti"; // for smooth animations
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// Turvallinen Haaga-Helia screen
export default function SafeHaagaHeliaScreen() {

  const theme = useTheme();
  const lang: Language = 'fi';
  const text = TextData[lang].safeHaagaHelia;
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isFocused) {
      // Each time screen is focused, update key to re-render components
      setKey((prev) => prev + 1);
    }
  }, [isFocused]);

  const openWebsite = async () => {
    const url = "https://www.haaga-helia.fi/fi/ohjaus-ja-hyvinvointi/turvallisuus";
    try {
      await WebBrowser.openBrowserAsync(url); // opens in the system browser
    } catch (error) {
      console.error("Failed to open website:", error);
      alert("Cannot open the link.");
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={[]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="never"
      >
        {/* 1. Image */}
        <MotiImage
          key={`image-${key}`}
          source={require("../../../assets/images/HH_SafetyIcon1_blue.png")}
          style={styles.Image}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          resizeMode="contain"
        />


        {/* 2. Description */}
        <MotiView
          key={`desc-${key}`}
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 150 }}
        >
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {text.title}
          </Text>
          <Text style={[styles.description, { color: theme.colors.onBackground }]}>
            {text.description[0]}
          </Text>
        </MotiView>

        {/* 3. Link Button */}
        <MotiView
          key={`button-${key}`}
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 300 }}
        >
          <Button
            mode="contained"
            icon="link"
            style={styles.button}
            onPress={openWebsite}
          >
            {text.common.followLinkText}
          </Button>
        </MotiView>

        {/* 4. Second Image */}
        <MotiImage
          key={`image2-${key}`}
          source={require("../../../assets/images/HH_SafetyCharacters.png")}
          style={styles.Image2}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          resizeMode="contain"
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  Image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    marginBottom: 16,
    marginTop: 60,
  },
  Image2: {
    width: "100%",
    height: 100,
    borderRadius: 16,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    borderRadius: 24,
    paddingHorizontal: 24,
    marginTop: 8,
  },
});