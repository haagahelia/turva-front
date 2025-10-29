import { Answer, QuizLang, QuizType } from "@/src/types/types";
import mock_json from "@/static/w1-s1-act-responsibly.json";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, useTheme } from "react-native-paper";
import QuizAnswer from "./quiz-answer";
import QuizQuestion from "./quiz-question";

const QuizNew = () => {
	const theme = useTheme();
	const quizData1 = mock_json as unknown as QuizType;
	const quizData = quizData1.en as QuizLang;
	const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

	const toggleSelected = (answer: Answer) => {
		setSelectedAnswers((prev) => {
			const exists = prev.find(
				(item) =>
					item.question_title === answer.question_title &&
					item.title === answer.title
			) as Answer;
			// Unselect - remove from array
			if (exists) {
				return prev.filter(
					(item) =>
						!(
							item.question_title === answer.question_title &&
							item.title === answer.title
						)
				) as Answer[];
				// Select - add to array
			} else {
				return [...prev, answer];
			}
		});
	};

	const isAnswerSelected = (answer: Answer) => {
		return selectedAnswers.some(
			(item) =>
				item.question_title === answer.question_title &&
				item.title === answer.title
		);
	};

	return (
		<ScrollView>
			{quizData.questions.map((question) => (
				<View key={question.title} style={{ marginBottom: 24 }}>
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
				onPress={() =>
					router.push({
						pathname: "/(tabs)/home/game/results",
						params: {
							answers: JSON.stringify(selectedAnswers),
						},
					})
				}
			>
				End quiz
			</Button>
		</ScrollView>
	);
};

export default QuizNew;
