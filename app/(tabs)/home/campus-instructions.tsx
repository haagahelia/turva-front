import { StyleSheet, Text, View } from 'react-native';

// Kampuskohtaiset ohjeet screen
export default function CampusInstructionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kampuskohtaiset ohjeet</Text>
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


