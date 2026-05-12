import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../theme/theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  leftComponent?: React.ReactNode;
}

export const Input = ({ label, error, leftComponent, style, ...props }: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {leftComponent && <View style={styles.leftComponent}>{leftComponent}</View>}
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.l,
    paddingHorizontal: theme.spacing.m,
    minHeight: 52,
  },
  leftComponent: {
    marginRight: theme.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    minHeight: 48,
    paddingVertical: 0,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },
});
