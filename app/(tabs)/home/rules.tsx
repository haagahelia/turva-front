import { StyleSheet, Text, View } from 'react-native';

// Järjestyssäännöt screen
export default function RulesAndRegulationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Järjestyssäännöt</Text>
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


