import React from "react";
import { View, Text } from "react-native";

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Balance: ${balance}
      </Text>
    </View>
  );
};

export default BalanceDisplay;
