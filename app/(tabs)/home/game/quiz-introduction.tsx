import { QuizLang, QuizType } from "@/src/types/types";
import mock_json from "@/static/w1-s1-act-responsibly.json";
import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";

const QuizIntro = () => {
  //Maybe we do not need dark theme in game, because the background is always light
  //
  //

  //const theme = useTheme();

  // We can store images in the JSON file as URLs (so we need to have these images in cloud). 
  // We cannot reference local images directly in JSON like:
  //   "background": "WorldOne_background.png"
  // because React Native requires `require()` for local images.
  // Example with URLs (JSON):
  //{
  // "images": {
  // "background": "https://example.com/images/WorldOne_background.png",
  // "intro_image": "https://example.com/images/W1_Q1_intro.png"
  //}
  //}


  const quizData1 = mock_json as unknown as QuizType;
  const quizData = quizData1.fi as QuizLang;

  return (
    <ImageBackground
      source={require("@/assets/images/WorldOne_background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.contentContainer}
      >

        <Image
          source={require("@/assets/images/W1_Q1_intro.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          {quizData.quiz_intro_title}
        </Text>

        {quizData.quiz_intro.map((section) => (
          <View
            key={section.title}
            style={styles.textContainer}
          >
            <Text style={styles.textContainerStyle}>{section.content}</Text>

          </View>
        ))}

        <Button
          icon="gamepad-variant-outline"
          onPress={() => router.push("/home/game/quiz")}
          style={styles.button}
          mode="contained"
          //override to make the color of the button always as in light theme
          buttonColor="#00629F"
          textColor="#FFFFFF"
        >
          Start Quiz
        </Button>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollViewStyle: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white
    marginBottom: 20,
    borderColor: "#00629F",
    borderWidth: 2,
  },
  textContainerStyle: {
    color: "#000000",
    fontSize: 16,
  },
  button: {
    borderRadius: 24,
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    marginTop: 190,
    width: 250,
    height: 250,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    color: "#00629F",               // main color
    fontSize: 16,                   // large size
    fontWeight: "bold",             // make it bold
    textAlign: "center",            // center above image
    textShadowColor: "rgba(0, 0, 0, 0.25)", // subtle shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,               // space between letters
    textTransform: "uppercase",     // optional uppercase
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    borderColor: "#00629F",
    borderWidth: 10,
    marginBottom: 20,
  }

});
export default QuizIntro;
