import { API_URL } from "@/src/config/api";
import { WorldType } from "@/src/types/types";
import { useGameProgressStore, useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity, Image, useWindowDimensions} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { styles } from "./gameStyles";
import { loadHome, loadWorld } from "./quiz-route-functions";

const Worlds = () => {
	const { width, height } = useWindowDimensions();
	const theme = useTheme();
	const { language } = useLanguageStore();
	const uiText = (TextData as any)[language];
	const resetGameProgress = useGameProgressStore((state) => state.resetGameProgress);
	const completeWorld = useGameProgressStore((state) => state.completeWorld);
	const [isLoading, setLoading] = useState(true);
	const [worlds, setWorlds] = useState<WorldType[]>([]);
	const [quizzes, setQuizzes] = useState([]);

	const isWorldUnlocked = useGameProgressStore(
		(state) => state.isWorldUnlocked
	);

	const isWorldCompleted = useGameProgressStore(
  		(state) => state.isWorldCompleted	
	);

	// Function Source: reactnative.dev -> docs -> network
	const getWorldsFromApiAsync = async () => {
		try {
			// DEV RESET - RESETS GAME PROGRESS EVERY TIME YOU ENTER WORLDS - REMOVE "//" WHEN NEEDED!
			//resetGameProgress();
			// DEV COMPLETE - SETS WORLD(ID) COMPLETE AND ALL THE WORLDS BEFORE IT - REMOVE "//" WHEN NEEDED!
			//completeWorld(2, worlds);
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

	const getWorldImage = (worldId: number, unlocked: boolean, completed: boolean) => {
  		if (completed) {
    		return require("@/assets/images/world_completed.png");
  		}
  		if (unlocked) {
    		return require("@/assets/images/world_unlocked.png");
  		}
  			return require("@/assets/images/world_locked.png");
		};

	const worldPositions: Record<number, { x: number; y: number }> = {
  		1: { x: 0.18, y: 0.35 },
		2: { x: 0.4, y: 0.32 },
  		3: { x: 0.62, y: 0.28 },
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
			source={require("@/assets/images/world_navigation_background.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<View>
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
					<View style={{ position: "relative" }}>
						{worlds.map((world) => {
							const unlocked = isWorldUnlocked(world.world_id, worlds, quizzes);
							const completed = unlocked && isWorldCompleted(world.world_id, quizzes);
							const coord = worldPositions[world.world_id];
							return (
								<View
									key={world.world_id}
									style={{
  										position: "absolute",
										top: height * coord.y,
										left: width * coord.x,
									}}
								>
									<TouchableOpacity
										disabled={!unlocked}
										onPress={() =>
											unlocked &&
											loadWorld(
												world.world_id.toString(),
												world.world_name_en,
												world.world_name_fi
											)
										}
									>	
										<Image 
											source={getWorldImage(world.world_id, unlocked, completed)}
											style={styles.worldImage}
										/>
									</TouchableOpacity>
									<Text style={styles.worldText}>
										{language === "en" && world.world_name_en}
										{language === "fi" && world.world_name_fi}
										{!unlocked && "🔒"}
									</Text>
								</View>
							)
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
			</View>
		</ImageBackground>
	);
};

export default Worlds;