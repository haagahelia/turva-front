import { QuizType } from "@/src/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const World = () => {
	const theme = useTheme();
	const [isLoading, setLoading] = useState(true);
	const [quizData, setQuizData] = useState<QuizType[]>([]);

	const { world_id } = useLocalSearchParams<{ world_id: string }>();
	console.log("World ID after loading World.tsx:");
	console.log(world_id);

	const { world_name } = useLocalSearchParams<{ world_name: string }>();
	console.log("World Name after loading World.tsx:");
	console.log(world_name);

	

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

	const loadQuiz = (quiz_id: number) => {
		console.log("BUTTON PRESSED!");
		console.log(quiz_id);
		router.push({
			pathname: "./quiz-introduction",
			params: {
				quiz_id: quiz_id,
				world_id: world_id,
			},
		});
	};

	const loadWorlds = () => {
		console.log("BUTTON PRESSED!");
		router.push({
			pathname: "./worlds",
		});
	};

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
				<Text style={styles.textContainer}>{world_name}</Text>
				<Text style={styles.textContainer}>
					Clear each Quiz in this World!{" "}
				</Text>

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
									onPress={() => loadQuiz(quiz.quiz_id)}
								>
									<Text style={styles.textContainerStyle}>
										{quiz.quiz_name}
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
					Back to Worlds List
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
