export interface Contact {
	name: string;
	role: string;
	phone: string;
}

export interface QuizType {
	fi: QuizLang;
	en: QuizLang;
}

export interface QuizLang {
	quiz_intro_title?: string; // optional title for the whole intro
	quiz_intro: Section[];
	questions: Question[];
}

export type Language = 'en' | 'fi';

//Onboarding - TextData.json

export interface TextData {
	fi: TextLang;
	en: TextLang;
}

export interface TextLang {
	title: string;
	onboarding: OnboardingItem[];
	common: CommonTexts;
}

export interface OnboardingItem {
	title: string;
	description: string[];
}

export interface CommonTexts {
	answerAll: string;
	end: string;
	start: string;
}

//Quiz Structure

export interface Section {
	title: string;
	type: string;
	content: string;
}

export interface Question {
	title: string;
	type: string;
	content: string;
	answers: Answer[];
}

export interface Answer {
	title: string;
	question_title: string;
	content: string;
	is_correct: boolean;
}

export interface SectionListItem {
	question: Question;
	title: string;
	data: Answer[];
}

//Results Texts

export interface ResultsTexts {
	en: Record<string, WorldResults>; //we can use different text for result screens in different worlds
	fi: Record<string, WorldResults>;
}

export interface WorldResults {
	title: string;
	allCorrectText: string;
	notAllCorrectText: string;
	allCorrectButton: string;
	notAllCorrectButton: string;
}
