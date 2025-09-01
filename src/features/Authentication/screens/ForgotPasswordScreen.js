import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView } from 'react-native';
import {
  useFonts,
  Inter_700Bold,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  NunitoSans_400Regular,
  NunitoSans_300Light,
} from '@expo-google-fonts/nunito-sans';

const COLORS = {
  primary: '#3B4C5A',
  secondary: '#6C7A89',
  accent: '#E4B363',
  lightBg: '#F8F9FA',
  darkBg: '#1B1B1B',
};

const FONT_SIZES = {
  headline: 28,
  subhead: 20,
  body: 16,
  caption: 12,
};

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    NunitoSans_400Regular,
    NunitoSans_300Light,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a password reset link.
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.secondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Pressable 
            style={styles.button} 
            onPress={() => {
              // Future password reset request logic goes here
              console.log('Password reset requested for:', email);
            }}
          >
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backToLoginText}>
              <Text style={styles.linkText}>Back to Log In</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: FONT_SIZES.headline,
    color: COLORS.primary,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.body,
    color: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: FONT_SIZES.body,
    fontFamily: 'Inter_700Bold',
  },
  backToLoginText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: 'Inter_700Bold',
  },
});

export default ForgotPasswordScreen;