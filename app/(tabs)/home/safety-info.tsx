import TextData from '@/static/safetyInfoTexts.json';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkmark from "../../../src/components/Checkmark";
import { safetyBriefingData } from "../../../src/mockData";
import { useLanguageStore, useSafetyStore } from "../../../src/zustand/store";

export default function SafetyInfo() {
  const { language } = useLanguageStore();
  const theme = useTheme();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const text = TextData[language];

  // Get the briefing data from mockData
  const briefingItem = itemId && language
    ? safetyBriefingData[language][itemId]
    : null;

  const { completed, markCompleted } = useSafetyStore();

  // Check if current item is completed
  const routeStr = itemId ? `/(tabs)/home/safety-info?itemId=${itemId}` : "";
  const isCompleted = completed.includes(routeStr);

  const toggleCompleted = () => {
    if (routeStr) {
      markCompleted(routeStr);
    }
  };

  if (!briefingItem) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={48}
            color={theme.colors.error}
          />
          <Text style={[styles.errorTitle, { color: theme.colors.error }]}>
            {text.noTopic}
          </Text>
          <Text
            style={[styles.errorText, { color: theme.colors.onBackground }]}
          >
            {text.topicNotFound}
          </Text>
          <Button
            mode="contained"
            onPress={() => router.navigate("/(tabs)/home/safety-briefing")}
            style={styles.errorButton}
            icon="arrow-left"
          >
            {text.back}
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={[]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {briefingItem.title}
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            {text.title}
          </Text>
        </View>

        {/* Divider */}
        <Divider style={styles.divider} />

        {/* Content Sections */}
        <View style={styles.contentContainer}>
          {briefingItem.sections.map((section, sectionIndex) => (
            <Card
              key={sectionIndex}
              style={[
                styles.sectionCard,
                {
                  backgroundColor: theme.colors.surface,
                  elevation: 2,
                  borderTopWidth: 3,
                  borderTopColor: theme.colors.primary,
                },
              ]}
            >
              <Card.Content style={styles.cardContent}>
                {/* Section Header with Icon */}
                <View style={styles.sectionHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: theme.colors.primaryContainer },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="information"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </View>
                  <Text
                    style={[
                      styles.sectionTitle,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {section.title}
                  </Text>
                </View>

                {/* Content Items */}
                <View style={styles.sectionContent}>
                  {section.content.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.contentItem}>
                      <Text
                        style={[
                          styles.contentText,
                          { color: theme.colors.onSurface },
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Completion Section at Bottom */}
        <View style={styles.completionSection}>
          <Divider style={styles.completionDivider} />
          <View
            style={[
              styles.completionCard,
              {
                backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                elevation: 0,
              },
            ]}
          >
            <View style={styles.completionContent}>
              <Text
                style={[
                  styles.completionLabel,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {text.understood}
              </Text>

              <Checkmark
                checked={isCompleted}
                onPress={toggleCompleted}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    padding: 20,
    paddingTop: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 32,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    opacity: 0.7,
  },
  completionSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  completionDivider: {
    marginBottom: 20,
  },
  completionCard: {
    marginHorizontal: 20,
    marginVertical: 0,
    borderRadius: 0,
    elevation: 0,
  },
  completionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  completionLabel: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    marginRight: 16,
  },

  divider: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20,
  },
  sectionCard: {
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  sectionContent: {
    gap: 14,
  },
  contentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    opacity: 0.7,
  },
  errorButton: {
    marginTop: 16,
  },
});
