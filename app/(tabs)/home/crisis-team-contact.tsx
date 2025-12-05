import { useLanguageStore } from "@/src/zustand/store";
import TextData from "@/static/drawerTexts.json";
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactCard from '../../../src/components/ContactCard';

type Contact = {
  name: string;
  role: string;
  phone: string;
}
// Temporary later can be fetched from backend
const crisisTeamMembers = { fi: [
  {
    name: 'Teemu Kokko',
    role: 'Rehtori',
    phone: '050 555 1131',
  },
  {
    name: 'Minna Hiillos',
    role: 'Vararehtori',
    phone: '050 583 9521',
  },
  {
    name: 'Kari Salmi',
    role: 'Hallintojohtaja',
    phone: '0400 675 114',
  },
  {
    name: 'Ari Nevalainen',
    role: 'Viestintäpäällikkö',
    phone: '040 488 7008',
  },
  {
    name: 'Jenni Most',
    role: 'Toimitilapäällikkö',
    phone: '040 488 7144',
  },
  {
    name: 'Virpi Virtanen',
    role: 'ICT-infrastruktuuripäällikkö',
    phone: '050 911 1644',
  },
  {
    name: 'Mia Kivelä',
    role: 'Turvallisuuspäällikkö',
    phone: '050 911 1644',
  },
], en: [
  {
    name: 'Teemu Kokko',
    role: 'Rector',
    phone: '050 555 1131',
  },
  {
    name: 'Minna Hiillos',
    role: 'Vice Rector',
    phone: '050 583 9521',
  },
  {
    name: 'Kari Salmi',
    role: 'Administrative Director',
    phone: '0400 675 114',
  },
  {
    name: 'Ari Nevalainen',
    role: 'Communications Manager',
    phone: '040 488 7008',
  },
  {
    name: 'Jenni Most',
    role: 'Facilities Manager',
    phone: '040 488 7144',
  },
  {
    name: 'Virpi Virtanen',
    role: 'ICT-infrastructure Manager',
    phone: '050 911 1644',
  },
  {
    name: 'Mia Kivelä',
    role: 'Security Manager',
    phone: '050 911 1644',
  },
]};

// Kriisiryhmän yhteystiedot screen
export default function CrisisTeamContactScreen() {
  const theme = useTheme();
  const {language} = useLanguageStore();
  const text = TextData[language].crisisTeamContact;

  return (
  <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={[]}>
    <FlatList
      data={crisisTeamMembers[language]}
      keyExtractor={(item, index) => `${item.name}-${index}`}
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
            style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
          >
            {text.description}
          </Text>
        </View>
      }
      renderItem={({ item: member }) => (
        <ContactCard member={member} />
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
    fontWeight: '700',
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


