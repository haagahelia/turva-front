import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";

interface SearchResultItemProps {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  onPress?: () => void;
}

export default function SearchResultItem({
  id,
  title,
  image,
  description,
  tags,
  onPress,
}: SearchResultItemProps) {
  const theme = useTheme();

  return (
    <Card style={styles.resultItem} onPress={onPress}>
      <Card.Content>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Chevron Icon Overlay */}
          <IconButton
            icon="chevron-right"
            size={15}
            iconColor={theme.colors.onBackground}
            style={[
              styles.chevronOverlay,
              { backgroundColor: theme.colors.onSecondary },
            ]}
          />
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>

          <Text variant="bodyMedium" style={styles.description}>
            {description}
          </Text>

          {/* Tags Container */}
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <Card
                key={index}
                style={[
                  styles.tag,
                  { backgroundColor: theme.colors.primaryContainer },
                ]}
              >
                <Text
                  variant="labelSmall"
                  style={[
                    styles.tagText,
                    { color: theme.colors.onPrimaryContainer },
                  ]}
                >
                  {tag}
                </Text>
              </Card>
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  resultItem: {
    marginBottom: 12,
  },
  imageContainer: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chevronOverlay: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
