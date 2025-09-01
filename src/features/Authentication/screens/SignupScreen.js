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
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import AuthContext from '../../../context/AuthContext'; // Import AuthContext

const COLORS = {
  primary: '#3B4C5A',
  secondary: '#6C7A89',
  accent: '#E4B363',
  lightBg: '#F8F9FA',
  darkBg: '#1B1B1B',
  google: '#DB4437',
  apple: '#000000',
  facebook: '#4267B2',
};

const FONT_SIZES = {
  headline: 28,
  subhead: 20,
  body: 16,
  caption: 12,
};

const Divider = () => <View style={styles.divider} />;

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext); // Use the signup function from context

  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    NunitoSans_400Regular,
    NunitoSans_300Light,
  });

  if (!fontsLoaded) return null;

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    const success = await signup(name, email, password);
    if (success) {
      Alert.alert("Success", "Account created! Please check your email for a verification link.");
      navigation.navigate('EmailVerification');
    } else {
      Alert.alert("Signup Failed", "An error occurred during registration. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join LocalLoop</Text>
      <Text style={styles.subtitle}>Create your new account</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={COLORS.secondary}
          value={name}
          onChangeText={setName}
        />
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
        
        <Pressable 
          style={styles.signupButton} 
          onPress={handleSignup} // Call the handleSignup function
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.linkText}>Log In</Text>
          </Text>
        </Pressable>
      </View>

      <View style={styles.orContainer}>
        <Divider />
        <Text style={styles.orText}>OR</Text>
        <Divider />
      </View>

      <View style={styles.socialButtonsContainer}>
        <Pressable 
          style={[styles.socialButton, { backgroundColor: COLORS.google }]}
          onPress={() => console.log('Google sign-in pressed')}
        >
          <AntDesign name="google" size={24} color="white" />
          <Text style={styles.socialButtonText}>Google</Text>
        </Pressable>

        <Pressable 
          style={[styles.socialButton, { backgroundColor: COLORS.apple }]}
          onPress={() => console.log('Apple sign-in pressed')}
        >
          <FontAwesome name="apple" size={24} color="white" />
          <Text style={styles.socialButtonText}>Apple</Text>
        </Pressable>

        <Pressable 
          style={[styles.socialButton, { backgroundColor: COLORS.primary }]}
          onPress={() => console.log('Phone number/WhatsApp sign-in pressed')}
        >
          <FontAwesome name="phone" size={24} color="white" />
          <Text style={styles.socialButtonText}>Phone Number</Text>
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
  signupButton: {
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
  loginText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: 'Inter_700Bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.secondary,
  },
  orText: {
    width: 50,
    textAlign: 'center',
    color: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
  },
  socialButtonsContainer: {
    width: '100%',
    gap: 15,
  },
  socialButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  socialButtonText: {
    color: 'white',
    fontSize: FONT_SIZES.body,
    fontFamily: 'Inter_700Bold',
    marginLeft: 10,
  },
});

export default SignupScreen;