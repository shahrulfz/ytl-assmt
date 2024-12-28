import React from "react";
import { View, Button, Alert, Platform } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

interface BiometricAuthProps {
  onAuthenticate: () => void;
}

const BiometricAuth: React.FC<BiometricAuthProps> = ({ onAuthenticate }) => {
  const authenticate = async () => {
    if (typeof window !== "undefined" && Platform.OS === "web") {
      // alert('Biometric authentication is not supported on the web.')
      onAuthenticate();
      // to skip authenticate
      return;
    }

    try {
      const rnBiometrics = new ReactNativeBiometrics();

      // Check if the device supports biometrics
      const isSensorAvailable = await rnBiometrics.isSensorAvailable();
      if (isSensorAvailable.available) {
        // Prompt user for biometric authentication
        const result = await rnBiometrics.simplePrompt({
          promptMessage: "Authenticate to proceed",
        });
        if (result.success) {
          onAuthenticate(); // Biometrics authenticated, proceed
        } else {
          Alert.alert("Authentication failed", "Please try again.");
        }
      } else {
        // Fallback alert for devices without biometric capabilities
        Alert.alert(
          "Biometric authentication not available",
          "Your device does not support biometrics. Please use a different authentication method."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during authentication.");
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Button title="Authenticate with Biometrics" onPress={authenticate} />
    </View>
  );
};

export default BiometricAuth;
