import { router } from "expo-router";

export const loadHome = () => {
	console.log("HOME Button pressed!");
	router.push({
		pathname: "/(tabs)/home",
	});
};

export const loadWorlds = () => {
	console.log("Worlds BUTTON PRESSED!");
	router.push({
		pathname: "/(tabs)/home/game/worlds",
	});
};
export const loadWorld = (
	world_id: string,
	world_name_en: string,
	world_name_fi: string
) => {
	console.log("World BUTTON PRESSED!");
	console.log(world_id);
	router.push({
		pathname: "/(tabs)/home/game/world",
		params: {
			world_id: world_id,
			world_name_en: world_name_en,
			world_name_fi: world_name_fi,
		},
	});
};

export const loadQuizIntro = (
	quiz_id: string,
	world_id: string,
	world_name_en: string,
	world_name_fi: string
) => {
	console.log("Quiz Intro BUTTON PRESSED!");
	console.log(quiz_id);
	router.push({
		pathname: "/(tabs)/home/game/quiz-introduction",
		params: {
			quiz_id: quiz_id,
			world_id: world_id,
			world_name_en: world_name_en,
			world_name_fi: world_name_fi,
		},
	});
};

export const loadQuiz = (
	quiz_id: string,
	world_id: string,
	world_name_en: string,
	world_name_fi: string
) => {
	console.log("Quiz BUTTON PRESSED!");
	console.log(quiz_id);
	router.push({
		pathname: "./quiz",
		params: { 
			quiz_id: quiz_id, 
			world_id: world_id, 
			world_name_en: world_name_en,
			world_name_fi: world_name_fi  
		},
	});
};

export const loadResultsScreen = (
	quiz_id: string,
	world_id: string,
	world_name_en: string,
	world_name_fi: string,
	answers: string
) => {
	console.log("Results BUTTON PRESSED!");
	console.log(quiz_id);
	router.push({
		pathname: "./results",
		params: {
			quiz_id: quiz_id,
			answers: answers,
			world_id: world_id,
			world_name_en: world_name_en,
			world_name_fi: world_name_fi
		},
	});
};
