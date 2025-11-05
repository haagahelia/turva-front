import { Answer, Language, QuizLang, QuizType } from "@/src/types/types";
import mock_json from "@/static/w1-s1-act-responsibly.json";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, useTheme } from "react-native-paper";
import QuizAnswer from "./quiz-answer";
import QuizQuestion from "./quiz-question";
import TextData from './textData.json';

const Quiz = () => {
	const theme = useTheme();
	const lang: Language = 'en'
	const commonText = TextData[lang].common;
	const quizData1 = mock_json as unknown as QuizType;
	const quizData = quizData1[lang] as QuizLang;
	const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

const toggleSelected = (answer: Answer) => {
	setSelectedAnswers((prev) => {
		// Remove any existing answer for this question
		const filtered = prev.filter(
			(item) => item.question_title !== answer.question_title
		);
		// Add the new selected answer
		return [...filtered, answer];
	});
};
	const isAnswerSelected = (answer: Answer) => {
		return selectedAnswers.some(
			(item) =>
				item.question_title === answer.question_title &&
				item.title === answer.title
		);
	};
	const isAllAnswered = quizData.questions.every((q) =>
	selectedAnswers.some((a) => a.question_title === q.title)
);


	return (
		<ScrollView style={{ backgroundColor: theme.colors.background, marginTop: 20}}>
			<Text variant="bodyLarge" style={{marginHorizontal: 20, marginBottom: 10}}>{commonText.answerAll}</Text>
			{quizData.questions.map((question) => (
				<View key={question.title} style={styles.answerContainer}>
					<QuizQuestion
						title={question.title}
						type={question.type}
						content={question.content}
						answers={question.answers}
					/>
					{question.answers.map((answer) => {
						const fullAnswer = { ...answer, question_title: question.title };
						return (
							<QuizAnswer
								key={answer.title}
								answer={fullAnswer}
								isSelected={isAnswerSelected(fullAnswer)}
								onSelect={toggleSelected}
							/>
						);
					})}
				</View>
			))}
			<Button
				style={{margin: 10, marginBottom: 50}}
				mode="contained"
				disabled={!isAllAnswered}
				onPress={() =>
					router.push({
						pathname: "/(tabs)/home/game/results",
						params: {
							answers: JSON.stringify(selectedAnswers),
						},
					})
				}
			>{commonText.end}
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	answerContainer: {
		marginBottom: 24,
		marginHorizontal: 10,
	},

});

export default Quiz;
