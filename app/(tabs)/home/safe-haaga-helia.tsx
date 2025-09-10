import { StyleSheet, Text, View } from 'react-native';



// Turvallinen Haaga-Helia screen
export default function SafeHaagaHeliaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turvallinen Haaga-Helia</Text>
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


