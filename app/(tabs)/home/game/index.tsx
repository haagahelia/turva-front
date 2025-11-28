import { MotiImage } from "moti";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import TextData from "./textData.json";

type OnboardingData = {
	title: string;
	description: string[];
};

const Onboarding = () => {
	const theme = useTheme();
	const [key, setKey] = useState(0);
	const [index, setIndex] = useState(0);

	const onboarding: OnboardingData[] = TextData.fi.onboarding;
	const current = onboarding[index];

	// Scroll to the top feature. Source: User Apperside on Stack Overflow. Jul 5, 2021. React native reset ScrollView to the top after render
	// https://stackoverflow.com/questions/68252416/react-native-reset-scrollview-to-the-top-after-render
	const scrollViewRef = useRef<ScrollView>(null);

	const handleNext = () => {
		if (index < onboarding.length - 1) {
			setIndex(index + 1);
		}
		if (index === onboarding.length - 1) {
			router.push("/(tabs)/home/game/worlds");
		}
		scrollViewRef.current?.scrollTo(0, 0, true);
	};
	const handlePrevious = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
		scrollViewRef.current?.scrollTo(0, 0, true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<MotiImage
				key={`image-${key}`}
				source={require("../../../../assets/images/HH_SafetyCharacters.png")}
				style={styles.image}
				from={{ opacity: 0, translateY: -10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ type: "timing", duration: 500 }}
				resizeMode="contain"
			/>
			{/* Current onboarding step */}
			<View style={styles.textContainer}>
				{/* Map through each description line */}
				<ScrollView style={styles.textContainer} ref={scrollViewRef}>
					<Text
						variant="headlineMedium"
						style={[styles.title, { color: theme.colors.onBackground }]}
					>
						{current.title}
					</Text>

					{current.description.map((line, i) => (
						<Text key={i} variant="bodyLarge" style={styles.description}>
							{line}
						</Text>
					))}
					<Button mode="contained" onPress={handleNext} style={styles.button}>
						{index === onboarding.length - 1 ? "Valmiina!" : "Jatka"}
					</Button>
					{index > 0 && (
						<Button onPress={handlePrevious} style={styles.button}>
							Takaisin
						</Button>
					)}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "space-between",
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		marginBottom: 16,
	},
	button: {
		borderRadius: 24,
		marginTop: 8,
	},
	image: {
		width: "100%",
		height: 280,
		borderRadius: 16,
		marginBottom: 16,
	},
	textContainer: {
		flex: 2,
	},
});

export default Onboarding;
