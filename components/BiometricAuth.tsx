import React from "react";
import { View, Button, Alert, Platform } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

interface BiometricAuthProps {
  onAuthenticate: () => void;
}

const BiometricAuth: React.FC<BiometricAuthProps> = ({ onAuthenticate }) => {
  const authenticate = async () => {
    if (typeof window !== "undefined" && Platform.OS === "web") {
      // Biometric authentication is not supported on the web
      alert("Biometrics not supported on web");
      // onAuthenticate(); // Skip authentication on web
      return;
    }

    try {
      // Check if the device supports biometric authentication
      const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasBiometricHardware) {
        Alert.alert(
          "Biometric authentication not available",
          "Your device does not support biometrics. Please use a different authentication method."
        );
        return;
      }

      // Check available authentication types (e.g., fingerprint, face recognition)
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (supportedTypes.length === 0) {
        Alert.alert(
          "Biometric authentication not available",
          "Your device does not support any biometric methods."
        );
        return;
      }

      // Prompt the user for biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to proceed",
        fallbackLabel: "Use PIN",
      });

      if (result.success) {
        onAuthenticate(); // Biometrics authenticated, proceed
      } else if ((result.error = "not_enrolled")) {
        Alert.alert("Biometric failed", "Please enable biometric.");
      } else {
        Alert.alert("Authentication failed", "Please try again.");
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
