Setup Instructions

Prerequisites

Node.js: Ensure you have Node.js installed on your machine.

Expo CLI: Install Expo CLI globally:

npm install -g expo-cli

Android Emulator or Device:

For Android Emulator, ensure it has biometric capabilities enabled.

For physical devices, ensure biometric authentication is set up.

Installation

Clone this repository:

git clone <repository-url>
cd <repository-directory>

Install dependencies:

npm install

Start the development server:

expo start

Run the app:

On an Android Emulator or physical device with biometric support.

Use the Expo Go app for quick testing.

Biometric Setup for Android Emulator

Open Android Virtual Device Manager.

Edit your emulator and enable "Fingerprint" support.

Set up biometric credentials in the emulator by navigating to Settings > Security > Fingerprint.

Design Decisions

1. Biometric Authentication

Chose expo-local-authentication for seamless integration with Expo apps.

Fallback support (e.g., PIN) ensures functionality on devices without biometric capabilities.

2. Currency Formatting

Used toLocaleString to display amounts in MYR format for user clarity and compliance with local conventions.

3. Separation of Concerns

Modularized the app into reusable components:

PaymentPage handles payment logic and UI.

BiometricAuth manages biometric authentication.

