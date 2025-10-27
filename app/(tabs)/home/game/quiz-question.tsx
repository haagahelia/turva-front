import { Question } from "@/src/types/types";
import { View } from "react-native";
import { Text } from "react-native-paper";

const QuizQuestion = ( { id, en_text }: Question) => {

    return (
        <View>
            <Text variant='headlineSmall'>{id} </Text>
            <Text>{en_text}</Text>
        </View>
    );
}


export default QuizQuestion;