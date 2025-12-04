import { Answer } from '@/src/types/types';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { styles } from './gameStyles';

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
        isSelected && styles.selectedAnswer, {borderBlockColor: theme.colors.secondary} ,
      ]}
      onPress={() => onSelect(answer)}>
      <Text variant='bodyMedium'>{answer.content}</Text>
    </TouchableOpacity>
  );
};



export default QuizAnswer;
