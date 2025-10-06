import mock_json from "@/static/mock_quiz_1.json";
import { View } from "moti";
import { ScrollView, StyleSheet } from "react-native";
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
		<>
			<Text>This text shows for each section?? </Text>
			<Text>{section.en_text}</Text>
		</>
	);
};

const AnswerComponent = ({ answer }: { answer: Answer }) => {
	return (
		<>
			<Text>This is an answer?? </Text>
			<Text>{answer.en_text}</Text>
		</>
	);
};

export default function Quiz() {
	const theme = useTheme();

	const quiz_object = mock_json as unknown as QuizType;
	//const quiz_str = quiz_object.toString();

	const sectionsToCheck = quiz_object.sections;
	let sections: Question | InfoSegment[] = [];
	let counter = 0;

	// GO THROUGH EACH SECTION
	for (let index = 0; index < sectionsToCheck.length; index++) {
		counter += 1;
		const section: Section = sectionsToCheck[index];

		// IF IT'S A QUESTION
		if (section.type == "quiz_question") {
			const question = section as Question;
			sections.push(question); // ADD QUESTION TO SECTIONS LIST
		}
	}

	const sectionComponents = sections.map((section, index) => {
		const sect = section as Question;

		return (
			<View key={section.id}>
				<SectionComponent section={sect} />

				{sect.answers &&
					sect.answers.map((answer) => (
						<View key={answer.id}>
							<Text>{answer.en_text}</Text>
						</View>
					))}
			</View>
		);
	});

	const answersToQuestion = (question: Question) => {
		question.answers.map((answer) => {
			return (
				<View key={answer.id}>
					<AnswerComponent answer={answer} />
				</View>
			);
		});
	};

	return (
		<SafeAreaView
			style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
			edges={[]}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				contentInsetAdjustmentBehavior="never"
			>
				<Text>Hello world this is quiz</Text>
				{sectionComponents}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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
