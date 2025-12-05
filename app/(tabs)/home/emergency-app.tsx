import { useLanguageStore } from '@/src/zustand/store';
import TextData from '@/static/drawerTexts.json';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { MotiImage, MotiView } from "moti"; // for smooth animations
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const links = {fi:[
  {
    title: "Lataa 112 Suomi -sovellus",
    url: "https://112.fi/112-suomi",
  },
  {
    title: "Näin käytät 112 Suomi -mobilisovellusta",
    url: "https://www.youtube.com/watch?v=FvxMY_N_g5g",
  },
], en: [
  {
    title: "Download 112 Suomi -app",
    url: "https://112.fi/en/112-suomi-application",
  },
  {
    title: "How to use 112 Suomi -app",
    url: "https://www.youtube.com/watch?v=C1qfRmXPJiY",
  },
]};

// Lataa 112-sovellus screen
export default function EmergencyAppScreen() {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);
  const {language} = useLanguageStore()
  const text = TextData[language].emergencyApp;

  useEffect(() => {
    if (isFocused) {
      // Each time screen is focused, update key to re-render components
      setKey((prev) => prev + 1);
    }
  }, [isFocused]);

  const openWebsite = async (url: string) => {
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
          source={require("../../../assets/images/HH_112.png")}
          style={styles.Image}
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          resizeMode="contain"
        />


        {/* 2. Description */}
        <MotiView
          key={`desc-${key}`}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 150 }}
        >
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {text.title}
          </Text>
          <Text style={[styles.description, { color: theme.colors.onBackground }]}>
            {text.description}  </Text>
        </MotiView>

        {/* 3. Link Buttons */}
        {links[language].map((link, index) => (
          <MotiView
            key={`button-${key}-${index}`}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 300 + index * 100 }}
          >
            <Button
              mode={index === 1 ? "outlined" : "contained"}
              icon={() =>
                index < 1 ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name="apple"
                      size={20}
                      color={theme.colors.onPrimary} // use theme color for icon
                    />
                    <MaterialCommunityIcons
                      name="google-play"
                      size={20}
                      color={theme.colors.onPrimary} // use theme color for icon
                      style={{ marginLeft: 4 }}
                    />
                  </View>
                ) : (
                  <MaterialCommunityIcons
                    name="youtube"
                    size={20}
                    color="red"
                  />
                )
              }
              style={[styles.button, index === 1 && styles.youtubeButton]}
              labelStyle={index === 1 ? styles.youtubeLabel : undefined}
              onPress={() => openWebsite(link.url)}
            >
              {link.title}
            </Button>
          </MotiView>
        ))}
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
    marginBottom: 20,
  },
  button: {
    borderRadius: 24,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  youtubeButton: {
    borderColor: "red",
    borderWidth: 2,
    marginTop: 16,
  },
  youtubeLabel: {
    color: "red",
    fontWeight: "700",
  },
});