import { Answer } from "@/src/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";


const Results = () => {
    const { answers } = useLocalSearchParams<{ answers: string }>();

    const selectedAnswers: Answer[] = JSON.parse(answers);
    const correctCount = selectedAnswers.filter((a) => a.is_correct).length;
    const totalCount = selectedAnswers.length; // total number of questions

    return (
        <ImageBackground
            source={require("@/assets/images/WorldOne_background.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <View>

                <Image
                    source={require("@/assets/images/W1_Q1_intro.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text>You got {correctCount}/{totalCount} points</Text>

                <Button onPress={() => router.push('/(tabs)/home/game/worlds')}>Back to world screen</Button>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    image: {
        marginTop: 200,
        width: 250,
        height: 250,
        marginBottom: 20,
        alignSelf: "center",
    },
});
export default Results;