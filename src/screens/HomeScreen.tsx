import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDashboardData } from '../api/dashboardApi';
import { useAuth } from '../context/AuthContext';
import { Gauge } from '../components/Gauge';
import { theme } from '../theme/theme';

const screenWidth = Dimensions.get('window').width;

const ActionButton = ({
  icon,
  label,
  iconColor,
  bgColor,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  iconColor: string;
  bgColor: string;
}) => (
  <TouchableOpacity style={styles.actionButton} activeOpacity={0.75}>
    <View style={[styles.actionIconContainer, { backgroundColor: bgColor }]}>
      <Ionicons name={icon} size={theme.iconSizes.m} color={iconColor} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

export const HomeScreen = () => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={['top', 'bottom']}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={['top', 'bottom']}>
        <Text style={styles.errorText}>Failed to load dashboard data.</Text>
      </SafeAreaView>
    );
  }

  const historySlice = data.history.slice(0, 6);

  const chartData = {
    labels: historySlice.map((h) => h.month),
    datasets: [
      {
        data: historySlice.map((h) => h.score),
        color: (opacity = 1) => `rgba(52, 97, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartWidth = Math.min(screenWidth - theme.spacing.xl * 2, screenWidth - 48);

  return (
    <SafeAreaView style={styles.outer} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.headerStrip}>
          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              <Text style={styles.greeting}>Hi, {user?.firstName ?? 'Sarah'}</Text>
              <Text style={styles.subtitle}>Your credit is in excellent shape!</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn} hitSlop={12}>
              <Ionicons name="notifications-outline" size={theme.iconSizes.m} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gaugeBox}>
            <Gauge
              score={data.creditScore}
              status={data.status}
              updatedAt={data.updatedAt}
              pointsChange={data.pointsChange}
            />
          </View>

          <View style={styles.actionsBox}>
            <View style={styles.actionsContainer}>
              <ActionButton icon="cash-outline" label="Pay Money" iconColor="#3461FF" bgColor="#EBF0FF" />
              <ActionButton icon="document-text-outline" label="Loan Request" iconColor="#4CAF50" bgColor="#E8F5E9" />
              <ActionButton icon="chatbubbles-outline" label="Chat Support" iconColor="#FF9800" bgColor="#FFF3E0" />
              <ActionButton icon="pie-chart-outline" label="Finance Hub" iconColor="#9C27B0" bgColor="#F3E5F5" />
            </View>
          </View>

          <View style={styles.chartBox}>
            <Text style={styles.sectionTitle}>Credit Score History</Text>
            <LineChart
              data={chartData}
              width={chartWidth}
              height={200}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              fromZero={false}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: () => theme.colors.primary,
                labelColor: () => theme.colors.textSecondary,
                fillShadowGradientFrom: '#3461FF',
                fillShadowGradientToOpacity: 0.12,
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: theme.colors.primary,
                  fill: '#fff',
                },
                propsForBackgroundLines: {
                  strokeDasharray: '4',
                  stroke: theme.colors.inputBorder,
                  strokeWidth: 1,
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.floatingButton, { bottom: insets.bottom + 88 }]}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Add"
        >
          <Ionicons name="add" size={theme.iconSizes.xl} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: theme.colors.headerTint,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.l,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  headerStrip: {
    backgroundColor: theme.colors.headerTint,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextWrap: {
    flex: 1,
    paddingRight: theme.spacing.m,
  },
  notifBtn: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.l,
    paddingBottom: 120,
  },
  greeting: {
    fontSize: theme.fontSizes.greeting,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSizes.s,
    color: theme.colors.textSecondary,
    marginTop: 6,
    fontWeight: '500',
  },
  gaugeBox: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.l,
    ...theme.shadows.card,
  },
  actionsBox: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.l,
    paddingHorizontal: theme.spacing.s,
    marginBottom: theme.spacing.l,
    ...theme.shadows.card,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '23%',
    maxWidth: wp('22%'),
  },
  actionIconContainer: {
    width: wp('13.5%'),
    height: wp('13.5%'),
    borderRadius: wp('6.75%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
  },
  chartBox: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.card,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: theme.fontSizes.m,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.s,
  },
  chart: {
    marginLeft: -8,
    borderRadius: theme.borderRadius.l,
    alignSelf: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    width: wp('14.5%'),
    height: wp('14.5%'),
    borderRadius: wp('7.25%'),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.card,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.35,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSizes.m,
  },
});
