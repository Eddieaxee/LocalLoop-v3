import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedRef,
} from 'react-native-reanimated';
import {
  useFonts,
  Inter_700Bold,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  NunitoSans_400Regular,
  NunitoSans_300Light,
} from '@expo-google-fonts/nunito-sans';
import { onboardingData } from './onboardingData';

const { width, height } = Dimensions.get('window');

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

const Analytics = {
  trackEvent: (eventName, data) => {
    console.log(`Analytics Event: ${eventName}`, data);
  },
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const OnboardingScreen = ({ onOnboardingComplete }) => {
  const pagerRef = useAnimatedRef();
  const [currentPage, setCurrentPage] = useState(0);

  const continueScale = useSharedValue(1);
  const skipScale = useSharedValue(1);

  // New shared value for text animation
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(50);

  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    NunitoSans_400Regular,
    NunitoSans_300Light,
  });

  const onSkip = () => {
    Analytics.trackEvent('onboarding_skipped', { action: 'skip' });
    skipScale.value = withSpring(0.8, {}, () => {
      skipScale.value = withSpring(1);
    });
    if (typeof onOnboardingComplete === 'function') {
      onOnboardingComplete();
    }
  };

  const onNext = () => {
    if (currentPage < onboardingData.length - 1) {
      if (pagerRef.current) {
        pagerRef.current.setPage(currentPage + 1);
      }
      continueScale.value = withSpring(0.8, {}, () => {
        continueScale.value = withSpring(1);
      });
    } else {
      onFinish();
    }
  };

  const onFinish = () => {
    Analytics.trackEvent('onboarding_completed', { action: 'finish' });
    continueScale.value = withSpring(0.8, {}, () => {
      continueScale.value = withSpring(1);
    });
    if (typeof onOnboardingComplete === 'function') {
      onOnboardingComplete();
    }
  };

  const onPageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
    // Reset and trigger text animation on new page
    textOpacity.value = 0;
    textTranslateY.value = 50;
    textOpacity.value = withSpring(1);
    textTranslateY.value = withSpring(0);
  };

  const animatedContinueButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: continueScale.value }],
  }));

  const animatedSkipButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: skipScale.value }],
  }));

  // Animated style for text to fade in and slide up
  const animatedTextContainerStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedPagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {onboardingData.map((item) => (
          <View key={item.id} style={styles.page}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradientOverlay}
            />
            <Animated.View style={[styles.textContainer, animatedTextContainerStyle]}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </Animated.View>
          </View>
        ))}
      </AnimatedPagerView>

      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === currentPage ? COLORS.primary : COLORS.secondary },
              ]}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable onPress={onSkip}>
            <Animated.View style={animatedSkipButtonStyle}>
              <Text style={styles.skipText}>Skip</Text>
            </Animated.View>
          </Pressable>
          <Pressable onPress={onNext}>
            <Animated.View style={[styles.continueButton, animatedContinueButtonStyle]}>
              <Text style={styles.continueText}>
                {currentPage === onboardingData.length - 1 ? "Get Started" : "Continue"}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.headline,
    fontWeight: 'bold',
    color: COLORS.lightBg,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Inter_700Bold',
  },
  description: {
    fontSize: FONT_SIZES.body,
    color: COLORS.lightBg,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'NunitoSans_400Regular',
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.lightBg,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: 15,
  },
  skipText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.primary,
    fontFamily: 'NunitoSans_400Regular',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  continueText: {
    color: COLORS.lightBg,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
});

export default OnboardingScreen;