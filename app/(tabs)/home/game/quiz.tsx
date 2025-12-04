import { Answer, QuizLang, QuizType, Section } from "@/src/types/types";
import { useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, useTheme } from "react-native-paper";
import QuizAnswer from "./quiz-answer";
import QuizQuestion from "./quiz-question";
import { loadResultsScreen, loadWorld } from "./quiz-route-functions";

const Quiz = () => {
	const theme = useTheme();
	const { language } = useLanguageStore();
	const lang = language;
	const uiText = (TextData as any)[lang];
	const commonText = TextData[lang].common;

	const [isLoading, setLoading] = useState(true);

	const { quiz_id } = useLocalSearchParams<{ quiz_id: string }>();
	console.log("Quiz ID after loading Quiz.tsx:");
	console.log(quiz_id);

	const { world_id } = useLocalSearchParams<{ world_id: string }>();
	console.log("World ID after loading Quiz.tsx:");
	console.log(world_id);

	const { world_name_en } = useLocalSearchParams<{ world_name_en: string }>();
	const { world_name_fi } = useLocalSearchParams<{ world_name_fi: string }>();
	console.log("World Name after loading Quiz.tsx:");
	console.log(world_name_en, world_name_fi);

	const [quizJson, setQuizJson] = useState<QuizType | null>(null);
	const [quizData, setQuizData] = useState<QuizLang | null>(null);
	const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

	// Function Source: reactnative.dev -> docs -> network
	const getQuizFromApiAsync = async () => {
		try {
			// FETCH
			const response = await fetch(
				`https://turva-back-softala-turvallisuus-app.2.rahtiapp.fi/api/quiz/${quiz_id}`
			);

			// READ response as JSON
			const responseJson = await response.json();
			console.log("Response:");
			console.log(responseJson);
			// EXTRACT the Quiz content data
			const quizJson = responseJson[0].quiz_content;
			console.log("Quiz Content:");
			console.log(quizJson[lang]);
			
			setQuizJson(quizJson);
			setQuizData(quizJson[lang]);

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

	// Use effect based on lang update explained by Claude.ai
	useEffect(() => {quizJson && setQuizData(quizJson[lang])}, [lang]); // Runs whenever lang changes

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

	const isAllAnswered = quizData?.questions
		.filter((section) => section.type === "quiz_question")
		.every((q) => selectedAnswers.some((a) => a.question_title === q.title));

	const quizRenderer = (section: Section) => {
		// Use a case switch to return the right kind of component for each section
		switch (section.type) {
			case "quiz_question":
				return (
					<View key={section.title} style={styles.answerContainer}>
						<QuizQuestion
							title={section.title}
							type={section.type}
							content={section.content}
							answers={section.answers}
						/>
						{section.answers.map((answer) => {
							const fullAnswer = {
								...answer,
								question_title: section.title,
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
				);
			case "image":
				return (
					<Image
						source={{ uri: section.url }}
						style={styles.quiz_image}
						resizeMode="contain"
					/>
				);
		}
	};

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
					{/* Render each segment - they could be questions but also images etc */}
					{quizData?.questions.map((question) => quizRenderer(question))}
					<Button
						style={{ margin: 10, marginBottom: 50 }}
						mode="contained"
						disabled={!isAllAnswered}
						//disabled={false}
						onPress={() =>
							loadResultsScreen(
								quiz_id,
								world_id,
								world_name_en,
								world_name_fi,
								JSON.stringify(selectedAnswers)
							)
						}
					>
						{commonText.end}
					</Button>
				</View>
			)}

			<Button
				icon="gamepad-variant-outline"
				onPress={() => loadWorld(world_id, world_name_en, world_name_fi)}
				style={styles.button}
				mode="contained"
				//override to make the color of the button always as in light theme
				buttonColor="#00629F"
				textColor="#FFFFFF"
			>
				{uiText.worlds.backToWorld}
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	answerContainer: {
		marginBottom: 24,
		marginHorizontal: 10,
	},
	button: {
		borderRadius: 24,
		alignSelf: "center",
		marginBottom: 20,
	},
	quiz_image: {
		height: 250,
		aspectRatio: 1,
		alignSelf: "center",
	},
});

export default Quiz;
