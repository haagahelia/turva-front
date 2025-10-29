import { Question } from "@/src/types/types";
import { View } from "react-native";
import { Text } from "react-native-paper";

const QuizQuestion = ( { title, content }: Question) => {

    return (
        <View>
            <Text variant='headlineSmall'>{title} </Text>
            <Text>{content}</Text>
        </View>
    );
}


export default QuizQuestion;