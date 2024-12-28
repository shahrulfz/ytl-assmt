import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, Alert, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BiometricAuth from "./BiometricAuth"; // Biometric Authentication Component
import ConfirmationScreen from "./ConfirmationScreen"; // Confirmation screen component
import { processTransaction } from "../api/transactionApi"; // Mock API call for transaction processing
import { Picker } from "@react-native-picker/picker"; // Correct import for Picker

const PaymentPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [recipientAccount, setRecipientAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.00"); // Default to 0.00
  const [transactionType, setTransactionType] = useState<string>("duitnow"); // Default to 'duitnow'
  const [note, setNote] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPaymentButtonClicked, setIsPaymentButtonClicked] =
    useState<boolean>(false);

  const amountInputRef = useRef<TextInput | null>(null); // Reference for the amount input

  // Helper function to format number to currency (RM)
  const formatCurrency = (value: string): string => {
    // Remove any non-numeric characters except for decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    const floatValue = parseFloat(numericValue);

    if (isNaN(floatValue)) {
      return "0.00";
    }

    return floatValue
      .toLocaleString("en-MY", {
        style: "currency",
        currency: "MYR",
      })
      .replace("RM", "")
      .trim(); // Remove 'RM' as we add it manually
  };

  // Handle form submit
  const handleFormSubmit = () => {
    // Validate required fields
    if (!recipientAccount || !amount || !transactionType) {
      setErrorMessage(
        "Recipient account, transaction type, and amount are required fields."
      );
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setErrorMessage("Amount must be a valid number.");
      return;
    }

    if (parsedAmount > balance) {
      setErrorMessage("Insufficient funds.");
      return;
    }

    // Proceed to Biometric Authentication
    setIsPaymentButtonClicked(true); // Trigger the biometric authentication after form validation
  };

  // Handle biometric authentication
  const handleBiometricAuthenticate = () => {
    setAuthenticated(true); // Simulating biometric authentication success
  };

  // Process the payment after biometric authentication
  const processPayment = async () => {
    const parsedAmount = parseFloat(amount);

    try {
      await processTransaction(parsedAmount); // Simulate API call for transaction
      setBalance(balance - parsedAmount);
      setConfirmation(
        `RM${parsedAmount} sent to ${recipientAccount} via ${transactionType}.`
      );
      setErrorMessage(""); // Clear error message on successful transaction
    } catch (error) {
      setConfirmation("Transaction failed, please try again.");
      setErrorMessage(""); // Clear error message on failure
    }
  };

  if (confirmation) {
    return (
      <ConfirmationScreen
        onDone={() => setConfirmation("")}
        details={confirmation}
      />
    );
  }

  // Handle amount input changes and ensure it formats correctly
  const handleAmountChange = (text: string) => {
    let formattedAmount = formatCurrency(text);
    setAmount(formattedAmount);
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f5d"]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        {/* Title Text */}
        <Text
          style={{
            fontSize: 24,
            color: "white",
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          Payment Page
        </Text>

        {/* Balance Display */}
        <View
          style={{
            marginBottom: 20,
            padding: 15,
            backgroundColor: "white",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
            Current Balance
          </Text>
          <Text style={{ fontSize: 24, color: "#4c669f" }}>RM {balance}</Text>
        </View>

        {/* Recipient Account Field */}
        <Text style={{ color: "white", marginBottom: 10 }}>
          Recipient Account:
        </Text>
        <TextInput
          style={{
            height: 45,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            color: "white",
          }}
          placeholder="Enter recipient account number"
          placeholderTextColor="#aaa"
          value={recipientAccount}
          onChangeText={setRecipientAccount}
        />

        {/* Amount Field */}
        <Text style={{ color: "white", marginBottom: 10 }}>Amount (RM):</Text>
        <TextInput
          ref={amountInputRef}
          style={{
            height: 45,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            color: "white",
            textAlign: "left", // Align text to the right
          }}
          placeholder="0.00"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
        />

        {/* Transaction Type Dropdown */}
        <Text style={{ color: "white", marginBottom: 10 }}>
          Transaction Type:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#4c669f",
            borderRadius: 8,
            marginBottom: 15,
            backgroundColor: "#3b5998",
          }}
        >
          <Picker
            selectedValue={transactionType}
            style={{ height: 45, fontSize: 16 }}
            onValueChange={(itemValue) => setTransactionType(itemValue)}
          >
            <Picker.Item label="DuitNow" value="duitnow" />
            <Picker.Item label="Credit Card" value="creditcard" />
          </Picker>
        </View>

        {/* Error Message Display */}
        <Text
          style={{
            color: "red",
            marginBottom: 10,
            fontSize: 16,
            display: errorMessage ? "flex" : "none", // Hide if no errorMessage
          }}
        >
          {errorMessage}
        </Text>

        {/* Note Field (Optional) */}
        <Text style={{ color: "white", marginBottom: 10 }}>
          Note (optional):
        </Text>
        <TextInput
          style={{
            height: 45,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 20,
            paddingHorizontal: 10,
            fontSize: 16,
            color: "white",
          }}
          placeholder="Add a note"
          placeholderTextColor="#aaa"
          value={note}
          onChangeText={setNote}
        />

        {/* Submit Button (Submit Payment) */}
        <Button
          title="Submit Payment"
          onPress={handleFormSubmit}
          color="#4c669f"
        />

        {/* Biometric Authentication */}
        {isPaymentButtonClicked && !authenticated && (
          <BiometricAuth onAuthenticate={handleBiometricAuthenticate} />
        )}

        {/* Process the payment after authentication */}
        {authenticated && isPaymentButtonClicked && processPayment()}
      </View>
    </LinearGradient>
  );
};

export default PaymentPage;
