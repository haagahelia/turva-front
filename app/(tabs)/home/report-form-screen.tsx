import { ReportType } from "@/src/content/reportContent";
import { ReportField, reportFields, reportSubmitButtonText } from "@/src/content/reportFormFields";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type FormState = Record<string, string>;

export default function ReportFormScreen() {
    const theme = useTheme();
    const { type, lang } = useLocalSearchParams<{ type: string; lang: string }>();
    const reportType: ReportType = type === "harassment" ? "harassment" : "security";

    const fields: ReportField[] = reportFields[reportType];

    // Initialize form state with all field names as keys and empty strings
    const [formState, setFormState] = useState<FormState>(
        Object.fromEntries(fields.map(f => [f.name, ""])) as FormState
    );

    // Reset formState whenever reportType changes
    useEffect(() => {
        const newFields = reportFields[reportType];
        setFormState(Object.fromEntries(newFields.map(f => [f.name, ""])) as FormState);
    }, [reportType]);


    // Hardcode language for now
    const language: "en" | "fi" = lang === "fi" ? "fi" : "en";

    const handleChange = (name: string, value: string) => {
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        for (const field of fields) {
            const value = formState[field.name] || "";

            if (field.required && !value.trim()) {
                Alert.alert("Error", `${field.label[language]} is required`);
                return;
            }

            // Validate date in DD-MM-YYYY format
            if (field.name === "date") {
                const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
                if (!dateRegex.test(value)) {
                    Alert.alert("Error", `${field.label[language]} must be in DD-MM-YYYY format`);
                    return;
                }
            }
        }

        console.log("Form submitted:", formState);
        Alert.alert("Success", "Form submitted (check console for data)");
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={[]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"} // padding works best for iOS, height for Android
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // adjust it
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

                    {/* Image */}
                    <Image
                        source={require("../../../assets/images/HH_SafetyIcon1_green.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    {fields.map((field: ReportField) => (
                        <View key={field.name} style={styles.fieldContainer}>
                            <Text style={[styles.label, { color: theme.colors.onBackground }]}>{field.label[language]}</Text>

                            {(field.type === "text" || field.type === "textarea") && (
                                <TextInput
                                    style={[styles.input, { borderColor: theme.colors.primary, color: theme.colors.onBackground }]}
                                    placeholder={field.placeholder?.[language]}
                                    placeholderTextColor={theme.colors.onSurfaceVariant ?? "gray"}
                                    value={formState[field.name] || ""}
                                    onChangeText={(text) => handleChange(field.name, text)}
                                    multiline={field.type === "textarea"}
                                />
                            )}

                            {field.type === "select" && field.options && (
                                <View style={styles.selectContainer}>
                                    {field.options.map(option => (
                                        <TouchableOpacity
                                            key={option[language]}
                                            style={[
                                                styles.option,
                                                formState[field.name] === option[language] && { backgroundColor: theme.colors.primary }
                                            ]}
                                            onPress={() => handleChange(field.name, option[language])}
                                        >
                                            <Text style={{ color: formState[field.name] === option[language] ? theme.colors.onPrimary : theme.colors.onBackground }}>
                                                {option[language]}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {field.type === "file" && (
                                <Text style={{ fontStyle: "italic", color: "gray" }}>File upload not implemented yet</Text>
                            )}
                        </View>
                    ))}

                    <TouchableOpacity
                        style={[styles.submitBtn, { backgroundColor: theme.colors.primary }]}
                        onPress={handleSubmit}
                    >
                        <Text style={[styles.submitText, { color: theme.colors.onPrimary }]}>
                            {reportSubmitButtonText[language]}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 16,
        paddingBottom: 80,
        paddingTop: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: "600",
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    selectContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "gray",
        marginRight: 8,
        marginBottom: 8,
    },
    submitBtn: {
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: "center",
    },
    submitText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 16,
        marginBottom: 20,
    },
});
