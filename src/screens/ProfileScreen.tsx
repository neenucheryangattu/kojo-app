import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
  Platform,
  StatusBar,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getProfile } from '../api/profileApi';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

export const ProfileScreen = () => {
  const [faceId, setFaceId] = useState(true);
  const [fingerprint, setFingerprint] = useState(false);

  const { user: authUser, signOut } = useAuth();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  React.useEffect(() => {
    if (profile) {
      setFaceId(profile.security.faceId);
      setFingerprint(profile.security.fingerprint);
    }
  }, [profile]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={['top', 'bottom']}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !profile) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={['top', 'bottom']}>
        <Text style={styles.errorText}>Failed to load profile.</Text>
      </SafeAreaView>
    );
  }

  const identity = authUser
    ? {
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        phone: authUser.phone,
        dob: authUser.dob,
      }
    : {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        dob: profile.dob,
      };

  const initial = identity.firstName?.trim()?.charAt(0) || '?';

  return (
    <SafeAreaView style={styles.outer} edges={['top']}>
      <View style={styles.headerStrip}>
        <View style={[styles.header, Platform.OS === 'android' ? { paddingTop: 4 } : null]}>
          <TouchableOpacity hitSlop={12}>
            <Ionicons name="chevron-back" size={theme.iconSizes.m} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity hitSlop={12}>
            <Ionicons name="chevron-forward" size={theme.iconSizes.m} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarBlock}>
          <View style={styles.avatarRing}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          </View>
          <Text style={styles.profileName}>
            {identity.firstName} {identity.lastName}
          </Text>
        </View>

        <Text style={styles.sectionHeading}>Contact Info</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View style={styles.iconBubble}>
              <Ionicons name="mail-outline" size={theme.iconSizes.s} color={theme.colors.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{identity.email}</Text>
            </View>
          </View>
          <View style={styles.rowDivider} />
          <View style={styles.infoRow}>
            <View style={styles.iconBubble}>
              <Ionicons name="call-outline" size={theme.iconSizes.s} color={theme.colors.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{identity.phone}</Text>
            </View>
          </View>
          <View style={styles.rowDivider} />
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <View style={styles.iconBubble}>
              <Ionicons name="calendar-outline" size={theme.iconSizes.s} color={theme.colors.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>{identity.dob}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Security</Text>
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextContainer}>
              <View style={styles.toggleHeader}>
                <View style={styles.iconBubble}>
                  <Ionicons name="scan-outline" size={theme.iconSizes.s} color={theme.colors.primary} />
                </View>
                <Text style={styles.toggleLabel}>Face ID</Text>
              </View>
              <Text style={styles.toggleDescription}>Use Face ID to unlock the app.</Text>
            </View>
            <Switch
              value={faceId}
              onValueChange={setFaceId}
              trackColor={{ false: theme.colors.inputBorder, true: theme.colors.primary }}
              thumbColor={theme.colors.background}
            />
          </View>
          <View style={styles.rowDivider} />
          <View style={[styles.toggleRow, { marginBottom: 0 }]}>
            <View style={styles.toggleTextContainer}>
              <View style={styles.toggleHeader}>
                <View style={styles.iconBubble}>
                  <Ionicons name="finger-print-outline" size={theme.iconSizes.s} color={theme.colors.primary} />
                </View>
                <Text style={styles.toggleLabel}>Fingerprint</Text>
              </View>
              <Text style={styles.toggleDescription}>Use fingerprint to unlock the app.</Text>
            </View>
            <Switch
              value={fingerprint}
              onValueChange={setFingerprint}
              trackColor={{ false: theme.colors.inputBorder, true: theme.colors.primary }}
              thumbColor={theme.colors.background}
            />
          </View>
        </View>

        <Text style={styles.sectionHeading}>Appearance</Text>
        <View style={[styles.card, styles.appearanceCard]}>
          <View style={styles.appearanceRow}>
            <View style={styles.toggleHeader}>
              <View style={styles.iconBubble}>
                <Ionicons name="moon-outline" size={theme.iconSizes.s} color={theme.colors.primary} />
              </View>
              <Text style={styles.toggleLabel}>App theme</Text>
            </View>
            <Text style={styles.appearanceHint}>System default</Text>
          </View>
        </View>

        <Button
          title="Logout"
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={signOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: theme.colors.headerTint,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerStrip: {
    backgroundColor: theme.colors.headerTint,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: theme.fontSizes.l,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  scrollContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl + 32,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    paddingTop: theme.spacing.l,
    marginTop: -6,
    flexGrow: 1,
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.m,
  },
  avatarRing: {
    padding: 4,
    borderRadius: wp('16%'),
    backgroundColor: theme.colors.primarySoft,
    marginBottom: theme.spacing.m,
  },
  avatarCircle: {
    width: wp('26%'),
    height: wp('26%'),
    borderRadius: wp('13%'),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.background,
  },
  avatarInitial: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: '700',
    color: theme.colors.textLight,
  },
  profileName: {
    fontSize: theme.fontSizes.xl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionHeading: {
    fontSize: theme.fontSizes.xs,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.xs,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.l,
    ...theme.shadows.card,
    shadowOpacity: 0.05,
  },
  appearanceCard: {
    paddingVertical: theme.spacing.m,
  },
  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.inputBorder,
    marginVertical: theme.spacing.s,
    marginLeft: wp('12%'),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
    flexWrap: 'wrap',
  },
  iconBubble: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('2.5%'),
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  infoText: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: theme.fontSizes.s,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.s,
    marginBottom: theme.spacing.xs,
  },
  toggleTextContainer: {
    flex: 1,
    paddingRight: theme.spacing.m,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: theme.fontSizes.s,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  toggleDescription: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 6,
    marginLeft: wp('11%'),
    lineHeight: 17,
  },
  appearanceHint: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xxl,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSizes.m,
  },
});
