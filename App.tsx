// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello World</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import BalanceDisplay from './components/BalanceDisplay';
import PaymentForm from './components/PaymentForm';
import BiometricAuth from './components/BiometricAuth';

const App: React.FC = () => {
  const [balance, setBalance] = useState(1000); // Mock balance
  const [authenticated, setAuthenticated] = useState(false);

  const handleFormSubmit = (data: { recipient: string; amount: string; note?: string }) => {
    const amount = parseFloat(data.amount);
    if (amount > balance) {
      Alert.alert('Error', 'Insufficient balance.');
      return;
    }
    setBalance(balance - amount);
    Alert.alert('Success', `Transferred $${amount} to ${data.recipient}.`);
  };

  return (
    <View style={styles.container}>
      <BalanceDisplay balance={balance} />
      {authenticated ? (
        <PaymentForm onSubmit={handleFormSubmit} />
      ) : (
        <BiometricAuth onAuthenticated={() => setAuthenticated(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
