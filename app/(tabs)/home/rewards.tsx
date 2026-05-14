import { API_URL } from "@/src/config/api";
import {
  Achievement,
  QuizHistory,
  computeAchievements,
} from "@/src/types/achievements";
import { useAuthStore } from "@/src/zustand/authStore";
import { useLanguageStore } from "@/src/zustand/store";
import { useTimeStore } from "@/src/zustand/timeStore";
import RewardsTexts from "@/static/rewardsTexts.json";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  useTheme,
} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const getCurrentLevel = (
  value: number,
  levels: { level: number; name: string; min: number }[],
) => {
  return [...levels].reverse().find((l) => value >= l.min) ?? levels[0];
};

const getNextLevel = (
  value: number,
  levels: { level: number; name: string; min: number }[],
) => {
  return levels.find((l) => l.min > value) ?? null;
};

const getProgress = (
  value: number,
  levels: { level: number; name: string; min: number }[],
) => {
  const current = getCurrentLevel(value, levels);
  const next = getNextLevel(value, levels);
  if (!next) return 1;
  return (value - current.min) / (next.min - current.min);
};

const LevelCard = ({
  label,
  levelName,
  level,
  maxLevel,
  progress,
  currentValue,
  nextValue,
  unit,
  color,
}: {
  label: string;
  levelName: string;
  level: number;
  maxLevel: number;
  progress: number;
  currentValue: string;
  nextValue: string | null;
  unit: string;
  color: string;
}) => {
  const theme = useTheme();
  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          {label}
        </Text>
        <View style={styles.levelRow}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface, fontWeight: "500" }}
          >
            {levelName}
          </Text>
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {level} / {maxLevel}
          </Text>
        </View>
        <View
          style={[
            styles.progressBg,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress * 100, 100)}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
        <View style={styles.levelRow}>
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {currentValue} {unit}
          </Text>
          {nextValue && (
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {nextValue} {unit}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const AchievementRow = ({ achievement }: { achievement: Achievement }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.achievementRow,
        {
          backgroundColor: achievement.unlocked
            ? theme.colors.primaryContainer
            : theme.colors.surfaceVariant,
          opacity: achievement.unlocked ? 1 : 0.5,
        },
      ]}
    >
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <View style={styles.achievementText}>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurface, fontWeight: "500" }}
        >
          {achievement.name}
        </Text>
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          {achievement.description}
        </Text>
      </View>
      <Text
        variant="labelSmall"
        style={{
          color: achievement.unlocked
            ? theme.colors.primary
            : theme.colors.onSurfaceVariant,
        }}
      >
        {achievement.unlocked ? "✓" : "—"}
      </Text>
    </View>
  );
};

