import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import PaymentPage from '../PaymentPage';

const Dashboard: React.FC = () => {
  const [showPayment, setShowPayment] = useState(false);

  const navigateToPaymentPage = () => {
    setShowPayment(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Your Dashboard</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Your Balance: $1000</Text>
      {!showPayment ? (
        <Button title="Go to Payment" onPress={navigateToPaymentPage} />
      ) : (
        <PaymentPage />
      )}
    </View>
  );
};

export default Dashboard;
