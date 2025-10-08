import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

interface CheckmarkProps {
  checked: boolean;
  onPress: () => void;
}

export default function Checkmark({ checked, onPress }: CheckmarkProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: checked ? theme.colors.primary : theme.colors.onSurfaceVariant,
            borderWidth: checked ? 2 : 1,
          },
        ]}
      >
        {checked && (
          <Ionicons name="checkmark" size={16} color={theme.colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
