import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Koti screen (Index is always the default first screen)
export default function Index() {
  // This is how you access the environment variables
  // This can be removed later
  const envTest = process.env.EXPO_PUBLIC_NAME;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Koti</Text>
      <Text style={styles.description}>The name is testing the environment variables</Text>
      <Text style={styles.name}>{envTest}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  name: {
    fontSize: 16,
    marginBottom: 10,
    color: 'red',
  },
});
