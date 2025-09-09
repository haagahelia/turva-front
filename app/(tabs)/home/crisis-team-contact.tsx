import { StyleSheet, Text, View } from 'react-native';

// Kriisiryhmän yhteystiedot screen
export default function CrisisTeamContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kriisiryhmän yhteystiedot</Text>
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


