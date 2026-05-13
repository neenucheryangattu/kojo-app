import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.waveBackdrop} />
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/onboarding.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>Your Credit Score</Text>
        <Text style={styles.subtitle}>
          We provide you with the tools to monitor, understand, and improve your credit score.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Continue"
          style={styles.nextButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="arrow-forward" size={theme.iconSizes.m} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  hero: {
    flex: 1,
    width: '100%',
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: hp('52.5%'),
    width: '100%',
    // backgroundColor: theme.colors.primarySoft,
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 140,
  },
  illustrationContainer: {
    width: '100%',
    maxWidth: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  illustrationImage: {
    width: '100%',
    maxWidth: wp('100%'),
    height: hp('72%'),
    aspectRatio: 501.3132629394531 / 577,
    alignSelf: 'center',
  },
  copy: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.m,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSizes.m,
    lineHeight: 24,
    color: theme.colors.textSecondary,
    maxWidth: wp('85%'),
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl + 8,
    alignItems: 'flex-end',
  },
  nextButton: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.card,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.25,
  },
});
