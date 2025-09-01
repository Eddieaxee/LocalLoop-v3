import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
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

const EmailVerificationScreen = ({ navigation }) => {
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
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          A verification link has been sent to your email address. Please check your inbox and click the link to verify your account.
        </Text>
        
        <Pressable 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Back to Log In</Text>
        </Pressable>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.body,
    color: COLORS.secondary,
    fontFamily: 'NunitoSans_400Regular',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
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
});

export default EmailVerificationScreen;