import { QuizType } from "@/src/types/types";
import { useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { loadQuizIntro, loadWorlds } from "./quiz-route-functions";

const World = () => {
	const theme = useTheme();
	const { language } = useLanguageStore();
	const uiText = (TextData as any)[language];

	const [isLoading, setLoading] = useState(true);
	const [quizData, setQuizData] = useState<QuizType[]>([]);

	const { world_id } = useLocalSearchParams<{ world_id: string }>();
	console.log("World ID after loading World.tsx:");
	console.log(world_id);

	const { world_name_en } = useLocalSearchParams<{ world_name_en: string }>();
	const { world_name_fi } = useLocalSearchParams<{ world_name_fi: string }>();
	console.log("World Name after loading World.tsx:");
	console.log(world_name_en, world_name_fi);

	// Function Source: reactnative.dev -> docs -> network
	const getQuizFromApiAsync = async () => {
		try {
			// FETCH
			const response = await fetch(
				`https://turva-back-softala-turvallisuus-app.2.rahtiapp.fi/api/quiz/world/${world_id}/quizzes`
			);

			// READ response as JSON
			console.log(response);
			const responseJson = await response.json();
			console.log("Response:");
			console.log(responseJson);

			setQuizData(responseJson);

			// TOGGLE Loading state OFF
			setLoading(false);
			return responseJson;

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

	return (
		<ImageBackground
			source={require("@/assets/images/WorldNavigation.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<ScrollView
				style={styles.scrollViewStyle}
				contentContainerStyle={styles.contentContainer}
			>
				<Text style={styles.textContainer}>
					{language === "en" && world_name_en}
					{language === "fi" && world_name_fi}
				</Text>
				<Text style={styles.textContainer}>{uiText.worlds.clearEachQuiz}</Text>

				{isLoading ? (
					// STATE 1: JSON CONTENT NOT LOADED
					<View>
						<Text>Fetching and reading Quiz data...</Text>
					</View>
				) : (
					<View>
						{quizData?.map((quiz) => (
							<View key={quiz.quiz_id} style={styles.textContainer}>
								<TouchableOpacity
									style={[
										styles.answer,
										{ backgroundColor: theme.colors.primaryContainer },
									]}
									onPress={() =>
										loadQuizIntro(
											quiz.quiz_id.toString(),
											world_id,
											world_name_en,
											world_name_fi
										)
									}
								>
									<Text style={styles.textContainerStyle}>
										{language === "en" && quiz.quiz_name_en}
										{language === "fi" && quiz.quiz_name_fi}
									</Text>
								</TouchableOpacity>
							</View>
						))}
					</View>
				)}

				<Button
					icon="gamepad-variant-outline"
					onPress={() => loadWorlds()}
					style={styles.button}
					mode="contained"
					//override to make the color of the button always as in light theme
					buttonColor="#00629F"
					textColor="#FFFFFF"
				>
					{uiText.worlds.backHome}
				</Button>
			</ScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	button: {
		borderRadius: 24,
		marginTop: 8,
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
	answer: {
		padding: 16,
		borderRadius: 20,
		marginVertical: 6,
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
});

export default World;
