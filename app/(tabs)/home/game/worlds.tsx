import { router } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const Worlds = () => {
    const theme = useTheme();

    return (
          <ImageBackground
              source={require('@/assets/images/WorldNavigation.png')} 
              style={styles.background}
              resizeMode="cover"
          >
            <Text>This is the worlds screen</Text>
            <Text>From here, the user should be able to access different levels / quizzes in the game </Text>
            <Button onPress={() => router.push('/home/game/quiz-new')} style={styles.button}>
          To the quiz 1
        </Button>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: { 
    flex: 1,
    paddingHorizontal: 20,
    },
  button: {
    borderRadius: 24,
    marginTop: 8,
  },
});

export default Worlds;