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
	quiz_intro: Section[];
	questions: Question[];
}

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
