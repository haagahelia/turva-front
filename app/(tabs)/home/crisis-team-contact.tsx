import { FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactCard from '../../../src/components/ContactCard';
import { Contact } from '../../../src/types';

// Temporary later can be fetched from backend
const crisisTeamMembers: Contact[] = [
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
    name: 'Hannu Hyttinen',
    role: 'Toimitilapäällikkö',
    phone: '040 488 7144',
  },
  {
    name: 'Mia Kivelä',
    role: 'Turvallisuuspäällikkö',
    phone: '050 911 1644',
  },
];

// Kriisiryhmän yhteystiedot screen
export default function CrisisTeamContactScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text 
          variant="headlineLarge" 
          style={[styles.title, { color: theme.colors.onBackground }]}
        >
          Haaga-Helian valmius- ja kriisiryhmä
        </Text>
        <Text 
          variant="bodyLarge" 
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
        >
          Haaga-Heliassa on valmius- ja kriisiryhmä, jonka tehtävänä on huolehtia 
          häiriötilanteisiin varautumisesta sekä toiminnasta häiriötilanteissa, 
          jotka koskevat koko Haaga-Heliaa.
        </Text>
      </View>

      <FlatList
        data={crisisTeamMembers}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={styles.contactsContainer}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: 20,
  },
  title: {
    fontWeight: '700',
    marginBottom: 16,
    lineHeight: 32,
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


