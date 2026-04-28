// app/(auth)/login.tsx
import { useLanguageStore } from "@/src/zustand/store";
import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Surface, TextInput, Title, useTheme } from "react-native-paper";

type Language = "en" | "fi";

const LOGIN_ROUTE: Href = "/(auth)/login"

type SignupText = {
    title: string
    email: string
    password: string
    confirm: string
    signup: string
}

const SignupTexts: Record<Language, SignupText> = {
    en: {
        title: "Sign up",
        email: "Email",
        password: "Password",
        confirm: "Confirm password",
        signup: "Sign up",
    },
    fi: {
        title: "Rekisteröidy",
        email: "Sähköposti",
        password: "Salasana",
        confirm: "Vahvista salasana",
        signup: "Rekisteröidy",
    },
};

export default function SignupScreen() {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const navigation = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const language = useLanguageStore((state) => state.language) as Language;
    const text = SignupTexts[language];

    return (
        <ImageBackground
            source={require("../../assets/images/Login_Page.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Go back to last onboarding step"
                            onPress={() => navigation.replace(LOGIN_ROUTE)}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed ? styles.backButtonPressed : null,
                                { backgroundColor: theme.colors.surfaceVariant },
                            ]}
                        >
                            <Feather name="arrow-left" size={20} color={theme.colors.onSurface} />
                        </Pressable>
                    </View>
                    <View style={styles.outer}>
                        <View style={styles.center}>
                            <Surface style={styles.card} elevation={2}>
                                <Title style={styles.title}>{text.title}</Title>

                                <TextInput
                                    label={text.email}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    mode="outlined"
                                    style={styles.input}
                                />

                                <TextInput
                                    label={text.password}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    mode="outlined"
                                    style={styles.input}
                                />
                                <TextInput
                                    label={text.confirm}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    mode="outlined"
                                    style={styles.input}
                                />

                                <Button
                                    mode="contained"
                                    onPress={() => navigation.replace(LOGIN_ROUTE)}
                                    contentStyle={styles.buttonContent}
                                    style={styles.button}
                                    buttonColor={theme.colors.primary}
                                    labelStyle={{ color: theme.colors.onPrimary }}
                                >
                                    {text.signup}
                                </Button>

                            </Surface>

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

function makeStyles(theme: any) {
    return StyleSheet.create({
        safeArea: {
            flex: 1
        },
        container: {
            flex: 1,
            paddingHorizontal: 24,
            paddingVertical: 32,
            alignItems: "center",
            justifyContent: "center",

        },
        outer: { flex: 1, width: "100%" },
        center: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
        card: {
            padding: 18,
            borderRadius: 12,
            backgroundColor: theme.colors.surface,
        },
        title: {
            textAlign: "center",
            marginBottom: 8,
            color: theme.colors.onSurface,
        },
        input: { marginTop: 10 },
        button: { marginTop: 14 },
        buttonContent: { height: 46 },
        row: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
        },
        backButtonPressed: {
            opacity: 0.8,
        },
        header: {
            width: "100%",
            alignItems: "flex-start",
        },
    });
}