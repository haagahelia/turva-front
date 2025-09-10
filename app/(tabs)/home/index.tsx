import ThemeButton from '@/src/components/ThemeButton';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


// Koti screen (Index is always the default first screen)
export default function Index() {

  // This is how you access the environment variables
  // This can be removed later
  const theme = useTheme();
  const envTest = process.env.EXPO_PUBLIC_NAME;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>Koti</Text>
      <Text style={[styles.description, { color: theme.colors.onBackground }]}>The name is testing the environment variables</Text>
      <Text style={[styles.name, { color: theme.colors.primary }]}>{envTest}</Text>
      <ThemeButton></ThemeButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    marginBottom: 10,
  },
});
