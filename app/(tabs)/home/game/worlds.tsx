import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Worlds = () => {
    const theme = useTheme();

    return (
        <SafeAreaView style={styles.container} >
            <Text>This is the worlds screen</Text>
            <Text>From here, the user should be able to access different levels / quizzes in the game </Text>
            <Button onPress={() => router.navigate('/home/game')} style={styles.button}>
          Takaisin
        </Button>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
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