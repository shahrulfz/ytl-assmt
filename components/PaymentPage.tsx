import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BiometricAuth from "./BiometricAuth"; // Biometric Authentication Component
import ConfirmationScreen from "./ConfirmationScreen"; // Confirmation screen component
import { processTransaction } from "../api/transactionApi"; // Mock API call for transaction processing

type PaymentData = {
  recipientAccount: string;
  amount: string;
  transactionType: string;
};

const PaymentPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [recipientAccount, setRecipientAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPaymentButtonClicked, setIsPaymentButtonClicked] =
    useState<boolean>(false);

  const handleFormSubmit = async () => {
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

    if (isPaymentButtonClicked) {
      setIsPaymentButtonClicked(false); // Reset button click state after biometric auth
      try {
        await processTransaction(parsedAmount); // Simulate API call for transaction
        setBalance(balance - parsedAmount);
        setConfirmation(
          `$${parsedAmount} sent to ${recipientAccount} via ${transactionType}.`
        );
        setErrorMessage(""); // Clear error message on successful transaction
      } catch (error) {
        setConfirmation("Transaction failed, please try again.");
        setErrorMessage(""); // Clear error message on failure
      }
    }
  };

  const handleBiometricAuthenticate = () => {
    setIsPaymentButtonClicked(true);
    // Trigger biometric authentication
    setAuthenticated(true); // Simulating biometric authentication success
  };

  if (confirmation) {
    return (
      <ConfirmationScreen
        onDone={() => setConfirmation("")}
        details={confirmation}
      />
    );
  }

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
          <Text style={{ fontSize: 24, color: "#4c669f" }}>${balance}</Text>
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
        <Text style={{ color: "white", marginBottom: 10 }}>Amount:</Text>
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
          placeholder="Enter amount"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Transaction Type Dropdown */}
        <Text style={{ color: "white", marginBottom: 10 }}>
          Transaction Type:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 8,
            marginBottom: 15,
          }}
        >
          <TextInput
            style={{
              height: 45,
              paddingHorizontal: 10,
              fontSize: 16,
              color: "white",
            }}
            placeholder="Select transaction type"
            placeholderTextColor="#aaa"
            value={transactionType}
            onChangeText={setTransactionType}
          />
        </View>

        {/* Error Message */}
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
          onPress={handleBiometricAuthenticate}
          color="#4c669f"
        />

        {/* Biometric Authentication */}
        {isPaymentButtonClicked && !authenticated && (
          <BiometricAuth onAuthenticate={() => setAuthenticated(true)} />
        )}
      </View>
    </LinearGradient>
  );
};

export default PaymentPage;
