import { Question } from "@/src/types/types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./gameStyles";

const QuizQuestion = ( { title, content }: Question) => {

    return (
        <View>
            <Text variant='titleLarge' style={styles.question}>{title}: {content} </Text>
        </View>
    );
}



export default QuizQuestion;