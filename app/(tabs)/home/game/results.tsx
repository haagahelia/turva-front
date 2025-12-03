import { Answer, ResultsTexts, WorldResults } from "@/src/types/types";
import { useLanguageStore } from "@/src/zustand/store";
import results_json from "@/static/quiz_results.json";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "moti";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { loadQuiz, loadWorld } from "./quiz-route-functions";

const Results = () => {
	// ROUTIMG PARAMS
	const { answers } = useLocalSearchParams<{ answers: string }>();

	const { quiz_id } = useLocalSearchParams<{ quiz_id: string }>();
	console.log("ID after loading Results.tsx:");
	console.log(quiz_id);

	const { world_id } = useLocalSearchParams<{ world_id: string }>();
	console.log("World Id after loading Results.tsx:");
	console.log(world_id);

	const { world_name_en } = useLocalSearchParams<{ world_name_en: string }>();
	const { world_name_fi } = useLocalSearchParams<{ world_name_fi: string }>();
	console.log("World Name after loading Results.tsx:");
	console.log(world_name_en, world_name_fi);

	// PARSE ANSWERS
	const selectedAnswers: Answer[] = JSON.parse(answers);
	const correctCount = selectedAnswers.filter((a) => a.is_correct).length;
	const totalCount = selectedAnswers.length; // total number of questions

	// Language (for now hardcoded, later can come from app context or settings)
	const { language } = useLanguageStore();

	// Load and type results.json
	const resultsData = results_json as unknown as ResultsTexts;
	const worldResults = resultsData[language]["world1"] as WorldResults;

	const allCorrect = correctCount === totalCount;
	const resultText = allCorrect
		? worldResults.allCorrectText
		: worldResults.notAllCorrectText;

	const buttonText = allCorrect
		? worldResults.allCorrectButton
		: worldResults.notAllCorrectButton;



	return (
		<ImageBackground
			source={require("@/assets/images/WorldOne_background.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<ScrollView
				style={styles.scrollViewStyle}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.contentContainer}>
					<Image
						source={require("@/assets/images/W1_Q1_intro.png")}
						style={styles.image}
						resizeMode="contain"
					/>

					<View style={styles.textContainer}>
						{/* Title */}
						<Text style={styles.title}>{worldResults.title}</Text>

						{/* Score */}
						<Text style={styles.score}>
							{correctCount}/{totalCount}
						</Text>

						{/* Dynamic text based on score */}
						<Text style={styles.text}>{resultText}</Text>
					</View>

					<Button
						style={styles.button}
						mode="contained"
						buttonColor="#00629F"
						textColor="#FFFFFF"
						onPress={
							() =>
								allCorrect
									? loadWorld(world_id, world_name_en, world_name_fi) // go to world if all correct
									: loadQuiz(quiz_id, world_id, world_name_en, world_name_fi) // go back to intro if not all correct
						}
					>
						{buttonText}
					</Button>

					<Button
						icon="gamepad-variant-outline"
						onPress={() => loadWorld(world_id, world_name_en, world_name_fi)}
						style={styles.button}
						mode="contained"
						//override to make the color of the button always as in light theme
						buttonColor="#00629F"
						textColor="#FFFFFF"
					>
						Back to World
					</Button>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	image: {
		marginTop: 120,
		width: 200,
		height: 200,
		marginBottom: 20,
		alignSelf: "center",
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	textContainer: {
		padding: 16,
		borderRadius: 12,
		backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white
		marginBottom: 20,
		borderColor: "#00629F",
		borderWidth: 2,
	},
	title: {
		textAlign: "center",
		fontSize: 22,
		marginBottom: 10,
		fontWeight: "bold",
	},
	text: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 10,
		fontWeight: "bold",
	},
	score: {
		textAlign: "center",
		fontSize: 30,
		marginBottom: 10,
		fontWeight: "bold",
	},
	button: {
		borderRadius: 24,
		alignSelf: "center",
		marginBottom: 20,
	},
	scrollViewStyle: {
		flex: 1,
		paddingHorizontal: 20,
	},
});
export default Results;
