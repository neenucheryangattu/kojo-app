import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMessages } from '../api/messagesApi';
import { theme } from '../theme/theme';
import { Button } from '../components/Button';

export const MessagesScreen = () => {
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={['top', 'bottom']}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !messages) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={['top', 'bottom']}>
        <Text style={styles.errorText}>Failed to load messages.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.outer} edges={['top']}>
      <View style={styles.headerSection}>
        <View style={[styles.header, Platform.OS === 'android' ? { paddingTop: 4 } : null]}>
          <TouchableOpacity hitSlop={12} style={styles.notifBtn}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.textPrimary}  />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.notifBtn} hitSlop={12}>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listSection}>
        <ScrollView
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIconLeft} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Your messages"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <Text style={styles.dateLabel}>Today</Text>

          {messages.map((msg) => (
            <TouchableOpacity key={msg.id} style={styles.messageCard} activeOpacity={0.7}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLetter}>{msg.sender.charAt(0)}</Text>
              </View>
              <View style={styles.messageBody}>
                <View style={styles.messageTopRow}>
                  <Text style={[styles.senderName, msg.unread && styles.senderNameUnread]} numberOfLines={1}>
                    {msg.sender}
                  </Text>
                  <View style={styles.metaRight}>
                    <Text style={styles.time}>{msg.time}</Text>
                    {msg.unread ? <View style={styles.statusDot} /> : <View style={styles.statusDotPlaceholder} />}
                  </View>
                </View>
                <Text style={styles.snippet} numberOfLines={2}>
                  {msg.snippet}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <Button title="Start a new chat" style={styles.newChatButton} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: theme.colors.headerTint,
  },
  headerSection: {
    backgroundColor: theme.colors.headerTint,
    paddingHorizontal: 0,
    paddingBottom: theme.spacing.s,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  listSection: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.xl,
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.l,
    paddingHorizontal: theme.spacing.m,
    minHeight: 48,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
    shadowOpacity: 0.04,
  },
  searchIconLeft: {
    marginRight: theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.s,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.xxl + 24,
    backgroundColor: theme.colors.surface,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
    shadowOpacity: 0.05,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  avatarLetter: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  messageBody: {
    flex: 1,
    minWidth: 0,
  },
  messageTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },
  senderName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  senderNameUnread: {
    fontWeight: '700',
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: 8,
  },
  time: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.unreadDot,
  },
  statusDotPlaceholder: {
    width: 8,
    height: 8,
  },
  snippet: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  newChatButton: {
    marginTop: theme.spacing.l,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 16,
  },
});
