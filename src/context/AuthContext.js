import React, { createContext, useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This function will be called on app start to check for a valid session
  const checkStoredTokens = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        // Here, you would typically use the refresh token to get a new access token
        // For now, we'll just assume a token exists to set the user state
        console.log('User has stored tokens, setting user state.');
        setUser({ id: 'someUserId', email: 'user@example.com' }); // Replace with actual user info
      }
    } catch (error) {
      console.log('No tokens found, user is not logged in.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStoredTokens();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      await Keychain.setGenericPassword('tokens', JSON.stringify(data));
      setUser({ id: 'someUserId', email: email });
      return true;
    } catch (e) {
      console.error('Login failed:', e.response?.data?.message || e.message);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      // You can decide if you want to automatically log in the user after signup
      // For now, we'll just return true and the screen will handle navigation
      return true;
    } catch (e) {
      console.error('Signup failed:', e.response?.data?.message || e.message);
      return false;
    }
  };

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;