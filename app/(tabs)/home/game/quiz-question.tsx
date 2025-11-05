import { Question } from "@/src/types/types";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const QuizQuestion = ( { title, content }: Question) => {

    return (
        <View>
            <Text variant='titleLarge' style={styles.question}>{title}: {content} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    question: {
        margin: 10,
    }

});

export default QuizQuestion;