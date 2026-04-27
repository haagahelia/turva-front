import { QuizType } from "@/src/types/types";
import { useLanguageStore, useGameProgressStore} from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { useLocalSearchParams } from "expo-router";
import { View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity, Image, } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { styles } from "./gameStyles";
import { loadQuizIntro, loadWorlds } from "./quiz-route-functions";
import { API_URL } from "@/src/config/api";

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
	console.log(`English: ${world_name_en}`);
	console.log(`Finnish: ${world_name_fi}`);

	const isQuizCompleted = useGameProgressStore(
  		(state) => state.isQuizCompleted	
	);

	// Function Source: reactnative.dev -> docs -> network
	const getQuizFromApiAsync = async () => {
		try {
			// FETCH
			const response = await fetch(`${API_URL}/api/quiz/world/${world_id}/quizzes`);

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
			source={require("@/assets/images/world_background.png")}
			style={{ flex: 1}}>
			<ScrollView 
				contentContainerStyle={{ 		
					alignItems: "center",
					paddingTop: 50
				}}>
				<View>
					<Image source={require("@/assets/images/house_roof.png")}
					style={styles.houseRoof}/>
					<Text style={styles.houseTitle}>
						{language === "en" && world_name_en}
						{language === "fi" && world_name_fi}
					</Text> 
					{/* <Text style={styles.houseText}>{uiText.worlds.clearEachQuiz}</Text> */}
				</View>
				{isLoading ? (
					// STATE 1: JSON CONTENT NOT LOADED
					<View>
						<Text>Fetching and reading Quiz data...</Text>
					</View>
				) : (
					<View>
						{[...quizData].reverse().map((quiz) => {
							const completed = isQuizCompleted(quiz.quiz_id);
							return (
								<View key={quiz.quiz_id}>
									<ImageBackground 
											source={
												completed
													? require("@/assets/images/house_floor_completed.png")
													: require("@/assets/images/house_floor_incompleted.png")
											}
											style={styles.houseFloor}>		
										<TouchableOpacity
											onPress={() =>
												loadQuizIntro(
													quiz.quiz_id.toString(),
													world_id,
													world_name_en,
													world_name_fi
												)
											}
										>
											{completed ? (
												<Text style={styles.houseFloorTextCompleted}>
													{language === "en" && quiz.quiz_name_en}
													{language === "fi" && quiz.quiz_name_fi}
													{<Text> ✅</Text>}
												</Text>
											) : (
												<Text style={styles.houseFloorTextIncompleted}>
													{language === "en" && quiz.quiz_name_en}
													{language === "fi" && quiz.quiz_name_fi}
												</Text>
											)}
										</TouchableOpacity>
									</ImageBackground>
								</View>
							);
						})}	
					</View>
				)}
				<View>
					<Image source={require("@/assets/images/house_ground-floor.png")}
					style={styles.houseGroundfloor}/>
					<Button
						icon="gamepad-variant-outline"
						onPress={() => loadWorlds()}
						style={styles.houseWorldButton}
						mode="contained"
						//override to make the color of the button always as in light theme
						buttonColor="#00629F"
						textColor="#FFFFFF"
					>
						{uiText.worlds.backToWorldList}
					</Button>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default World;