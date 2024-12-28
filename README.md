## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your machine.
2. **Expo CLI**: Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```
3. **Android Emulator or Device**:
   - For Android Emulator, ensure it has biometric capabilities enabled.
   - For physical devices, ensure biometric authentication is set up.

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   expo start
   ```

4. Run the app:

   - On an Android Emulator or physical device with biometric support.
   - Use the Expo Go app for quick testing.

### Biometric Setup for Android Emulator

1. Open Android Virtual Device Manager.
2. Edit your emulator and enable "Fingerprint" support.
3. Set up biometric credentials in the emulator by navigating to Settings > Security > Fingerprint.

## Design Decisions

### 1. **Biometric Authentication**

- Chose `expo-local-authentication` for seamless integration with Expo apps.
- Fallback support (e.g., PIN) ensures functionality on devices without biometric capabilities.

### 2. **Currency Formatting**

- Used `toLocaleString` to display amounts in MYR format for user clarity and compliance with local conventions.

### 3. **Separation of Concerns**

- Modularized the app into reusable components:
  - `PaymentPage` handles payment logic and UI.
  - `BiometricAuth` manages biometric authentication.
  - `ConfirmationScreen` displays the result of transactions.

### 4. **Error Handling**

- Added user-friendly error messages for form validation and failed authentication attempts.

### 5. **Styling**

- Used `LinearGradient` for a modern UI aesthetic.
- Incorporated input field placeholders and dynamic error messages for improved UX.

## Challenges Faced

- **Biometric Setup in Emulator**: Configuring biometric support in Android and IOS emulators required extra steps to simulate authentication.
- **Dynamic Currency Formatting**: Ensuring input validation and currency formatting remained consistent during user interactions.



