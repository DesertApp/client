import { StyleSheet, Text, View } from "react-native";

export default function Protocol() {
  return (
    <View style={styles.container}>
      <Text>Protocol</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
