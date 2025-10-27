import { Answer } from "@/src/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";


const Results = () => {
  const { answers } = useLocalSearchParams<{ answers: string }>();

  const selectedAnswers: Answer[] = JSON.parse(answers);
  const correctCount = selectedAnswers.filter((a) => a.is_correct).length;
    return (
        <View>
            <Text>You got {correctCount} points</Text>
            <Button onPress={() => router.push('/(tabs)/home/game/worlds')}>Back to world screen</Button>
        </View>
    );
}
export default Results;