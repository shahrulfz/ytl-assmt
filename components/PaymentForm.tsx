import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

interface PaymentFormProps {
  onSubmit: (data: { recipient: string; amount: string }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    onSubmit({ recipient, amount });
  };

  return (
    <View>
      <TextInput
        placeholder="Recipient"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        placeholder="Amount"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default PaymentForm;
