import { useIsFocused } from "@react-navigation/native";
import { MotiImage, MotiView } from "moti"; // for smooth animations
import { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";



// Järjestyssäännöt screen
export default function RulesAndRegulationsScreen() {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isFocused) {
      // Each time screen is focused, update key to re-render components
      setKey((prev) => prev + 1);
    }
  }, [isFocused]);

  const openPDF = async () => {
    const pdfUrl = "https://www.haaga-helia.fi/sites/default/files/file/2024-11/haaga-helian-jarjestyssaannot-2024.pdf";

    try {
      // Both iOS and Android: open in default browser
      await Linking.openURL(pdfUrl);
    } catch (error) {
      console.error("Failed to open PDF:", error);
      alert("Cannot open the PDF file.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 1. Image */}
        <MotiImage
          key={`image-${key}`}
          source={require("../../../assets/images/HH_Rules.png")}
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
            Järjestyssäännöt
          </Text>
          <Text style={[styles.description, { color: theme.colors.onBackground }]}>
            Järjestyssaännöllä turvataan korkeakoulujen leinen turvallisuus, edistetaän työnja opiskelun esteetöntä sujumista sekä tasapuolista kohtelua.
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
            onPress={openPDF}
          >
            Haaga-Helian järjestyssäännöt
          </Button>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    padding: 16,
  },
  Image: {
    width: "100%",
    height: 300,
    borderRadius: 16,
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
    marginTop: 20,
  },
});