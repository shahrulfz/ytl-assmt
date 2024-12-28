import React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { View, Button, Alert, StyleSheet } from 'react-native';

const BiometricAuth: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
        console.log('alert')
      Alert.alert('Error', 'Biometric authentication is not available on this device.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to proceed',
    });

    if (result.success) {
      onAuthenticated();
    } else {
      Alert.alert('Authentication Failed', 'Unable to verify your identity.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Click" onPress={handleBiometricAuth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default BiometricAuth;
