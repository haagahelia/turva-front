import { WorldType } from "@/src/types/types";
import { router } from "expo-router";
import { View } from "moti";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const Worlds = () => {
	const theme = useTheme();
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

	const loadWorld = (world_id: number) => {
		console.log("BUTTON PRESSED!");
		console.log(world_id);
		router.push({
			pathname: "./world",
			params: { world_id: world_id },
		});
	};

	return (
		<ImageBackground
			source={require("@/assets/images/WorldNavigation.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<Text>This is the worlds screen</Text>
			<Text>
				From here, the user should be able to access different levels / quizzes
				in the game{" "}
			</Text>
			<Button
				onPress={() => router.push("/home/game/quiz-introduction")}
				style={styles.button}
			>
				To the quiz 1
			</Button>

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
								onPress={() => loadWorld(world.world_id)}
							>
								<Text style={styles.textContainerStyle}>
									{world.world_name}
								</Text>
							</TouchableOpacity>
						</View>
					))}
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