export default function RewardsScreen() {
  const theme = useTheme();
  const token = useAuthStore((state) => state.token);
  const { language } = useLanguageStore();
  const text = (RewardsTexts as any)[language];

  const activeTime = useTimeStore((state) => state.activeTime);
  const updateSession = useTimeStore((state) => state.updateSession);

  const POINT_LEVELS = [
    { level: 1, name: text.pointLevels["1"], min: 0 },
    { level: 2, name: text.pointLevels["2"], min: 11 },
    { level: 3, name: text.pointLevels["3"], min: 26 },
    { level: 4, name: text.pointLevels["4"], min: 51 },
    { level: 5, name: text.pointLevels["5"], min: 101 },
  ];

  const TIME_LEVELS = [
    { level: 1, name: text.timeLevels["1"], min: 0 },
    { level: 2, name: text.timeLevels["2"], min: 5 },
    { level: 3, name: text.timeLevels["3"], min: 15 },
    { level: 4, name: text.timeLevels["4"], min: 30 },
    { level: 5, name: text.timeLevels["5"], min: 60 },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [completedWorlds, setCompletedWorlds] = useState(0);
  const [totalWorlds, setTotalWorlds] = useState(0);
  const [history, setHistory] = useState<QuizHistory[]>([]);

  const [rewardCode, setRewardCode] = useState<string | null>(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [rewardLoading, setRewardLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      updateSession();

      const fetchRewardsData = async () => {
        try {
          if (!token) {
            setIsLoading(false);
            return;
          }

          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };

          const profileRes = await fetch(`${API_URL}/api/user/profile`, {
            headers,
          });
          if (!profileRes.ok) throw new Error("Failed to fetch profile");
          const profile = await profileRes.json();
          const userId = profile.userId;

          const [statsRes, bonusRes, historyRes, worldsRes] = await Promise.all(
            [
              fetch(`${API_URL}/api/quiz-result/user/${userId}/stats`, {
                headers,
              }),
              fetch(`${API_URL}/api/world-bonus/user/${userId}`, { headers }),
              fetch(`${API_URL}/api/quiz-result/user/${userId}/history`, {
                headers,
              }),
              fetch(`${API_URL}/api/world`, { headers }),
            ],
          );

          if (!statsRes.ok) throw new Error("Failed to fetch stats");

          const stats = await statsRes.json();

          let bonusPoints = 0;
          if (bonusRes.ok) {
            const bonus = await bonusRes.json();
            bonusPoints = bonus.bonusPoints;
            setCompletedWorlds(bonus.completedWorlds);
          }

          setPoints(stats.points + bonusPoints);

          if (historyRes.ok) {
            setHistory(await historyRes.json());
          }

          if (worldsRes.ok) {
            const worlds = await worldsRes.json();
            setTotalWorlds(worlds.length);
          }
        } catch (error) {
          console.error("Error fetching rewards data:", error);
          Alert.alert(
            "Error",
            "Failed to load rewards. Please try again later.",
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchRewardsData();
    }, [token]),
  );

  const handleClaimReward = async () => {
    setRewardLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/physical-reward/claim`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.alreadyClaimed) {
        setRewardClaimed(true);
      } else {
        setRewardCode(data.reward_code);
      }
    } catch (err) {
      console.error("Error claiming reward:", err);
      Alert.alert("Error", "Failed to generate QR code. Please try again.");
    } finally {
      setRewardLoading(false);
    }
  };

  const timeMinutes = Math.floor(activeTime / 1000 / 60);

  const pointLevel = getCurrentLevel(points, POINT_LEVELS);
  const pointNextLevel = getNextLevel(points, POINT_LEVELS);
  const pointProgress = getProgress(points, POINT_LEVELS);

  const timeLevel = getCurrentLevel(timeMinutes, TIME_LEVELS);
  const timeNextLevel = getNextLevel(timeMinutes, TIME_LEVELS);
  const timeProgress = getProgress(timeMinutes, TIME_LEVELS);

  const achievements = computeAchievements(
    history,
    points,
    completedWorlds,
    totalWorlds,
    text,
  );
  const allWorldsCompleted = completedWorlds >= totalWorlds && totalWorlds > 0;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 16, color: theme.colors.onBackground }}>
            {text.loading}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: theme.colors.onBackground }]}
          >
            {text.title}
          </Text>

          <LevelCard
            label={text.pointsLevel}
            levelName={pointLevel.name}
            level={pointLevel.level}
            maxLevel={POINT_LEVELS.length}
            progress={pointProgress}
            currentValue={String(points)}
            nextValue={
              pointNextLevel ? `${text.nextLevel} ${pointNextLevel.min}` : null
            }
            unit={text.pointsUnit}
            color={theme.colors.primary}
          />

          <LevelCard
            label={text.timeLevel}
            levelName={timeLevel.name}
            level={timeLevel.level}
            maxLevel={TIME_LEVELS.length}
            progress={timeProgress}
            currentValue={String(timeMinutes)}
            nextValue={
              timeNextLevel ? `${text.nextLevel} ${timeNextLevel.min}` : null
            }
            unit={text.timeUnit}
            color="#0F6E56"
          />

          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
          >
            {text.achievements}
          </Text>

          {achievements.map((a) => (
            <AchievementRow key={a.id} achievement={a} />
          ))}

          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
          >
            {text.haalarimerkki}
          </Text>

          <Card
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <Card.Content style={styles.rewardContent}>
              <Text style={styles.rewardEmoji}>🎖️</Text>

              {!allWorldsCompleted ? (
                <>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      textAlign: "center",
                    }}
                  >
                    {text.haalarimerkkiProgress}
                  </Text>
                  <View style={{ width: "100%", gap: 6 }}>
                    <View
                      style={[
                        styles.progressBg,
                        { backgroundColor: theme.colors.surfaceVariant },
                      ]}
                    >
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width:
                              totalWorlds > 0
                                ? `${(completedWorlds / totalWorlds) * 100}%`
                                : "0%",
                            backgroundColor: theme.colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <Text
                      variant="labelSmall"
                      style={{
                        color: theme.colors.onSurfaceVariant,
                        textAlign: "center",
                      }}
                    >
                      {completedWorlds} / {totalWorlds}{" "}
                      {text.haalarimerkkiWorldsCompleted}
                    </Text>
                  </View>
                </>
              ) : rewardClaimed ? (
                <>
                  <Text style={styles.rewardEmoji}>✅</Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      textAlign: "center",
                    }}
                  >
                    {text.haalarimerkkiClaimed}
                  </Text>
                </>
              ) : rewardCode ? (
                <>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      textAlign: "center",
                    }}
                  >
                    {text.haalarimerkkiQrInfo}
                  </Text>
                  <QRCode
                    value={`${API_URL}/api/physical-reward/verify/${rewardCode}`}
                    size={180}
                  />
                  <Text
                    variant="labelSmall"
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      textAlign: "center",
                    }}
                  >
                    {text.haalarimerkkiQrOnce}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      textAlign: "center",
                    }}
                  >
                    {text.haalarimerkkiReady}
                  </Text>
                  <Button
                    mode="contained"
                    loading={rewardLoading}
                    onPress={handleClaimReward}
                  >
                    {text.haalarimerkkiClaim}
                  </Button>
                </>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 4,
  },
  card: {
    borderRadius: 12,
    elevation: 1,
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  progressBg: {
    height: 6,
    borderRadius: 99,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
  },
  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  achievementIcon: {
    fontSize: 22,
  },
  achievementText: {
    flex: 1,
  },
  rewardContent: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  rewardEmoji: {
    fontSize: 40,
  },
});
