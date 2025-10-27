import { Answer } from '@/src/types/types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface QuizAnswerProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: (answer: Answer) => void;
}

const QuizAnswer = ({ answer, isSelected, onSelect }: QuizAnswerProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.answer,
        { backgroundColor: theme.colors.primaryContainer },
        isSelected && styles.selectedAnswer,
      ]}
      onPress={() => onSelect(answer)}>
      <Text>{answer.en_text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  answer: {
    padding: 16,
    borderRadius: 20,
    marginVertical: 6,
  },
  selectedAnswer: {
    borderWidth: 2,
    borderColor: 'orange',
  },
});

export default QuizAnswer;
