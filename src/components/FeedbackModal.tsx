import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Modal,
    Portal,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper";

interface FeedbackModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (rating: number, description: string) => void;
}

// This component is used to display the feedback modal
// It will be used to submit the feedback to the server
// This is being used currently in the safety-briefing.tsx file
export default function FeedbackModal({
  visible,
  onDismiss,
  onSubmit,
}: FeedbackModalProps) {
  const theme = useTheme();
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(rating, description);
    setRating(5);
    setDescription("");
    onDismiss();
  };

  const handleCancel = () => {
    setRating(5);
    setDescription("");
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Anna palautetta
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Arvioi turvallisuusperehdytyksen kokemus asteikolla 1-10
            </Text>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingButtons}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <Button
                    key={value}
                    mode={rating === value ? "contained" : "outlined"}
                    onPress={() => setRating(value)}
                    style={[
                      styles.ratingButton,
                      rating === value && {
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                    labelStyle={[
                      styles.ratingButtonLabel,
                      {
                        color:
                          rating === value
                            ? theme.colors.onPrimary
                            : theme.colors.primary,
                      },
                    ]}
                    compact
                  >
                    {value}
                  </Button>
                ))}
              </View>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.descriptionSection}>
            <Text
              style={[
                styles.descriptionLabel,
                { color: theme.colors.onSurface },
              ]}
            >
              Kuvaus (valinnainen)
            </Text>
            <TextInput
              mode="outlined"
              multiline
              numberOfLines={3}
              placeholder="Kerro lisää kokemuksestasi..."
              value={description}
              onChangeText={setDescription}
              style={styles.textInput}
              outlineColor={theme.colors.outline}
              activeOutlineColor={theme.colors.primary}
              textColor={theme.colors.onSurface}
              placeholderTextColor={theme.colors.onSurfaceVariant}
              contentStyle={styles.textInputContent}
              textAlignVertical="center"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={[styles.actionButton, styles.cancelButton]}
              labelStyle={[
                styles.actionButtonLabel,
                { color: theme.colors.onSurface },
              ]}
              contentStyle={styles.actionButtonContent}
            >
              Peruuta
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={[styles.actionButton, styles.submitButton]}
              labelStyle={[
                styles.actionButtonLabel,
                { color: theme.colors.onPrimary },
              ]}
              contentStyle={styles.actionButtonContent}
            >
              Lähetä
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 24,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
  },
  ratingSection: {
    marginBottom: 24,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  ratingContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: -8,
  },
  ratingButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  ratingButton: {
    minWidth: 40,
    height: 40,
    borderRadius: 20,
  },
  ratingButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: "transparent",
  },
  textInputContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 80,
    textAlignVertical: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
  cancelButton: {
    borderWidth: 1.5,
  },
  submitButton: {
    elevation: 2,
  },
  actionButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionButtonContent: {
    paddingVertical: 8,
  },
});
