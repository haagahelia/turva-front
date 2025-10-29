import { QuizLang, QuizType } from "@/src/types/types";
import mock_json from "@/static/w1-s1-act-responsibly.json";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, useTheme } from "react-native-paper";

const QuizIntro = () => {
	const theme = useTheme();
  const quizData1 = mock_json as unknown as QuizType;
  const quizData = quizData1.en as QuizLang;

	return (
		<ScrollView>
			

			{quizData.quiz_intro.map((section) => (
				<View key={section.title} style={{ marginBottom: 24 }}>
					<Text>{section.content}</Text>
	
				</View>
			))}

			<Button
				onPress={() => router.push("/home/game/quiz-new")}
				style={styles.button}
			>
				Start Quiz
			</Button>
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
