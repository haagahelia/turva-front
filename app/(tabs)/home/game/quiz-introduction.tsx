import { QuizLang, Section } from "@/src/types/types";
import TextData from "@/static/gameTexts.json";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";

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

	const lang = "fi";
	const [isLoading, setLoading] = useState(true);
	const [quizData, setQuizData] = useState<QuizLang | null>(null);
	const uiText = (TextData as any)[lang];

	const { quiz_id } = useLocalSearchParams<{ quiz_id: string }>();
	console.log("Quiz ID after loading Quiz-introduction.tsx:");
	console.log(quiz_id);

	const { world_id } = useLocalSearchParams<{ world_id: string }>();
	console.log("World ID after loading Quiz-introduction.tsx:");
	console.log(world_id);

	const { world_name } = useLocalSearchParams<{ world_name: string }>();
	console.log("World Name after loading Quiz-introduction.tsx:");
	console.log(world_name);

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

	const loadQuiz = () => {
		console.log("BUTTON PRESSED!");
		console.log(quiz_id);
		router.push({
			pathname: "./quiz",
			params: { quiz_id: quiz_id, world_id: world_id, world_name: world_name },
		});
	};

	const loadWorld = () => {
		console.log("BUTTON PRESSED!");
		console.log(world_id);
		router.push({
			pathname: "./world",
			params: {
				world_id: world_id,
				world_name: world_name,
			},
		});
	};

	const quizIntroParser = (section: Section) => {
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

			case "link":
				return (
					<View key={section.title} style={styles.textContainer}>
						<Text style={styles.textContainerStyle}>{section.content}</Text>
					</View>
				);

			case "image":
				return (
					<View key={section.title} style={styles.textContainer}>
						<Text style={styles.textContainerStyle}>{section.content}</Text>
					</View>
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
						<Image
							source={require("@/assets/images/W1_Q1_intro.png")}
							style={styles.image}
							resizeMode="contain"
						/>

						{/* <Text style={styles.title}>
          {quizData.quiz_intro_title}
        </Text> */}

						{quizData?.quiz_intro.map((section) => quizIntroParser(section))}

						<Button
							icon="gamepad-variant-outline"
							onPress={() => loadQuiz()}
							style={styles.button}
							mode="contained"
							//override to make the color of the button always as in light theme
							buttonColor="#00629F"
							textColor="#FFFFFF"
						>
							{uiText.common.start}
						</Button>

						<Button
							icon="gamepad-variant-outline"
							onPress={() => loadWorld()}
							style={styles.button}
							mode="contained"
							//override to make the color of the button always as in light theme
							buttonColor="#00629F"
							textColor="#FFFFFF"
						>
							Back to World
						</Button>
					</View>
				)}
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
		marginBottom: 20,
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
	image: {
		marginTop: 190,
		width: 250,
		height: 250,
		marginBottom: 20,
		alignSelf: "center",
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
});
export default QuizIntro;
