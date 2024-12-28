import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./components/Dashboard"; // Dashboard Component
import PaymentPage from "./components/PaymentPage"; // PaymentPage Component
import BlankPage from "./components/BlankPage"; // BlankPage Component

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Payment" component={PaymentPage} />
        <Stack.Screen name="Blank" component={BlankPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
