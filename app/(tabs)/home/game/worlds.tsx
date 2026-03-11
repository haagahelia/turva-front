import { WorldType } from "@/src/types/types";
import { useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { styles } from "./gameStyles";
import { loadHome, loadWorld } from "./quiz-route-functions";
import { API_URL } from "@/src/config/api";

const Worlds = () => {
	const theme = useTheme();
	const { language } = useLanguageStore();
	const uiText = (TextData as any)[language];

	const [isLoading, setLoading] = useState(true);
	const [worlds, setWorlds] = useState<WorldType[]>([]);

	// Function Source: reactnative.dev -> docs -> network
	const getQuizFromApiAsync = async () => {
		try {
			const response = await fetch(`${API_URL}/api/world`);

			if (!response.ok) {
				const text = await response.text();
				throw new Error(`API error ${response.status}: ${text}`);
			}

			const responseJson = await response.json();
			setWorlds(responseJson);
			setLoading(false);
		} catch (error) {
			console.error("Fetch error:", error);
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
					{worlds.map((world) => (
						<View key={world.world_id} style={styles.textContainer}>
							<TouchableOpacity
								style={[
									styles.answer,
									{ backgroundColor: theme.colors.primaryContainer },
								]}
								onPress={() =>
									loadWorld(world.world_id.toString(), world.world_name_en, world.world_name_fi)
								}
							>
								<Text style={styles.textContainerStyle}>
									{language === "en" && world.world_name_en}
									{language === "fi" && world.world_name_fi}
								</Text>
							</TouchableOpacity>
						</View>
					))}

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
