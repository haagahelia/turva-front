import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkmark from "../../../src/components/Checkmark";
import FeedbackModal from "../../../src/components/FeedbackModal";
import { briefingItems } from "../../../src/mockData";
import { useSafetyStore } from "../../../src/zustand/store";

export default function SafetyBriefing() {
  const theme = useTheme();
  const { completed, readCount, markCompleted, initializeReadCount } =
    useSafetyStore();

  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);

  // Initialize read count on component mount
  useEffect(() => {
    initializeReadCount();
  }, [initializeReadCount]);

  const handleItemPress = (itemId: string) => {
    // Navigate to safety-info with the item ID as parameter
    router.navigate(`/(tabs)/home/safety-info?itemId=${itemId}`);
  };

  const handleCheckmarkPress = (itemId: string) => {
    const routeStr = `/(tabs)/home/safety-info?itemId=${itemId}`;
    markCompleted(routeStr);
  };

  // This function will be used to submit the feedback to the server
  const handleFeedbackSubmit = (rating: number, description: string) => {
    console.log("Rating:", rating, "Description:", description);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]} edges={[]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            Turvallisuusperehdytys
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Valitse aihe tutustuaksesi turvallisuusohjeisiin
          </Text>
        </View>

        {/* Description */}
        <Card
          style={[
            styles.descriptionCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Card.Content>
            <Text
              style={[
                styles.descriptionText,
                { color: theme.colors.onSurface },
              ]}
            >
              🎓 Haaga-Helian turvallisuustyön tavoitteena on, että jokainen
              kampuksella työskentelevä, opiskeleva tai vieraileva henkilö
              tuntee olonsa turvalliseksi. Olet osaltasi rakentamassa
              turvallista ja viihtyisää työ- ja oppimisympäristöä sekä
              hyvinvoivaa haagaheliayhteisöä. Turvallisuus ja hyvinvointi
              tehdään fiksummin yhdessä!
            </Text>
            <View style={styles.progressContainer}>
              <MaterialCommunityIcons
                name="chart-line"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[styles.progressText, { color: theme.colors.primary }]}
              >
                {readCount} / {briefingItems.length} suoritettu
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Briefing Items */}
        <View style={styles.itemsContainer}>
          {briefingItems.map((item) => {
            const routeStr = `/(tabs)/home/safety-info?itemId=${item.id}`;
            const isCompleted = completed.includes(routeStr);

            return (
              <Card
                key={item.id}
                style={[
                  styles.itemCard,
                  {
                    backgroundColor: theme.colors.tertiaryContainer,
                    borderColor: isCompleted
                      ? theme.colors.primary
                      : "transparent",
                    borderWidth: 2,
                  },
                ]}
              >
                <Card.Content style={styles.cardContent}>
                  <Button
                    mode="text"
                    onPress={() => handleItemPress(item.id)}
                    style={styles.itemButton}
                    contentStyle={styles.itemButtonContent}
                    labelStyle={[
                      styles.itemLabel,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    <View style={styles.itemTextContainer}>
                      <Text
                        style={[
                          styles.itemTitle,
                          {
                            color: isCompleted
                              ? theme.colors.primary
                              : theme.colors.onSurface,
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </Button>

                  <Checkmark
                    checked={isCompleted}
                    onPress={() => handleCheckmarkPress(item.id)}
                  />
                </Card.Content>
              </Card>
            );
          })}
        </View>

        {/* Feedback Button */}
        <View style={styles.feedbackContainer}>
          <Button
            mode="contained"
            onPress={() => setFeedbackModalVisible(true)}
            style={[
              styles.feedbackButton,
              { backgroundColor: theme.colors.errorContainer },
            ]}
            contentStyle={styles.feedbackContent}
            labelStyle={[
              styles.feedbackLabel,
              { color: theme.colors.onErrorContainer },
            ]}
            icon={() => (
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={18}
                color={theme.colors.onErrorContainer}
              />
            )}
          >
            Anna palautetta
          </Button>
        </View>
      </ScrollView>

      {/* Feedback Modal */}
      <FeedbackModal
        visible={feedbackModalVisible}
        onDismiss={() => setFeedbackModalVisible(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
  descriptionCard: {
    marginBottom: 24,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  itemsContainer: {
    gap: 12,
  },
  feedbackContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  feedbackButton: {
    borderRadius: 24,
    paddingHorizontal: 8,
  },
  feedbackContent: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  feedbackLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemCard: {
    elevation: 1,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  itemButton: {
    justifyContent: "flex-start",
    flex: 1,
  },
  itemButtonContent: {
    justifyContent: "flex-start",
    paddingHorizontal: 0,
  },
  itemLabel: {
    fontSize: 16,
  },
  itemTextContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemShortTitle: {
    fontSize: 14,
  },
});
