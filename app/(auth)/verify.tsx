import { API_URL } from "@/src/config/api";
import { useAuthStore } from "@/src/zustand/authStore";
import { useLanguageStore } from "@/src/zustand/store";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import {
    Button,
    Surface,
    Text,
    TextInput,
    Title,
    useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Language = "en" | "fi";

const HOME_ROUTE: Href = "/(tabs)/home";

type VerifyText = {
    title: string;
    description: string;
    code: string;
    verify: string;
    errors: {
        missingCode: string;
        verifyFailed: string;
        serverConnectionFailed: string;
        missingUserData: string;
    };
};

const VerifyTexts: Record<Language, VerifyText> = {
    en: {
        title: "Verify login",
        description: "Enter the verification code to continue.",
        code: "Verification code",
        verify: "Log in",
        errors: {
            missingCode: "Enter the verification code",
            verifyFailed: "Verification failed",
            serverConnectionFailed: "Could not connect to the server",
            missingUserData: "Login information is missing. Go back and try again.",
        },
    },
    fi: {
        title: "Vahvista kirjautuminen",
        description: "Syötä vahvistuskoodi jatkaaksesi.",
        code: "Vahvistuskoodi",
        verify: "Kirjaudu sisään",
        errors: {
            missingCode: "Syötä vahvistuskoodi",
            verifyFailed: "Vahvistaminen epäonnistui",
            serverConnectionFailed: "Yhteys palvelimeen epäonnistui",
            missingUserData: "Kirjautumistiedot puuttuvat. Palaa takaisin ja yritä uudelleen.",
        },
    },
};

export default function VerifyScreen() {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const navigation = useRouter();

    const login = useAuthStore((state) => state.login);

    const { email, username } = useLocalSearchParams<{
        email?: string;
        username?: string;
    }>();

    const language = useLanguageStore((state) => state.language) as Language;
    const text = VerifyTexts[language];

    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async () => {
        setError("");

        if (!email || !username) {
            setError(text.errors.missingUserData);
            return;
        }

        if (!verificationCode.trim()) {
            setError(text.errors.missingCode);
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: String(email),
                    username: String(username),
                    verificationCode: verificationCode.trim(),
                }),
            });

            const rawText = await response.text();
            const data = rawText ? JSON.parse(rawText) : {};

            if (!response.ok) {
                setError(data.error ?? text.errors.verifyFailed);
                return;
            }

            login(data.token, {
                id: "1",
                email: String(email),
                username: String(username),
            });

            navigation.replace(HOME_ROUTE);
        } catch (err) {
            console.log("Verify error:", err);
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
                    <Surface style={styles.card} elevation={2}>
                        <Title style={styles.title}>{text.title}</Title>

                        <Text style={styles.description}>
                            {text.description}
                        </Text>

                        <TextInput
                            label={text.code}
                            value={verificationCode}
                            onChangeText={setVerificationCode}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            mode="outlined"
                            style={styles.input}
                        />

                        {error ? (
                            <Text style={styles.error}>{error}</Text>
                        ) : null}

                        <Button
                            mode="contained"
                            onPress={handleVerify}
                            loading={loading}
                            disabled={loading}
                            contentStyle={styles.buttonContent}
                            style={styles.button}
                            buttonColor={theme.colors.primary}
                            labelStyle={{ color: theme.colors.onPrimary }}
                        >
                            {text.verify}
                        </Button>
                    </Surface>
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
            paddingHorizontal: 44,
            justifyContent: "center",
        },
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
        description: {
            textAlign: "center",
            color: theme.colors.onSurfaceVariant,
            marginBottom: 8,
        },
        input: {
            marginTop: 10,
        },
        error: {
            color: theme.colors.error,
            marginTop: 10,
        },
        button: {
            marginTop: 14,
        },
        buttonContent: {
            height: 46,
        },
    });
}