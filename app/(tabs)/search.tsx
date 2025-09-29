import React, { useMemo, useState } from "react";
import {
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


// At this point we dont have a working search functionality
// Since API is not implemented, we are using sample data

// Sample data for search results
// This should be removed when the API is implemented
const searchData = [
  {
    id: "1",
    title: "Emergency Contacts",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    description:
      "Quick access to crisis team contacts and emergency services for immediate assistance during critical situations.",
    tags: ["Emergency", "Contacts", "Crisis Team"],
  },
  {
    id: "2",
    title: "Campus Safety Rules",
    image:
      "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
    description:
      "Essential safety guidelines and procedures that all students and staff must follow to maintain a secure campus environment.",
    tags: ["Safety", "Guidelines", "Procedures"],
  },
  {
    id: "3",
    title: "Assembly Points",
    image:
      "https://images.unsplash.com/photo-1574263867126-8e5f5b1b1b1b?w=300&h=200&fit=crop",
    description:
      "Designated meeting points where students and staff should gather during emergency evacuations and drills.",
    tags: ["Emergency", "Evacuation", "Meeting Points"],
  },
  {
    id: "4",
    title: "Fire Safety Equipment",
    image:
      "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
    description:
      "Locations of fire extinguishers, emergency exits, and other fire safety equipment across all campus buildings.",
    tags: ["Fire Safety", "Equipment", "Extinguishers"],
  },
  {
    id: "5",
    title: "Defibrillator Locations",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
    description:
      "AED (Automated External Defibrillator) device locations throughout the campus for medical emergencies.",
    tags: ["Medical", "AED", "Emergency"],
  },
  {
    id: "6",
    title: "Emergency Exits",
    image:
      "https://images.unsplash.com/photo-1574263867126-8e5f5b1b1b1b?w=300&h=200&fit=crop",
    description:
      "Primary and secondary exit routes from all campus buildings, including accessibility information.",
    tags: ["Emergency", "Exits", "Evacuation"],
  },
  {
    id: "7",
    title: "Campus News",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200&fit=crop",
    description:
      "Latest safety updates, announcements, and important information affecting the campus community.",
    tags: ["News", "Updates", "Announcements"],
  },
  {
    id: "8",
    title: "Safety Observations",
    image:
      "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
    description:
      "Report safety concerns, hazards, and observations to help maintain a safe campus environment for everyone.",
    tags: ["Reporting", "Safety", "Concerns"],
  },
];

interface SearchResult {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

export default function SearchScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchData;
    }

    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

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
        No Results Found
      </Text>
      <Text variant="bodyMedium" style={styles.emptyStateSubtitle}>
        Try searching with different keywords
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* Header with Search Input */}
          <SearchHeaderInput
            title="Haaga-Helia"
            showLogo={true}
            placeholder="Hae artikkeleita..."
            value={searchQuery}
            onChangeText={handleSearch}
            onClear={clearSearch}
          />

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
