import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchHeaderInput from "../../src/components/SearchHeaderInput";
import SearchResultItem from "../../src/components/SearchResultItem";

import { emptyStateText, searchData, searchHeaderText, SearchResult } from "@/src/content/searchData";
import { useLanguageStore } from "@/src/zustand/store";

export default function SearchScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  // Language support
  const { language } = useLanguageStore();

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchData[language];
    }

    const activeData = searchData[language];

    return activeData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery, language]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Create animated value for header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Create animated value for header translateY
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <SearchResultItem
      id={item.id}
      title={item.title}
      image={item.image}
      description={item.description}
      tags={item.tags}
      onPress={() => {
        // Later we will navigate to the details screen from here which will
        // Show all the information about the item in this case the article
        console.log("Pressed item:", item.title);
      }}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <IconButton
        icon="magnify-close"
        size={64}
        iconColor={theme.colors.onSurfaceVariant}
      />
      <Text variant="headlineSmall" style={styles.emptyStateTitle}>
        <Text>{emptyStateText.noResults[language]}</Text>
      </Text>
      <Text variant="bodyMedium" style={styles.emptyStateSubtitle}>
        <Text>{emptyStateText.tryDifferent[language]}</Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* Animated Header with Search Input */}
          <Animated.View
            style={[
              styles.animatedHeader,
              {
                opacity: headerOpacity,
                transform: [{ translateY: headerTranslateY }],
              },
            ]}
          >
            <SearchHeaderInput
              title={searchHeaderText.title[language]}
              placeholder={searchHeaderText.placeholder[language]}
              description={searchHeaderText.description[language]}
              value={searchQuery}
              onChangeText={handleSearch}
              onClear={clearSearch}
            />
          </Animated.View>

          {/* Results Count */}
          {searchQuery.length > 0 && (
            <View style={styles.resultsCountContainer}>
              <Text variant="bodySmall" style={styles.resultsCount}>
                {filteredResults.length} result
                {filteredResults.length !== 1 ? "s" : ""} found
              </Text>
            </View>
          )}

          {/* Search Results */}
          <FlatList
            data={filteredResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              searchQuery.length > 0 ? renderEmptyState : null
            }
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'transparent',
  },
  resultsCountContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
    letterSpacing: 0.25,
    textTransform: 'lowercase',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 130,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
