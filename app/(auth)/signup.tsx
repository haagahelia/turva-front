import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, HelperText, Text, TextInput, useTheme } from "react-native-paper";

const API_URL = (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function SignupScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [organizationId, setOrganizationId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [step, setStep] = useState<"credentials" | "code">("credentials");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const sendSignupCode = async (): Promise<void> => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId, username, email }),
      });
      
      const responseData = await response.json();
      console.log("Register response:", responseData);
      
      if (!response.ok) throw new Error("Failed to send code");
      setInfo("We sent a verification code to your email.");
      setStep("code");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const verifySignupCode = async (): Promise<void> => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, verificationCode: code }),
      });
      if (!response.ok) throw new Error("Verification failed");
      setInfo("Your account has been created and verified.");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const emailHasError = !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canProceed = organizationId.trim() !== "" && username.trim() !== "" && email.trim() !== "" && !emailHasError;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, padding: 16, justifyContent: "center", backgroundColor: theme.colors.background }}>
        <Card mode="elevated" style={{ borderRadius: 16, overflow: "hidden" }}>
          <Card.Content>
            <View style={{ gap: 16 }}>
              <View>
                <Text variant="headlineSmall">Create your account</Text>
                <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
                  Enter your organization ID, username, and email to receive a verification code
                </Text>
              </View>

              <TextInput
                label="Organization ID"
                mode="outlined"
                autoCapitalize="none"
                value={organizationId}
                onChangeText={setOrganizationId}
                disabled={step === "code"}
                left={<TextInput.Icon icon="office-building-outline" />}
              />

              <TextInput
                label="Username"
                mode="outlined"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                disabled={step === "code"}
                left={<TextInput.Icon icon="account-outline" />}
              />

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
                    label="Verification code"
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
                {step === "credentials" ? (
                  <Button
                    mode="contained"
                    onPress={sendSignupCode}
                    disabled={!canProceed || !API_URL}
                    loading={loading}
                    style={{ borderRadius: 12 }}
                    contentStyle={{ paddingVertical: 6 }}
                  >
                    Send code
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    onPress={verifySignupCode}
                    disabled={!code || !API_URL}
                    loading={loading}
                    style={{ borderRadius: 12 }}
                    contentStyle={{ paddingVertical: 6 }}
                  >
                    Verify & Sign up
                  </Button>
                )}

                <View style={{ alignItems: "center", marginTop: 12 }}>
                  <Pressable onPress={() => router.push("/(auth)/login")}>
                    <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
                      Already have an account?{" "}
                      <Text 
                        variant="bodyMedium" 
                        style={{ 
                          fontWeight: "600", 
                          color: theme.colors.primary,
                          textDecorationLine: "underline"
                        }}
                      >
                        Log in
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
