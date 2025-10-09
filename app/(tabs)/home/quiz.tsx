import mock_json from "@/static/mock_quiz_1.json";
import { View } from "moti";
import { FlatList, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface QuizType {
	id: number;
	sections: Question[];
}

interface Question {
	id: number;
	type: string;
	order: number;
	en_text: string;
	fin_text: string;
	answers: Answer[];
}

interface InfoSegment {
	id: number;
	type: string;
	order: number;
	en_text: string;
	fin_text: string;
}

type Section = Question | InfoSegment;

interface Answer {
	id: number;
	en_text: string;
	fin_text: string;
	is_correct: boolean;
}

const SectionComponent = ({ section }: { section: Question }) => {
	return (
		<View style={styles.quizSection}>
			<Text>{section.id} </Text>
			<Text>{section.en_text}</Text>

			{/* IF SECTION HAS ANSWERS (IT'S QUESTION), SHOW ANSWERS */}
			{section.answers &&
				section.answers.map((answer) => (
					<AnswerComponent key={answer.id} answer={answer} />
				))}
		</View>
	);
};

const AnswerComponent = ({ answer }: { answer: Answer }) => {
	return (
		<View style={styles.quizAnswer}>
			<Text>{answer.id} </Text>
			<Text>{answer.en_text}</Text>
		</View>
	);
};

export default function Quiz() {
	const theme = useTheme();
	const quiz_object = mock_json as unknown as QuizType;

	return (
		<SafeAreaView
			style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
			edges={[]}
		>
			{/* Show each section of this page on a scrollable FlatList */}
			<FlatList
				style={styles.quizSectionsList}
				data={quiz_object.sections}
				renderItem={({ item }) => {
					const sect = item as Question;
					return (
						<>
							<SectionComponent section={sect} />
							<View style={{height: 10}} />
						</>
					);
				}}
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
		width: "90%",
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
		flex: 1
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
