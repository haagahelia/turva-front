import textData from "@/static/drawerTexts.json";
import { useIsFocused } from "@react-navigation/native";
import { MotiImage, MotiView } from "moti"; // for smooth animations
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguageStore } from "@/src/zustand/store";

//In the future we can also add (for example): Name of the developer - what he did in the app (Back End Developer for example)
const developers = [
  "Doranai Abdul",
  "Elomaa Otto",
  "Enberg Jehu",
  "Ermel Alisa",
  "Hallenberg Olivia",
  "Heikkinen Tatu",
  "Huttunen Jasmin",
  "Kuronen Santeri",
  "Mäkelä Mark",
  "Savolainen Ville",
];

export default function NewsScreen() {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);
  const { language } = useLanguageStore();
  const text = textData[language];

  useEffect(() => {
    if (isFocused) {
      // Re-trigger animations on focus
      setKey((prev) => prev + 1);
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={[]}
    >
      {/* 1. Image */}
      <MotiImage
        key={`image-${key}`}
        source={require("../../../assets/images/About_app_screen.png")}
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
         {text.about.title}
        </Text>
        <Text
          style={[styles.description, { color: theme.colors.onBackground }]}
        >
         {text.about.developers}
        </Text>
      </MotiView>

      {/* 3. Developer list with staggered animation */}
      <ScrollView contentContainerStyle={styles.devList}>
        {developers.map((dev, index) => (
          <MotiView
            key={`${dev}-${key}`}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 400,
              delay: 300 + index * 200, // stagger each name
            }}
            style={[
              styles.devContainer,
              {
                backgroundColor: theme.dark
                  ? "rgba(208, 228, 255, 0.15)" // dark mode: soft overlay
                  : theme.colors.background, // light mode: solid light blue

                // Border
                borderWidth: 4,
                borderColor: theme.colors.primaryContainer, // blue border

              },
            ]}
          >
            <Text style={[styles.devName, { color: theme.colors.onBackground }]}>
              {dev}
            </Text>
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
  Image: {
    width: "100%",
    height: 230,
    borderRadius: 16,
    marginBottom: 16,
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
  devList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  devContainer: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
  },
  devName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
  },
});