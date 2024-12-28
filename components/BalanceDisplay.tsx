import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Balance:</Text>
      <Text style={styles.amount}>${balance.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
});

export default BalanceDisplay;
