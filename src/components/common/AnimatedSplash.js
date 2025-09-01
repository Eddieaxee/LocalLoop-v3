import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const AnimatedSplash = ({ onAnimationFinish }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();

    // Start fade-out after a delay (e.g., 2 seconds)
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        SplashScreen.hideAsync();
        onAnimationFinish();
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, onAnimationFinish]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/splash.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default AnimatedSplash;
