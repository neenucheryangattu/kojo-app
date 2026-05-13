import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme/theme';

export const DiscoverScreen = () => {
  return (
    <SafeAreaView style={styles.outer} edges={['top']}>
      <View style={styles.headerStrip}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={12}>
            <Ionicons name="menu-outline" size={theme.iconSizes.m} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity hitSlop={12}>
            <Ionicons name="notifications-outline" size={theme.iconSizes.m} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: theme.colors.headerTint,
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
    paddingVertical: theme.spacing.s,
  },
  headerTitle: {
    fontSize: theme.fontSizes.l,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  body: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  placeholderCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.card,
    shadowOpacity: 0.05,
  },
  placeholderTitle: {
    fontSize: theme.fontSizes.s,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.m,
    textAlign: 'center',
  },
  placeholderCopy: {
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: theme.spacing.s,
    maxWidth: wp('70%'),
  },
});
