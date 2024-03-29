import { StyleSheet, Text, View } from "react-native";
import ComingSoon from "@/view/com/ComingSoon";

export default function Hub({ navigation }) {
  return (
    <View style={styles.container}>
      <ComingSoon />
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
