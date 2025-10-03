import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Koti screen (Index is always the default first screen)
export default function Index() {

  // This is how you access the environment variables
  // This can be removed later
  const theme = useTheme();
  const envTest = process.env.EXPO_PUBLIC_NAME;

  // Added this in anticipation for new screens (where the buttons take us)
  //const handleButtonPress = (screen: string) => {};

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Koti</Text>
          <Text style={[styles.description, { color: theme.colors.onBackground }]}>
            The name is testing the environment variables
          </Text>
          <Text style={[styles.name, { color: theme.colors.primary }]}>{envTest}</Text>

          <View style={styles.buttonStack}>
            <Button
              mode="contained"
              onPress={() => router.push('/(tabs)/home/safety-briefing')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              Turvallisuusperehdytys
            </Button>

            <Button
              mode="contained"
              onPress={() => router.navigate('/(tabs)/home/quiz')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              TurvallisuusMestari
            </Button>

            <Button
              mode="contained"
              onPress={() => router.navigate('/(tabs)/home/bbb')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              Ilmoita turvallisuushavainto
            </Button>

            <Button
              mode="contained"
              onPress={() => router.navigate('/(tabs)/home/aaa')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              Ilmoita epäasiallisesta kohtelusta
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    name: {
      fontSize: 16,
      marginBottom: 30,
      textAlign: 'center',
    },
    buttonStack: {
      width: '100%',
      marginBottom: 30,
    },
    button: {
      width: '100%',
      borderRadius: 8,
      marginBottom: 16,
      height: 80,
      justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: 20,
        textAlign: 'center',
    },
    themeButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
  });