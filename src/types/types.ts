export interface Contact {
  name: string;
  role: string;
  phone: string;
}

export interface QuizType {
	id: string;
	sections: Question[];
}

export interface Question {
	id: string;
	type: string;
	order: number;
	en_text: string;
	fin_text: string;
	answers: Answer[];
}

export interface Answer {
	id: string;
	question_id: string;
	en_text: string;
	fin_text: string;
	is_correct: boolean;
}

export interface SectionListItem {
	question: Question;
	title: string;
	data: Answer[];
}