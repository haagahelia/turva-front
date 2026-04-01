import { API_URL } from "@/src/config/api";
import { useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/drawerTexts.json";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactCard from "../../../src/components/ContactCard";

type Contact = {
  contact_id: number;
  name_fi: string;
  name_en: string;
  role_fi: string;
  role_en: string;
  phone: string;
  order_number: number;
};

// Kriisiryhmän yhteystiedot screen
export default function CrisisTeamContactScreen() {
  const theme = useTheme();
  const { language } = useLanguageStore();
  const text = TextData[language].crisisTeamContact;

  const [crisisTeamMembers, setCrisisTeamMembers] = useState<Contact[]>([]);

  const getCrisisTeamFromApiAsync = async () => {
    try {
      const response = await fetch(`${API_URL}/api/crisis-team/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCrisisTeamMembers(data);
    } catch (error) {
      console.error("Error fetching crisis team data:", error);
    }
  };

  useEffect(() => {
    getCrisisTeamFromApiAsync();
  }, []);

  const getMemberForLanguage = (contact: Contact) => {
    return {
      name: language === "fi" ? contact.name_fi : contact.name_en,
      role: language === "fi" ? contact.role_fi : contact.role_en,
      phone: contact.phone,
    };
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={[]}
    >
      <FlatList
        data={crisisTeamMembers}
        keyExtractor={(item) => `${item.contact_id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contactsContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              variant="headlineLarge"
              style={[styles.title, { color: theme.colors.onBackground }]}
            >
              {text.title}
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                styles.description,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {text.description}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ContactCard member={getMemberForLanguage(item)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 25,
  },
  title: {
    fontWeight: "700",
    marginBottom: 16,
    lineHeight: 32,
    marginTop: 40,
  },
  description: {
    lineHeight: 24,
    opacity: 0.9,
  },
  contactsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
