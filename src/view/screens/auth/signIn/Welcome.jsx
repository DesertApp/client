import { StyleSheet, Text, View } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
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
