import { StyleSheet, Text, View } from 'react-native';

// Lataa 112-sovellus screen
export default function EmergencyAppScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lataa 112-sovellus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
});


