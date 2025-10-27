import mock_json from "@/static/mock_quiz_1.json";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, useTheme } from "react-native-paper";

const QuizIntro = () => {
    const theme = useTheme();
    return (
        <ScrollView>
    	<View style={{ backgroundColor: theme.colors.primary, width: "100%" }}>
            <Text variant='headlineSmall'>{mock_json.intro.title} </Text>
            <Text>{mock_json.intro.en_text}</Text>
		</View>
            <Button onPress={() => router.push('/home/game/quiz-new')} style={styles.button}>Start Quiz</Button>
        </ScrollView>
    );
};

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
export default QuizIntro;