import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BlankPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a Blank Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
});

export default BlankPage;
