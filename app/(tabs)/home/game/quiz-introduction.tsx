import { QuizLang, QuizType, Section } from "@/src/types/types";
import { useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	Linking,
	StyleSheet,
	View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import { loadQuiz, loadWorld } from "./quiz-route-functions";

const QuizIntro = () => {
	//Maybe we do not need dark theme in game, because the background is always light
	//
	//

	//const theme = useTheme();

	// We can store images in the JSON file as URLs (so we need to have these images in cloud).
	// We cannot reference local images directly in JSON like:
	//   "background": "WorldOne_background.png"
	// because React Native requires `require()` for local images.
	// Example with URLs (JSON):
	//{
	// "images": {
	// "background": "https://example.com/images/WorldOne_background.png",
	// "intro_image": "https://example.com/images/W1_Q1_intro.png"
	//}
	//}

	const { language } = useLanguageStore();
	const lang = language;
	const [isLoading, setLoading] = useState(true);
	const [quizJson, setQuizJson] = useState<QuizType | null>(null);
	const [quizData, setQuizData] = useState<QuizLang | null>(null);
	const uiText = (TextData as any)[lang];

	const { quiz_id } = useLocalSearchParams<{ quiz_id: string }>();
	console.log("Quiz ID after loading Quiz-introduction.tsx:");
	console.log(quiz_id);

	const { world_id } = useLocalSearchParams<{ world_id: string }>();
	console.log("World ID after loading Quiz-introduction.tsx:");
	console.log(world_id);

	const { world_name_en } = useLocalSearchParams<{ world_name_en: string }>();
	const { world_name_fi } = useLocalSearchParams<{ world_name_fi: string }>();
	console.log("World Name after loading Quiz-introduction.tsx:");
	console.log(world_name_en, world_name_fi);

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
	useEffect(() => {quizJson && setQuizData(quizJson[lang])}, [lang, quizJson]); // Runs whenever lang changes

	// Content type processing is separated into its own function
	// Tips on organization given by Claude.ai
	const quizIntroRenderer = (section: Section) => {
		// Use a case switch to return the right kind of component for each section
		switch (section.type) {
			case "quiz_info":
				return (
					<View key={section.title} style={styles.textContainer}>
						<Text style={styles.textContainerStyle}>{section.content}</Text>
					</View>
				);

			case "quiz_header":
				return (
					<View key={section.title} style={[styles.textContainer]}>
						<Text style={[styles.textContainerStyle, styles.bold]}>
							{section.content}
						</Text>
					</View>
				);
			// Source for link management: ClaudeAI
			case "link":
				return (
					<View key={section.title} style={styles.textContainer}>
						<Button onPress={() => section.url && Linking.openURL(section.url)}>
							<Text style={styles.quiz_link}>{section.content}</Text>
						</Button>
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
		<ImageBackground
			source={require("@/assets/images/WorldOne_background.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<ScrollView
				style={styles.scrollViewStyle}
				contentContainerStyle={styles.contentContainer}
			>
				{isLoading ? (
					// STATE 1: JSON CONTENT NOT LOADED
					<View>
						<Text>Fetching and reading Quiz data...</Text>
					</View>
				) : (
					// STATE 2: JSON CONTENT LOADED
					<View>
						<View style={styles.marginTop190} />
						{/* MAP each content SECTION into a different RENDERED COMPONENT */}
						{quizData?.quiz_intro.map((section) => quizIntroRenderer(section))}

						<Button
							icon="gamepad-variant-outline"
							onPress={() =>
								loadQuiz(quiz_id, world_id, world_name_en, world_name_fi)
							}
							style={styles.button}
							mode="contained"
							//override to make the color of the button always as in light theme
							buttonColor="#00629F"
							textColor="#FFFFFF"
						>
							{uiText.common.start}
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
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	scrollViewStyle: {
		flex: 1,
		paddingHorizontal: 20,
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
		marginTop: 10,
		marginBottom: 10,
		borderColor: "#00629F",
		borderWidth: 2,
	},
	textContainerStyle: {
		color: "#000000",
		fontSize: 16,
	},
	bold: {
		fontWeight: "bold",
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
	marginTop190: {
		marginTop: 190,
	},
	title: {
		color: "#00629F", // main color
		fontSize: 16, // large size
		fontWeight: "bold", // make it bold
		textAlign: "center", // center above image
		textShadowColor: "rgba(0, 0, 0, 0.25)", // subtle shadow
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4,
		letterSpacing: 1, // space between letters
		textTransform: "uppercase", // optional uppercase
		backgroundColor: "white",
		padding: 10,
		borderRadius: 20,
		borderColor: "#00629F",
		borderWidth: 10,
		marginBottom: 20,
	},
	quiz_link: {
		fontSize: 16,
		lineHeight: 24,
		color: "#0066cc",
		textDecorationLine: "underline",
	},
});
export default QuizIntro;
