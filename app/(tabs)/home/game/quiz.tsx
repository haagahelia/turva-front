import { Answer, Language, QuizLang } from "@/src/types/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, useTheme } from "react-native-paper";
import QuizAnswer from "./quiz-answer";
import QuizQuestion from "./quiz-question";
import TextData from "./textData.json";

const Quiz = () => {
	const theme = useTheme();
	const lang: Language = "en";
	const [isLoading, setLoading] = useState(true);

	const commonText = TextData[lang].common;
	const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
	const [quizData, setQuizData] = useState<QuizLang | null>(null);

	// Function Source: reactnative.dev -> docs -> network
	const getQuizFromApiAsync = async () => {
		try {
			// FETCH
			const response = await fetch(
				"https://turva-back-softala-turvallisuus-app.2.rahtiapp.fi/api/quiz/1"
			);

			// READ response as JSON
			const responseJson = await response.json();
			console.log("Response:");
			console.log(responseJson);
			// EXTRACT the Quiz content data
			const quizJson = responseJson[0].quiz_content;
			console.log("Quiz Content:");
			console.log(quizJson.en);
			setQuizData(quizJson.en);

			// TOGGLE Loading state OFF
			setLoading(false);
			return quizJson;

			// ERROR HANDLING
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (isLoading) {
			getQuizFromApiAsync();
		}
	});

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

	const isAllAnswered = quizData?.questions.every((q) =>
	selectedAnswers.some((a) => a.question_title === q.title)
	);

	return (
		<ScrollView
			style={{ backgroundColor: theme.colors.background, marginTop: 20 }}
		>
			{isLoading ? (
				// STATE 1: JSON CONTENT NOT LOADED
				<View>
					<Text>Fetching and reading Quiz data...</Text>
				</View>
			) : (
				// STATE 2: JSON CONTENT LOADED
				<View>
					<Text
						variant="bodyLarge"
						style={{ marginHorizontal: 20, marginBottom: 10 }}
					>
						{commonText.answerAll}
					</Text>
					{quizData?.questions.map((question) => (
						<View key={question.title} style={styles.answerContainer}>
							<QuizQuestion
								title={question.title}
								type={question.type}
								content={question.content}
								answers={question.answers}
							/>
							{question.answers.map((answer) => {
								const fullAnswer = {
									...answer,
									question_title: question.title,
								};
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
						style={{ margin: 10, marginBottom: 50 }}
						mode="contained"
						disabled={!isAllAnswered}
						//disabled={false}
						onPress={() =>
							router.push({
								pathname: "/(tabs)/home/game/results",
								params: {
									answers: JSON.stringify(selectedAnswers),
								},
							})
						}
					>
						{commonText.end}
					</Button>
				</View>
			)}
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
