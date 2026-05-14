import { API_URL } from "@/src/config/api";
import { useAuthStore } from "@/src/zustand/authStore";
import { useLanguageStore } from "@/src/zustand/store";
import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Button, Surface, TextInput, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SIGNUP_ROUTE: Href = "/(auth)/signup"
const PREVIOUS_ROUTE: Href = "/(onboarding)"
const HOME_ROUTE: Href = "/(tabs)/home";

type Language = "en" | "fi";

type LoginText = {
    title: string
    email: string
    username: string
    login: string
    signup: string
    forgot: string
}

const LoginTexts: Record<Language, LoginText> = {
    en: {
        title: "Sign in",
        email: "Email",
        username: "Username",
        login: "Sign in",
        signup: "Sign up",
        forgot: "Forgot password?"
    },
    fi: {
        title: "Kirjaudu sisään",
        email: "Sähköposti",
        username: "Käyttäjänimi",
        login: "Kirjaudu",
        signup: "Rekisteröidy",
        forgot: "Unohditko salasanan?"
    },
};

export default function LoginScreen() {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const navigation = useRouter();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const login = useAuthStore((state) => state.login);
    const setLoading = useAuthStore((state) => state.setLoading);
    const setError = useAuthStore((state) => state.setError);
    const isLoading = useAuthStore((state) => state.isLoading);

    const language = useLanguageStore((state) => state.language) as Language;
    const text = LoginTexts[language];

    // Temporary mock login until backend authentication is ready - replace with real API call when available
    const handleLogin = async () => {
        setError(null);

        if (!username.trim() || !email.trim()) {
            setError("Please enter both username and email");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                }),
            });

            const rawText = await response.text();
            const data = rawText ? JSON.parse(rawText) : {};

            if (!response.ok) {
                setError(data.error ?? "Login failed");
                return;
            }

            navigation.push({
                pathname: "/(auth)/verify",
                params: {
                    username: username.trim(),
                    email: email.trim(),
                },
            });
        } catch (err) {
            console.log("Login error:", err);
            setError("Could not connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/Login_Page.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <SafeAreaView
                style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Go back to last onboarding step"
                            onPress={() => navigation.replace(PREVIOUS_ROUTE)}
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
                                    label={text.username}
                                    value={username}
                                    onChangeText={setUsername}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    mode="outlined"
                                    style={styles.input}
                                />

                                <TextInput
                                    label={text.email}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    mode="outlined"
                                    style={styles.input}
                                />

                                <Button
                                    mode="contained"
                                    onPress={handleLogin}
                                    disabled={isLoading}
                                    contentStyle={styles.buttonContent}
                                    style={styles.button}
                                    buttonColor={theme.colors.primary}
                                    labelStyle={{ color: theme.colors.onPrimary }}
                                >
                                    {text.login}
                                </Button>

                                <View style={styles.row}>
                                    <Button onPress={() => navigation.replace(SIGNUP_ROUTE)}>{text.signup}</Button>
                                    <Button>{text.forgot}</Button>
                                </View>
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
            flex: 1,
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
        logo: {
            width: 200,
            height: 200,
            alignSelf: "center",
            marginBottom: 10
        },
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