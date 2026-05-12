import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { theme } from '../theme/theme';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [keepLogged, setKeepLogged] = useState(false);

  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: { phone: string; email: string; firstName: string; lastName: string }) =>
      login(data.phone, data.email, data.firstName, data.lastName),
    onSuccess: (data) => {
      signIn(data.token, data.user);
    },
    onError: (error: any) => {
      Alert.alert('Login Failed', error.message || 'An error occurred');
    },
  });

  const handleLogin = () => {
    const p = phone.trim();
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();

    if (!p) {
      Alert.alert('Validation Error', 'Phone number is required.');
      return;
    }
    if (!fn) {
      Alert.alert('Validation Error', 'First name is required.');
      return;
    }
    if (!ln) {
      Alert.alert('Validation Error', 'Last name is required.');
      return;
    }
    if (!em) {
      Alert.alert('Validation Error', 'Email address is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    mutation.mutate({ phone: p, email: em, firstName: fn, lastName: ln });
  };

  const PhonePrefix = () => (
    <View style={styles.phonePrefixContainer}>
      <Text style={styles.flagText}>🇺🇸</Text>
      <Ionicons name="chevron-down" size={16} color={theme.colors.textSecondary} style={styles.chevronIcon} />
      <View style={styles.verticalDivider} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: Math.max(theme.spacing.xl, insets.bottom + theme.spacing.m) },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Phone Number *"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftComponent={<PhonePrefix />}
            />
            <Input
              label="First Name *"
              placeholder="Enter Your First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              label="Last Name *"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Input
              label="Email Address *"
              placeholder="Enter Your Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.biometricLoginBtn} activeOpacity={0.7}>
              <Ionicons name="finger-print-outline" size={18} color={theme.colors.primary} />
              <Text style={styles.biometricLoginText}>Use Biometric Login</Text>
            </TouchableOpacity>

            <Button
              title="Log In"
              onPress={handleLogin}
              loading={mutation.isPending}
              disabled={mutation.isPending}
              style={styles.loginButton}
            />

            <View style={styles.keepLoggedContainer}>
              <Text style={styles.keepLoggedText}>Keep me logged in</Text>
              <Switch
                value={keepLogged}
                onValueChange={setKeepLogged}
                trackColor={{ false: theme.colors.inputBorder, true: theme.colors.primary }}
                thumbColor={Platform.OS === 'android' ? theme.colors.background : undefined}
              />
            </View>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.m,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xxl,
  },
  logoImage: {
    width: 180,
    height: 72,
  },
  tagline: {
    marginTop: theme.spacing.xs,
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  formContainer: {
    width: '100%',
  },
  phonePrefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 18,
  },
  chevronIcon: {
    marginLeft: 4,
    marginRight: 8,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.inputBorder,
    marginRight: 8,
  },
  biometricLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.xs,
  },
  biometricLoginText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    marginLeft: 6,
  },
  loginButton: {
    marginBottom: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
  },
  keepLoggedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  keepLoggedText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: theme.spacing.l,
  },
  signupText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
