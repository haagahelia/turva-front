import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafetyStore } from "../../../src/store";


export default function SafetyBriefing() {
  const theme = useTheme();
  const { completed } = useSafetyStore();

  const briefingItems = [
    { label: 'Turvallinen Haaga-Helia', route: '/home/briefing-item?item=turvallinen-hh' },
    { label: 'Toimi Vastuullisesti', route: '/home/briefing-item?item=toimi-vastuullisesti' },
    { label: 'Turvallisuushavaintoilmoitus', route: '/home/briefing-item?item=havaintoilmoitus' },
    { label: 'Turvallisuuskävely', route: '/home/briefing-item?item=turvallisuuskavely' },
    { label: 'Toiminta Häiriötilanteessa', route: '/home/briefing-item?item=hairiotilanne' },
    { label: 'Pelastussuunnitelma', route: '/home/briefing-item?item=pelastussuunnitelma' },
    { label: 'Poistuminen Rakennuksesta', route: '/home/briefing-item?item=poistuminen' },
    { label: 'Sisälle Suojautuminen 1', route: '/home/briefing-item?item=suojautuminen-1' },
    { label: 'Sisälle Suojautuminen 2', route: '/home/briefing-item?item=suojautuminen-2' },
    { label: 'Äärimmäinen Väkivaltatilanne', route: '/home/briefing-item?item=vakivaltatilanne' },
    { label: 'Oman Työn Riskit', route: '/home/briefing-item?item=oman-tyon-riskit' },
  ];
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Turvallisuusperehdytys
        </Text>
        <Text style={[styles.description, { color: theme.colors.onBackground }]}>
          Haaga-Helia haluaa tarjota ja varmistaa korkeakouluyhteisöllemme turvallisen ja
          viihtyisän ympäristön opiskella ja työskennellä.
          Ympäristön, jossa on hyvä olla, osallistua ja oppia.
          Opiskelijoiden ja henkilökunnan turvallisuus on yhteinen asiamme, jossa jokaisen
          haaga-helialaisen panos on tärkeä.
        </Text>

        <Text style={[styles.description, { color: theme.colors.onBackground }]}>
            Turvallisuusperehdytyksen tavoitteena on opiskelijoiden turvallisuusosaamisen varmistaminen
            ja Haaga-Helian turvallisuuskulttuurin edistäminen. Perehdytyksen suoritettuasi olet tutustunut
            Haaga-Helian kampuksiin, niiden turvallisuuteen ja tiedät miten toimia eri häiriötilanteissa.
        </Text>

        <View style={styles.buttonStack}>
            <Button
            mode="outlined"
            onPress={() => router.navigate('/???')} // FIX ROUTE LATER
            style={[styles.button, { backgroundColor: 'transparent', borderColor: theme.colors.primary }]}
            contentStyle={{ justifyContent: 'center', alignItems: 'center' }}
            labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
            >
            Info & Tips
        </Button>

          {briefingItems.map((item, index) => {
            const isCompleted = completed.includes(item.route);
            return (
              <Button
                key={index}
                mode="contained"
                onPress={() => router.navigate(item.route)}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                labelStyle={styles.buttonLabel}
                icon={({ size, color }) =>
                  isCompleted ? (
                    <MaterialCommunityIcons name="check-circle" size={size} color={color} />
                  ) : (
                    <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={size} color={color} />
                  )
                }
              >
                {item.label}
              </Button>

              
            );
          })}

        <Button
            mode="outlined"
            onPress={() => router.navigate('/???')} // FIX ROUTE LATER
            style={[styles.button, { backgroundColor: 'transparent', borderColor: theme.colors.primary }]}
            contentStyle={{ justifyContent: 'center', alignItems: 'center' }}
            labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
            >
            Anna Palautetta
        </Button>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20, justifyContent: 'flex-start' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  buttonStack: { width: '100%', marginBottom: 30 },
  button: { width: '100%', borderRadius: 8, marginBottom: 16, height: 70, justifyContent: 'center' },
  buttonLabel: { fontSize: 18, textAlign: 'center' },
});
