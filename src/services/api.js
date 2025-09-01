import axios from 'axios';
import * as Keychain from 'react-native-keychain';

// Replace with your backend URL
const BASE_URL = 'http://192.168.1.10:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add the access token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const { accessToken } = JSON.parse(credentials.password);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    } catch (error) {
      console.error('Failed to retrieve access token from Keychain', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle expired access tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is 401 (Unauthorized) and it's not a login or refresh request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const { refreshToken } = JSON.parse(credentials.password);
          // Request a new access token using the refresh token
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
          
          // Store the new access token securely
          const newCredentials = {
            accessToken: data.accessToken,
            refreshToken: refreshToken,
          };
          await Keychain.setGenericPassword('tokens', JSON.stringify(newCredentials));
          
          // Update the header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token or re-login', refreshError);
        // If refresh fails, clear tokens and prompt user to log in again
        await Keychain.resetGenericPassword();
        // You can add logic here to navigate to the Login screen
      }
    }
    return Promise.reject(error);
  }
);

export default api;