import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme/theme';

interface GaugeProps {
  score: number;
  status: string;
  updatedAt: string;
  pointsChange: string;
}

const statusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('good') || s.includes('excellent')) return theme.colors.success;
  if (s.includes('fair')) return theme.colors.warning;
  return theme.colors.error;
};

export const Gauge = ({ score, status, updatedAt, pointsChange }: GaugeProps) => {
  const size = wp('70%');
  const strokeWidth = wp('4.5%');
  const radius = (size - strokeWidth) / 2;
  const cy = size / 2;

  const d = `M ${strokeWidth / 2} ${cy} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${cy}`;

  const minScore = 300;
  const maxScore = 850;
  const percentage = Math.max(0, Math.min(1, (score - minScore) / (maxScore - minScore)));

  const accent = statusColor(status);

  return (
    <View style={styles.container}>
      <Svg width={size} height={cy + strokeWidth} viewBox={`0 0 ${size} ${cy + strokeWidth}`}>
        <Defs>
          <LinearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#F44336" />
            <Stop offset="50%" stopColor="#FFC107" />
            <Stop offset="100%" stopColor="#4CAF50" />
          </LinearGradient>
        </Defs>
        <Path d={d} fill="none" stroke="#E8E8ED" strokeWidth={strokeWidth} strokeLinecap="round" />
        <Path
          d={d}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${Math.PI * radius}`}
          strokeDashoffset={`${Math.PI * radius * (1 - percentage)}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={[styles.statusText, { color: accent }]}>{status}</Text>
        <Text style={[styles.pointsChange, { color: accent }]}>{pointsChange}</Text>
        <Text style={styles.updatedText}>update on {updatedAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.m,
    height: hp('21%'),
  },
  textContainer: {
    position: 'absolute',
    bottom: -6,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -1,
  },
  statusText: {
    fontSize: theme.fontSizes.s,
    fontWeight: '700',
    marginTop: -4,
  },
  pointsChange: {
    fontSize: theme.fontSizes.s,
    fontWeight: '600',
    marginTop: 2,
  },
  updatedText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
});
