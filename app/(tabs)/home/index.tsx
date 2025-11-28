import TextData from "@/static/homeTexts.json";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguageStore } from "@/src/zustand/store";

//Make images and buttons responsive for all screens
const { width, height } = Dimensions.get('window');

const IMAGE_HEIGHT = height * 0.35; // 35% of screen height
const BUTTON_HEIGHT = height * 0.08; // 9% of screen height
const BUTTON_FONT = width * 0.05; // 5% of screen width
const ICON_SIZE = width * 0.06;          // 6% of screen width
const IMAGE_SPACING = height * 0.01;    // 2% of screen height
const BUTTONSTACK_MARGIN = height * 0.05; // 5% of screen height


// Koti screen (Index is always the default first screen)
export default function Index() {

  // This is how you access the environment variables
  // This can be removed later
  const theme = useTheme();
  const { language } = useLanguageStore();
  const text = TextData[language];    

  // Added this in anticipation for new screens (where the buttons take us)
  //const handleButtonPress = (screen: string) => {};

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={[]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        // iOS only: prevent automatic inset adjustments if needed
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false} // optional: cleaner look
      >

        <Image
          source={require('../../../assets/images/Home_screen.png')}
          style={styles.image}
        />

        <View style={styles.buttonStack}>
          <Button
            mode="outlined"
            onPress={() => router.push('/(tabs)/home/safety-briefing')}
            style={[styles.button, { borderColor: theme.colors.primary }]}
            labelStyle={styles.buttonLabel}
            textColor={theme.colors.primary}      // text color
            buttonColor="transparent"             // transparent background
            icon={(props) => (
              <MaterialCommunityIcons
                name="school"
                size={ICON_SIZE}           // <-- change the icon size here
                color={props.color} // keeps the color consistent with textColor
              />
            )}
          >
            {text.safetyBriefing}
          </Button>


          <Button
            mode="contained"
            onPress={() => router.push("/(tabs)/home/game")}
            style={[styles.button, { borderColor: theme.colors.primary }]}
            labelStyle={styles.buttonLabel}
            textColor={theme.colors.primary}      // text color
            buttonColor="transparent"             // transparent background
            icon={(props) => (
              <MaterialCommunityIcons
                name="gamepad-variant"
                size={ICON_SIZE}           // <-- change the icon size here
                color={props.color} // keeps the color consistent with textColor
              />
            )}
          >
            {text.game}
          </Button>
{/* Commented out because functionality is not done */}
          <Button
            mode="contained"
            onPress={() => router.push({
              pathname: "/(tabs)/home/report-description-screen",
              params: { type: "security" },
            })}
            style={[styles.button, { borderColor: theme.colors.primary }]}
            labelStyle={styles.buttonLabel}
            textColor={theme.colors.primary}      // text color
            buttonColor="transparent"             // transparent background
            icon={(props) => (
              <MaterialCommunityIcons
                name="file-document-edit"
                size={ICON_SIZE}           // <-- change the icon size here
                color={props.color} // keeps the color consistent with textColor
              />
            )}
          >
            {text.safetyPerception}
          </Button>

          <Button
            mode="contained"
            onPress={() => router.push({
              pathname: "/(tabs)/home/report-description-screen",
              params: { type: "harassment" },
            })}
            style={[styles.button, { borderColor: theme.colors.primary }]}
            labelStyle={styles.buttonLabel}
            textColor={theme.colors.primary}      // text color
            buttonColor="transparent"             // transparent background
            icon={(props) => (
              <MaterialCommunityIcons
                name="hand-back-left"
                size={ICON_SIZE}           // <-- change the icon size here
                color={props.color} // keeps the color consistent with textColor
              />
            )}
          >
            {text.report}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonStack: {
    width: '100%',
    marginBottom: BUTTONSTACK_MARGIN,
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    marginBottom: IMAGE_SPACING,
  },
  button: {
    width: '100%',
    borderRadius: 100,
    marginBottom: 16,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    borderWidth: 5,
  },
  buttonLabel: {
    fontSize: BUTTON_FONT,
    textAlign: 'center',
  },
});
