import { StyleSheet, Text, View } from 'react-native';

// Tietoa sovelluksesta screen
export default function AboutAppScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tietoa sovelluksesta</Text>
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


