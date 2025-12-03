import { WorldType } from "@/src/types/types";
import { useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { loadHome, loadWorld } from "./quiz-route-functions";

const Worlds = () => {
	const theme = useTheme();
	const { language } = useLanguageStore();
	const uiText = (TextData as any)[language];

	const [isLoading, setLoading] = useState(true);
	const [worlds, setWorlds] = useState<WorldType[]>([]);

	// Function Source: reactnative.dev -> docs -> network
	const getQuizFromApiAsync = async () => {
		try {
			// FETCH
			const response = await fetch(
				"https://turva-back-softala-turvallisuus-app.2.rahtiapp.fi/api/world"
			);

			// READ response as JSON
			const responseJson = await response.json();
			console.log("Response:");
			console.log(responseJson);
			// EXTRACT the Quiz content data
			setWorlds(responseJson);

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
			<Text style={styles.textContainer}>{uiText.worlds.title}</Text>
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
});

export default Worlds;
