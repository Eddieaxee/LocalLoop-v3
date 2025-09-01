import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import {
  useFonts,
  Inter_700Bold,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  NunitoSans_400Regular,
  NunitoSans_300Light,
} from '@expo-google-fonts/nunito-sans';
import AuthContext from '../../../context/AuthContext'; // Import AuthContext

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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Use the login function from context

  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    NunitoSans_400Regular,
    NunitoSans_300Light,
  });

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    const success = await login(email, password);
    if (success) {
      // Logic for successful login, maybe navigate to a main app screen
      console.log('Login successful!');
    } else {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

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
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.secondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>
        
        <Pressable 
          style={styles.loginButton} 
          onPress={handleLogin} // Call the handleLogin function
        >
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (unchanged styles from before)
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBg,
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
  loginButton: {
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
  signupText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: 'Inter_700Bold',
  },
  forgotPasswordText: {
    color: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
    textAlign: 'right',
    width: '100%',
    marginBottom: 15,
  },
});

export default LoginScreen;