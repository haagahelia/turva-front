import { Image, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { router } from "expo-router";

export default function SecurityReport() {

    const theme = useTheme();

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
            edges={[]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                contentInsetAdjustmentBehavior="never"
            >

                {/* Image */}
                <Image
                    source={require("@/assets/images/HH_FireSafety.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                {/* Title + Description */}
                <Text style={[styles.title, { color: theme.colors.onBackground }]}>
                    Sattuiko läheltä piti -tilanne tai
                    huomasitko putteen, joka vaikuttaa
                    turvallisuuteen Haaga-Heliassa?
                </Text>
                <Text style={[styles.description, { color: theme.colors.onBackground }]}>
                    Turvallisuushavaintoilmoitus on luottamuksellinen.
                    Kun teet ilmoituksen, se menee Haaga-Helian turvallisuuspäällikölle, joka edistää asian selvittämistä.
                    Kaikkiin palautteisiin reagoidaan.
                </Text>

                {/* Button to the report */}
                <Button
                    icon="file-document-edit"
                    //onPress={() => router.push("/home/game/quiz")}
                    style={styles.button}
                    mode="contained"
                    labelStyle={{ fontSize: 18 }}
                >
                    Tee turvallisuushavaintoilmoitus
                </Button>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 16,
        marginTop: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        borderRadius: 24,
        alignSelf: "center",
        marginBottom: 20,
    },
});
