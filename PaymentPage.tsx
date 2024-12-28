import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import BiometricAuth from './components/BiometricAuth'; // Biometric Authentication Component
import ConfirmationScreen from './components/ConfirmationScreen'; // Confirmation screen component
import { processTransaction } from './api/transactionApi'; // Mock API call for transaction processing

const PaymentPage: React.FC = () => {
  const [balance, setBalance] = useState(1000);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const handleFormSubmit = async () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please enter both recipient and amount.');
      return;
    }

    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        Alert.alert('Error', 'Amount must be a valid number.');
        return;
      }
      if (parsedAmount > balance) {
        Alert.alert('Error', 'Insufficient funds.');
        return;
      }

      await processTransaction(parsedAmount); // Simulate API call for transaction
      setBalance(balance - parsedAmount);
      setConfirmation(`$${parsedAmount} sent to ${recipient}.`);
    } catch (error) {
      setConfirmation('Transaction failed, please try again.');
    }
  };

  if (confirmation) {
    return <ConfirmationScreen onDone={() => setConfirmation('')} details={confirmation} />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Payment Page</Text>
      <Text style={{ marginBottom: 10 }}>Recipient:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter recipient name"
        value={recipient}
        onChangeText={setRecipient}
      />
      <Text style={{ marginBottom: 10 }}>Amount:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      {authenticated ? (
        <Button title="Submit Payment" onPress={handleFormSubmit} />
      ) : (
        <BiometricAuth onAuthenticate={() => setAuthenticated(true)} />
      )}
    </View>
  );
};

export default PaymentPage;
