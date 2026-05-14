import { API_URL } from "@/src/config/api";
import { useLanguageStore } from "@/src/zustand/store";
import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Language = "en" | "fi";

const LOGIN_ROUTE: Href = "/(auth)/login"

type SignupText = {
    title: string
    username: string
    email: string
    confirm: string
    signup: string
    errors: {
        requiredFields: string;
        emailsDoNotMatch: string;
        registerFailed: string;
        serverConnectionFailed: string;
    }
}

const SignupTexts: Record<Language, SignupText> = {
    en: {
        title: "Sign up",
        username: "Username",
        email: "Email",
        confirm: "Confirm email",
        signup: "Sign up",
        errors: {
            requiredFields: "Fill in all fields",
            emailsDoNotMatch: "Email addresses do not match",
            registerFailed: "Registration failed",
            serverConnectionFailed: "Could not connect to the server",
        },
    },
    fi: {
        title: "Rekisteröidy",
        username: "Käyttäjänimi",
        email: "Sähköposti",
        confirm: "Vahvista sähköposti",
        signup: "Rekisteröidy",
        errors: {
            requiredFields: "Täytä kaikki kentät",
            emailsDoNotMatch: "Sähköpostit eivät täsmää",
            registerFailed: "Rekisteröinti epäonnistui",
            serverConnectionFailed: "Yhteys palvelimeen epäonnistui",
        },
    },
};

export default function SignupScreen() {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const navigation = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const language = useLanguageStore((state) => state.language) as Language;
    const text = SignupTexts[language];

    const handleSignup = async () => {
        setError("");

        if (!username.trim() || !email.trim() || !confirm.trim()) {
            setError(text.errors.requiredFields);
            return;
        }

        if (email.trim() !== confirm.trim()) {
            setError(text.errors.emailsDoNotMatch);
            return;
        }

        try {
            setLoading(true);

            const registerUrl = `${API_URL}/api/auth/register`;

            const response = await fetch(registerUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    organizationId: 1,
                }),
            });

            const rawText = await response.text();

            console.log("Response status:", response.status);
            console.log("Response text:", rawText);

            const data = rawText ? JSON.parse(rawText) : {};

            if (!response.ok) {
                setError(data.error ?? text.errors.registerFailed);
                return;
            }

            navigation.replace(LOGIN_ROUTE);
        } catch (err) {
            console.log("Signup error:", err);
            setError(text.errors.serverConnectionFailed);
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
                                    label={text.username}
                                    value={username}
                                    onChangeText={setUsername}
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
                                <TextInput
                                    label={text.confirm}
                                    value={confirm}
                                    onChangeText={setConfirm}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    mode="outlined"
                                    style={styles.input}
                                />
                                {error ? (
                                    <Text style={{ color: theme.colors.error, marginTop: 10 }}>
                                        {error}
                                    </Text>
                                ) : null}
                                <Button
                                    mode="contained"
                                    onPress={handleSignup}
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