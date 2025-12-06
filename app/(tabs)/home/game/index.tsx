import { useLanguageStore, useOnboardingStore } from "@/src/zustand/store";
import TextData from "@/static/gameTexts.json";
import { MotiImage } from "moti";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { styles } from "./gameStyles";
import { loadWorlds } from "./quiz-route-functions";

type OnboardingData = {
	title: string;
	description: string[];
};

const Onboarding = () => {
	const theme = useTheme();
	const { language } = useLanguageStore();
	const text = TextData[language].common;

	const [key, setKey] = useState(0);
	const [index, setIndex] = useState(0);
	
	const {
		hasCompletedGameOnboarding,
		completeGameOnboarding,
		resetGameOnboarding
	} = useOnboardingStore();

	const onboarding: OnboardingData[] = TextData[language].onboarding;
	const current = onboarding[index];

	// Scroll to the top feature. Source: User Apperside on Stack Overflow. Jul 5, 2021. React native reset ScrollView to the top after render
	// https://stackoverflow.com/questions/68252416/react-native-reset-scrollview-to-the-top-after-render
	const scrollViewRef = useRef<ScrollView>(null);

	useEffect(() => {
		if (hasCompletedGameOnboarding) {
			loadWorlds();
			//resetGameOnboarding(); //FOR DEV PURPOSES ONLY! RESETS ONBOARDING EVERY TIME YOU ENTER GAME
			//console.log(hasCompletedGameOnboarding);
		}
	}, [hasCompletedGameOnboarding]);



	const handleNext = () => {
		if (index < onboarding.length - 1) {
			setIndex(index + 1);
		}
		if (index === onboarding.length - 1) {
			loadWorlds();
			completeGameOnboarding();
		}
		scrollViewRef.current?.scrollTo(0, 0, true);
	};
	const handlePrevious = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
		scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
	};

	return (
		<View style={styles.container}>
			<MotiImage
				key={`image-${key}`}
				source={require("../../../../assets/images/HH_SafetyCharacters.png")}
				style={styles.wideImage}
				from={{ opacity: 0, translateY: -10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ type: "timing", duration: 500 }}
				resizeMode="contain"
			/>
			<ScrollView style={styles.flex2} ref={scrollViewRef}>
				{/* Current onboarding step */}

				{/* Map through each description line */}

				<Text
					variant="headlineMedium"
					style={[styles.basicTitle, { color: theme.colors.onBackground }]}
				>
					{current.title}
				</Text>

				{current.description.map((line, i) => (
					<Text key={i} variant="bodyLarge" style={styles.description}>
						{line}
					</Text>
				))}
				<Button mode="contained" onPress={handleNext} style={styles.button}>
					{index === onboarding.length - 1 ? text.ready : text.next}
				</Button>
				{index > 0 && (
					<Button onPress={handlePrevious} style={styles.button}>
						{text.back}
					</Button>
				)}
			</ScrollView>
		</View>
	);
};

export default Onboarding;
