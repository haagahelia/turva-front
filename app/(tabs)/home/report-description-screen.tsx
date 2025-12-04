import { reportContent, ReportType } from "@/src/content/reportContent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguageStore } from "../../../src/zustand/store";

export default function SecurityReport() {
    const theme = useTheme();
    const router = useRouter();

    // Get the type from the route, e.g. ?type=security or ?type=harassment
    const { type } = useLocalSearchParams<{ type: ReportType }>();
    const reportType: ReportType = type === "harassment" ? "harassment" : "security";

    const data2 = reportContent[reportType];

    // We will add language switching later. Hardcoded FI or EN here:
    const { language } = useLanguageStore();
    const data = data2;

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
            edges={[]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* IMAGE */}
                <Image
                    key={reportType}
                    source={data.image}
                    style={styles.image}
                    resizeMode="contain"
                />

                {/* TITLE */}
                <Text style={[styles.title, { color: theme.colors.onBackground }]}>
                    {data.title[language]}
                </Text>

                {/* DESCRIPTION */}
                <Text style={[styles.description, { color: theme.colors.onBackground }]}>
                    {data.description[language]}
                </Text>

                {/* DESCRIPTION 2*/}
                {data.description2 && (
                    <Text style={[styles.description2, { color: theme.colors.onBackground }]}>
                        {data.description2[language]}
                    </Text>
                )}

                {/* BUTTON */}
                <Button
                    icon="file-document-edit"
                    mode="contained"
                    style={styles.button}
                    labelStyle={{ fontSize: 18 }}
                    onPress={() => {
                        router.push(`/home/report-form-screen?type=${reportType}&lang=${language}` as any);
                    }}
                >
                    {data.buttonText[language]}
                </Button>


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        alignItems: "center",
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
        marginBottom: 30,
        textAlign: "center",
    },
    description2: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: "center",
        fontWeight: "bold",
    },
    button: {
        borderRadius: 24,
        alignSelf: "center",
        marginBottom: 20,
    },
});
