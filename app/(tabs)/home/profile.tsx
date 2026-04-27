import TextData from '@/static/homeTexts.json';
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from '@/src/zustand/authStore';
import { useLanguageStore } from "@/src/zustand/store";



// The profile screen currently has placeholder elements
// We are able to select an image for profile and change the name but the changes are temporary and will be lost when the screen is refreshed
// When the the backend api is ready the profile section will first fetch user info and show it in these elements
// If user chooses to update the profile image or name, the changes will be saved to the backend and the user will see the changes after a successful request
// We will also add a logout functionality when api is ready

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [totalTime, setTotalTime] = useState("0h 0min");
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  const text = TextData[language].profile;
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

    // Fetch user profile data from the backend
    useFocusEffect(
  useCallback(() => {
    const fetchProfileAndStats = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }

      const profileResponse = await fetch(`http://localhost:3000/api/user/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const profileData = await profileResponse.json();
      setUserName(profileData.profileName);
      setProfileImage(profileData.profilePictureUrl);

      const fetchUserId = profileData.userId;

      const [statsResponse, bonusResponse] = await Promise.all([
        fetch(`http://localhost:3000/api/quiz-result/user/${fetchUserId}/stats`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }),
        fetch(`http://localhost:3000/api/world-bonus/user/${fetchUserId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
      ]);

      if (!statsResponse.ok) {
        throw new Error("Failed to fetch quiz statistics");
      }

      const stats = await statsResponse.json();

      let bonusPoints = 0;
      if (bonusResponse.ok) {
        const bonusData = await bonusResponse.json();
        bonusPoints = bonusData.bonusPoints;
      }

      setPlayerPoints(stats.points + bonusPoints);

      const hours = Math.floor(stats.totalTimeSeconds / 3600);
      const minutes = Math.floor((stats.totalTimeSeconds % 3600) / 60);
      setTotalTime(`${hours}h ${minutes}min`);
    } catch (error) {
      console.error("Error fetching profile or stats:", error);
      Alert.alert("Error", "Failed to load profile data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchProfileAndStats();
  }, [token]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Sorry, we need camera roll permissions to select an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleNamePress = () => {
    setIsEditingName(true);
  };

  const handleNameSubmit = () => {
    setIsEditingName(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    if (isEditingName) {
      setIsEditingName(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.profileSection}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={{ marginTop: 16, color: theme.colors.onBackground }}>
                Loading profile...
                </Text>
                </View>
          ) : (
            <>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={pickImage}>
              {profileImage ? (
                <Avatar.Image
                  size={120}
                  source={{ uri: profileImage }}
                  style={styles.avatar}
                />
              ) : (
                <Avatar.Text
                  size={120}
                  label={userName ? userName.split(" ").map((n) => n[0]).join("") : "?"}
                  style={[
                    styles.avatar,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
              )}
            </TouchableOpacity>

            {isEditingName ? (
              <TextInput
                value={userName}
                onChangeText={setUserName}
                onBlur={handleNameSubmit}
                onSubmitEditing={handleNameSubmit}
                style={[
                  styles.nameInput,
                  { backgroundColor: theme.colors.surface },
                ]}
                textColor={theme.colors.onSurface}
                mode="outlined"
                autoFocus
              />
            ) : (
              <TouchableOpacity onPress={handleNamePress}>
                <Text
                  variant="headlineMedium"
                  style={[styles.name, { color: theme.colors.onBackground }]}
                >
                  {userName}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.statsContainer}>
            <Card
              style={[
                styles.statsCard,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Card.Content style={styles.statsContent}>
                <View style={styles.statItem}>
                  <Text
                    variant="titleMedium"
                    style={[
                      styles.statLabel,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {text.points}
                  </Text>
                  <Text
                    variant="headlineSmall"
                    style={[styles.statValue, { color: theme.colors.primary }]}
                  >
                    {playerPoints.toLocaleString()}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statDivider,
                    { backgroundColor: theme.colors.outlineVariant },
                  ]}
                />

                <View style={styles.statItem}>
                  <Text
                    variant="titleMedium"
                    style={[
                      styles.statLabel,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {text.time}
                  </Text>
                  <Text
                    variant="headlineSmall"
                    style={[styles.statValue, { color: theme.colors.primary }]}
                  >
                    {totalTime}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.rewardsButtonContainer}>
            <Button
              icon="trophy"
              mode="contained"
              onPress={() => router.push("/(tabs)/home/rewards")}
            >
              {text.rewards}
            </Button>
          </View>

          <View style={styles.bottomActions}>
            <View style={styles.actionButtonWrapper}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: theme.colors.errorContainer },
                ]}
                onPress={handleLogout}
              >
                <IconButton
                  icon="logout"
                  iconColor={theme.colors.onErrorContainer}
                  size={24}
                />
              </TouchableOpacity>
              <Text
                variant="labelSmall"
                style={[
                  styles.actionButtonLabel,
                  { color: theme.colors.onErrorContainer },
                ]}
              >
                {text.logout}
              </Text>
            </View>

            <View style={styles.actionButtonWrapper}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: theme.colors.primaryContainer },
                ]}
                onPress={() => router.push("/(tabs)/home/settings")}
              >
                <IconButton
                  icon="cog"
                  iconColor={theme.colors.onPrimaryContainer}
                  size={24}
                />
              </TouchableOpacity>
              <Text
                variant="labelSmall"
                style={[
                  styles.actionButtonLabel,
                  { color: theme.colors.onPrimaryContainer },
                ]}
              >
                {text.settings}
              </Text>
            </View>
          </View>
          </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  profileSection: {
    alignItems: "center",
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 8,
  },
  nameInput: {
    marginTop: 8,
    width: 200,
  },
  statsContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  statsCard: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsContent: {
    paddingVertical: 12,
  },
  statItem: {
    alignItems: "center",
    paddingVertical: 2,
  },
  statLabel: {
    marginBottom: 2,
    textAlign: "center",
  },
  statValue: {
    fontWeight: "600",
    textAlign: "center",
  },
  statDivider: {
    height: 1,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  rewardsButtonContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  bottomActions: {
    position: "absolute",
    bottom: 20,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtonWrapper: {
    alignItems: "center",
  },
  actionButton: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  actionButtonLabel: {
    marginTop: 4,
    textAlign: "center",
    fontWeight: "500",
  },
});
