import { StyleSheet, Text, View } from "react-native";

export default function GameIndex() {
  return (
    <View style={styles.container}>
      <Text>This is game screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
