import mock_json from "@/static/mock_quiz_1.json";
import { View } from "moti";
import { useState } from "react";
import { SectionList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface QuizType {
	id: string;
	sections: Question[];
}

interface Question {
	id: string;
	type: string;
	order: number;
	en_text: string;
	fin_text: string;
	answers: Answer[];
}

interface Answer {
	id: string;
	question_id: string;
	en_text: string;
	fin_text: string;
	is_correct: boolean;
}

interface SectionListItem {
	question: Question;
	title: string;
	data: Answer[];
}

export default function Quiz() {
	const theme = useTheme();
	const quiz_object = mock_json as unknown as QuizType;

	const SectionComponent = ({ section }: { section: Question }) => {
		return (
			<View style={styles.quizSection}>
				<Text>{section.id} </Text>
				<Text>{section.en_text}</Text>
			</View>
		);
	};

	const AnswerComponent = ({ answer }: { answer: Answer }) => {
		return (
			<>
				<TouchableOpacity
					style={styles.quizAnswer}
					onPress={() => toggleSelected(answer)}
					disabled={isAnswerSelected(answer)}
				>
					<Text>{answer.id} </Text>
					<Text>{answer.en_text}</Text>
				</TouchableOpacity>
			</>
		);
	};

	const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

	const toggleSelected = (answer: Answer) => {

		console.log("Pressed button:")
		console.log(answer.en_text)
		console.log("Selected answers:")
		console.log(selectedAnswers)


		setSelectedAnswers((prev) => {
			const exists = prev.find(
				(item) =>
					item.question_id === answer.question_id && item.id === answer.id
			) as Answer;

			if (exists) {
				// Unselect - remove from array
				return prev.filter(
					(item) =>
						!(item.question_id === answer.question_id && item.id === answer.id)
				) as Answer[];
			} else {
				// Select - add to array
				return [...prev, answer];
			}
		});
	};

	// IS THIS ANSWER IN THE SELECTED ANSWERS LIST?
	const isAnswerSelected = (answer: Answer) => {
		return selectedAnswers.some(
			(item) => item.id === answer.question_id && item.id === answer.id
		);
	};

	//const sectionListItems: SectionListItem[]

	const sectionListData = quiz_object.sections.map(
		(section) =>
			({
				question: section,
				title: section.id, // SectionList requires 'title'
				data: section.answers || [], // SectionList requires 'data'
			} as SectionListItem)
	);

	return (
		<SafeAreaView
			style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
			edges={[]}
		>
			<SectionList
				sections={sectionListData}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <AnswerComponent answer={item} />}
				renderSectionHeader={({ section }) => (
					<SectionComponent section={section.question} />
				)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	quizSection: {
		justifyContent: "center",
		backgroundColor: "antiquewhite",
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 25,
		width: "100%",
	},
	quizAnswer: {
		justifyContent: "center",
		backgroundColor: "aliceblue",
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 25,
		width: "90%",
	},
	quizSectionsList: {
		flex: 1,
	},

	safeArea: {
		flex: 1,
	},
	scrollContent: {
		alignItems: "center",
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	Image: {
		width: "100%",
		height: 280,
		borderRadius: 16,
		marginBottom: 16,
		marginTop: 60,
	},
	Image2: {
		width: "100%",
		height: 100,
		borderRadius: 16,
		marginTop: 40,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 8,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 16,
	},
	button: {
		borderRadius: 24,
		paddingHorizontal: 24,
		marginTop: 8,
	},
});
