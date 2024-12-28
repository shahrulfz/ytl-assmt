import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Gradient
import { useNavigation } from "@react-navigation/native"; // Navigation hook

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const navigateToPage = (page: string) => {
    navigation.navigate(page);
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f5d"]}
      style={styles.container}
    >
      <Text style={styles.title}>My Digital Bank</Text>

      {/* Horizontal ScrollView for tiles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tilesContainer}
      >
        {/* Tile for Payment */}
        <TouchableOpacity
          style={styles.tile}
          onPress={() => navigateToPage("Payment")}
        >
          <Text style={styles.tileText}>Payment</Text>
        </TouchableOpacity>

        {/* Blank Page Tiles */}
        <TouchableOpacity
          style={styles.tile}
          onPress={() => navigateToPage("Blank")}
        >
          <Text style={styles.tileText}>Loan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tile}
          onPress={() => navigateToPage("Blank")}
        >
          <Text style={styles.tileText}>Investment</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get("window"); // Get the screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%", // Ensure full screen width
    maxWidth: 375, // Max width to 375px
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  tilesContainer: {
    flexDirection: "row", // Horizontal layout for tiles
    justifyContent: "flex-start", // Start the tiles from the left
    alignItems: "center",
    paddingHorizontal: 10, // Add some padding inside the ScrollView
  },
  tile: {
    backgroundColor: "#fff",
    width: Math.min(100, width * 0.25), // Dynamically adjust tile width
    height: 100,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  tileText: {
    fontSize: 14, // Smaller text size
    color: "#4c669f",
    textAlign: "center",
  },
});

export default Dashboard;
