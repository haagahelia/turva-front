import { StyleSheet, ScrollView } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafetyStore } from '../../../src/store';
import { 
  TurvallinenHHContent,
  ToimiVastuullisestiContent,
  TurvallisuushavaintoilmoitusContent,
  TurvallisuuskavelyContent,
  ToimintaHairiotilanteessaContent,
  PelastussuunnitelmaContent,
  PoistuminenRakennuksestaContent,
  SisaileSuojautuminen1Content,
  SisaileSuojautuminen2Content,
  AarinmaineVakivaltatilanneContent,
  OmanTyonRiskitContent
} from './briefing-content';

export default function BriefingItem() {
  const theme = useTheme();
  const { markCompleted } = useSafetyStore();
  const { item } = useLocalSearchParams();

  const contentMap = {
    'turvallinen-hh': {
      title: 'Turvallinen Haaga-Helia',
      component: <TurvallinenHHContent />
    },
    'toimi-vastuullisesti': {
      title: 'Toimi Vastuullisesti',
      component: <ToimiVastuullisestiContent />
    },
    'havaintoilmoitus': {
      title: 'Turvallisuushavaintoilmoitus',
      component: <TurvallisuushavaintoilmoitusContent />
    },
    'turvallisuuskavely': {
      title: 'Turvallisuuskävely',
      component: <TurvallisuuskavelyContent />
    },
    'hairiotilanne': {
      title: 'Toiminta Häiriötilanteessa',
      component: <ToimintaHairiotilanteessaContent />
    },
    'pelastussuunnitelma': {
      title: 'Pelastussuunnitelma',
      component: <PelastussuunnitelmaContent />
    },
    'poistuminen': {
      title: 'Poistuminen Rakennuksesta',
      component: <PoistuminenRakennuksestaContent />
    },
    'suojautuminen-1': {
      title: 'Sisälle Suojautuminen 1',
      component: <SisaileSuojautuminen1Content />
    },
    'suojautuminen-2': {
      title: 'Sisälle Suojautuminen 2',
      component: <SisaileSuojautuminen2Content />
    },
    'vakivaltatilanne': {
      title: 'Äärimmäinen Väkivaltatilanne',
      component: <AarinmaineVakivaltatilanneContent />
    },
    'oman-tyon-riskit': {
      title: 'Oman Työn Riskit',
      component: <OmanTyonRiskitContent />
    },
  };

  const currentItem = contentMap[item as keyof typeof contentMap];

  if (!currentItem) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Item not found</Text>
      </SafeAreaView>
    );
  }

  const handleComplete = () => {
    markCompleted(`/home/briefing-item?item=${item}`);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          {currentItem.title}
        </Text>
        
        {currentItem.component}

        <Button
          mode="contained"
          onPress={handleComplete}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={styles.buttonLabel}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="check-circle" size={size} color={color} />
          )}
        >
          Merkitse luetuksi
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: { borderRadius: 8, marginTop: 20 },
  buttonLabel: { fontSize: 18 },
});