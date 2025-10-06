import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

interface SearchHeaderInputProps {
  title?: string;
  showLogo?: boolean;
  placeholder?: string;
  description?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

const SearchHeaderInput: React.FC<SearchHeaderInputProps> = ({
  title = "Haku",
  showLogo = true,
  placeholder = "Hae artikkeleita...",
  description,
  value,
  onChangeText,
  onClear,
}) => {
  const theme = useTheme();

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChangeText("");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.tertiaryContainer },
      ]}
    >
      {/* Header Section */}
      <View style={styles.header}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/HH_SafetyIcon1_blue.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {title}
          </Text>
          {description && (
            <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
              {description}
            </Text>
          )}
        </View>
      </View>

      {/* Search Input Section */}
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          left={<TextInput.Icon icon="magnify" size={18} />}
          right={
            value.length > 0 ? (
              <TextInput.Icon icon="close" size={18} onPress={handleClear} />
            ) : undefined
          }
          style={styles.searchInput}
          dense
          contentStyle={styles.inputContent}
        />
      </View>
    </View>
  );
};

export default SearchHeaderInput;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  logoContainer: {
    marginRight: 16,
  },
  logo: {
    width: 48,
    height: 48,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 2,
  },
  searchInput: {
    height: 38,
  },
  inputContent: {
    fontSize: 14,
    paddingVertical: 0,
    paddingHorizontal: 8,
    minHeight: 30,
  },
});
