import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens and context
import AnimatedSplash from './src/components/common/AnimatedSplash';
import OnboardingScreen from './src/features/Authentication/onboarding/OnboardingScreen';
import LoginScreen from './src/features/Authentication/screens/LoginScreen';
import SignupScreen from './src/features/Authentication/screens/SignupScreen';
import ForgotPasswordScreen from './src/features/Authentication/screens/ForgotPasswordScreen';
import EmailVerificationScreen from './src/features/Authentication/screens/EmailVerificationScreen';
import { AuthProvider } from './src/context/AuthContext'; // Import the AuthProvider

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [isSplashComplete, setSplashComplete] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleSplashAnimationFinish = () => {
    setSplashComplete(true);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  if (!isSplashComplete) {
    return <AnimatedSplash onAnimationFinish={handleSplashAnimationFinish} />;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!hasCompletedOnboarding ? (
            <Stack.Screen name="Onboarding">
              {() => <OnboardingScreen onOnboardingComplete={handleOnboardingComplete} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;