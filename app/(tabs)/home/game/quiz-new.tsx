import { Answer, QuizType } from "@/src/types/types";
import mock_json from "@/static/mock_quiz_1.json";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, useTheme } from "react-native-paper";
import QuizAnswer from "./quiz-answer";
import QuizQuestion from "./quiz-question";

const QuizNew = () => {
  const theme = useTheme();
  const quizData = mock_json as unknown as QuizType;
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const toggleSelected = (answer: Answer) => {
    setSelectedAnswers((prev) => {
        const exists = prev.find(
            (item) =>
                item.question_id === answer.question_id && item.id === answer.id
        ) as Answer;
        // Unselect - remove from array
        if (exists) {
            return prev.filter(
                (item) =>
                    !(item.question_id === answer.question_id && item.id === answer.id)
            ) as Answer[];
            // Select - add to array
        } else {
            return [...prev, answer];
        }
    });
  };

const isAnswerSelected = (answer: Answer) => {
    return selectedAnswers.some(
        (item) => item.question_id === answer.question_id && item.id === answer.id
    );
};

  return (
    <ScrollView>
    	<View style={{ backgroundColor: theme.colors.primary, width: "100%" }}>
            <Text variant='headlineSmall'>{mock_json.intro.title} </Text>
            <Text>{mock_json.intro.en_text}</Text>
		</View>
      {quizData.sections.map((question) => (
        <View key={question.id} style={{ marginBottom: 24 }}>
          <QuizQuestion
            id={question.id}
            type={question.type}
            order={question.order}
            en_text={question.en_text}
            fin_text={question.fin_text}
            answers={question.answers}
          />
            {question.answers.map((answer) => {
            const fullAnswer = { ...answer, question_id: question.id };
            return (
                <QuizAnswer
                key={answer.id}
                answer={fullAnswer}
                isSelected={isAnswerSelected(fullAnswer)}
                onSelect={toggleSelected}
                />
            );
            })}
        </View>
      ))}
        <Button
        onPress={() =>
            router.push({
            pathname: "/(tabs)/home/game/results",
            params: {
                answers: JSON.stringify(selectedAnswers), 
            },
            })
        }
        >
        End quiz
        </Button>
    </ScrollView>
  );
};

export default QuizNew;
