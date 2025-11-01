import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, HelperText, Text, TextInput, useTheme } from "react-native-paper";

const API_URL = (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const sendLoginCode = async (): Promise<void> => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`Failed to send code (Status: ${response.status})`);
      }
      setInfo("We sent a login code to your email.");
      setStep("code");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const verifyLoginCode = async (): Promise<void> => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      if (!response.ok) {
        throw new Error(`Verification failed (Status: ${response.status})`);
      }
      setInfo("You're logged in.");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const emailHasError = !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
        <Card mode="elevated" style={{ borderRadius: 16, overflow: "hidden" }}>
          <Card.Content>
            <View style={{ gap: 16 }}>
              <View>
                <Text variant="headlineSmall">Login</Text>
                <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
                  Enter your email to receive a one-time code
                </Text>
              </View>

              <TextInput
                label="Email"
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                disabled={step === "code"}
                error={emailHasError}
                left={<TextInput.Icon icon="email-outline" />}
              />
              <HelperText type={emailHasError ? "error" : "info"} visible>
                {emailHasError
                  ? "Enter a valid email"
                  : "We'll send a one-time code"}
              </HelperText>

              {step === "code" && (
                <View style={{ gap: 8 }}>
                  <TextInput
                    label="Login code"
                    mode="outlined"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    left={<TextInput.Icon icon="numeric" />}
                  />
                  <HelperText type="info" visible>
                    Check your inbox for the code
                  </HelperText>
                </View>
              )}

              {error && (
                <HelperText type="error" visible>
                  {error}
                </HelperText>
              )}
              {info && (
                <HelperText type="info" visible>
                  {info}
                </HelperText>
              )}

              <View style={{ gap: 8 }}>
                {step === "email" ? (
                  <Button
                    mode="contained"
                    onPress={sendLoginCode}
                    disabled={!email || emailHasError || !API_URL}
                    loading={loading}
                    style={{ borderRadius: 12 }}
                    contentStyle={{ paddingVertical: 6 }}
                  >
                    Send code
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    onPress={verifyLoginCode}
                    disabled={!code || !API_URL}
                    loading={loading}
                    style={{ borderRadius: 12 }}
                    contentStyle={{ paddingVertical: 6 }}
                  >
                    Verify & Log in
                  </Button>
                )}

                <View style={{ alignItems: "center", marginTop: 12 }}>
                  <Pressable onPress={() => router.push("/(auth)/signup")}>
                    <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
                      Don&apos;t have an account?{" "}
                      <Text 
                        variant="bodyMedium" 
                        style={{ 
                          fontWeight: "600", 
                          color: theme.colors.primary,
                          textDecorationLine: "underline"
                        }}
                      >
                        Sign up
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}
