import { API_URL } from "@/src/config/api";
import { WorldType } from "@/src/types/types";
import { useGameProgressStore, useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { styles } from "./gameStyles";
import { loadHome, loadWorld } from "./quiz-route-functions";

const Worlds = () => {
	const theme = useTheme();
	const { language } = useLanguageStore();
	const uiText = (TextData as any)[language];

	const [isLoading, setLoading] = useState(true);
	const [worlds, setWorlds] = useState<WorldType[]>([]);

	const [quizzes, setQuizzes] = useState([]);

	const isWorldUnlocked = useGameProgressStore(
		(state) => state.isWorldUnlocked
	);

	// Function Source: reactnative.dev -> docs -> network
	const getWorldsFromApiAsync = async () => {
		try {
			const response = await fetch(`${API_URL}/api/world`);

			if (!response.ok) {
				const text = await response.text();
				throw new Error(`API error ${response.status}: ${text}`);
			}

			const responseJson = await response.json();
			setWorlds(responseJson);
		} catch (error) {
			console.error("World fetch error:", error);
		}
	};

	const getQuizzesFromApiAsync = async () => {
		try {
			const response = await fetch(`${API_URL}/api/quiz`);

			if (!response.ok) {
				const text = await response.text();
				throw new Error(`API error ${response.status}: ${text}`);
			}

			const responseJson = await response.json();
			setQuizzes(responseJson);
		} catch (error) {
			console.error("Quiz fetch error:", error);
		}
	};

	useEffect(() => {
		const loadData = async () => {
			await getWorldsFromApiAsync();
			await getQuizzesFromApiAsync();
			setLoading(false);
		};

		loadData();
	}, []);

	return (
		<ImageBackground
			source={require("@/assets/images/WorldNavigation.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<ScrollView>
				<Text style={[styles.textContainer, styles.bold]}>{uiText.worlds.title}</Text>
				<Text style={styles.textContainer}>
					{uiText.worlds.explanation}
				</Text>

				{isLoading ? (
					// STATE 1: JSON CONTENT NOT LOADED
					<View>
						<Text>Fetching and reading Quiz data...</Text>
					</View>
				) : (
					<View>
						{worlds.map((world) => {
							const unlocked = isWorldUnlocked(world.world_id, worlds, quizzes);

							return (
								<View key={world.world_id} style={styles.textContainer}>
									<TouchableOpacity
										disabled={!unlocked}
										style={[
											styles.answer,
											{
												backgroundColor: unlocked
													? theme.colors.primaryContainer
													: "#999",
												opacity: unlocked ? 1 : 0.5,
											},
										]}
										onPress={() =>
											unlocked &&
											loadWorld(
												world.world_id.toString(),
												world.world_name_en,
												world.world_name_fi
											)
										}
									>
										<Text style={styles.textContainerStyle}>
											{language === "en" && world.world_name_en}
											{language === "fi" && world.world_name_fi}
											{!unlocked && " 🔒"}
										</Text>
									</TouchableOpacity>
								</View>
							);
						})}

						<Button
							icon="gamepad-variant-outline"
							onPress={() => loadHome()}
							style={styles.button}
							mode="contained"
							//override to make the color of the button always as in light theme
							buttonColor="#00629F"
							textColor="#FFFFFF"
						>
							{uiText.worlds.backHome}
						</Button>
					</View>
				)}
			</ScrollView>
		</ImageBackground>
	);
};

export default Worlds;
