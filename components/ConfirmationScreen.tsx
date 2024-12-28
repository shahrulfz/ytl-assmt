import React from 'react';
import { View, Text, Button } from 'react-native';

interface ConfirmationScreenProps {
  details: string;
  onDone: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ details, onDone }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{details}</Text>
      <Button title="Done" onPress={onDone} />
    </View>
  );
};

export default ConfirmationScreen;
