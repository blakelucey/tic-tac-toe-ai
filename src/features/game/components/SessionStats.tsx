import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { shadows, textStyles, theme } from '../../../app/theme';
import type { SessionStats as SessionStatsShape } from '../types/gameTypes';

type SessionStatsProps = {
  stats: SessionStatsShape;
  currentRound: number;
};

const STAT_ITEMS: ReadonlyArray<{
  key: keyof Pick<SessionStatsShape, 'humanWins' | 'cpuWins' | 'draws'>;
  label: string;
  accentColor: string;
  accentBackground: string;
}> = [
  {
    key: 'humanWins',
    label: 'You',
    accentColor: theme.colors.accent,
    accentBackground: theme.colors.accentSoft,
  },
  {
    key: 'cpuWins',
    label: 'CPU',
    accentColor: theme.colors.cpu,
    accentBackground: theme.colors.cpuSoft,
  },
  {
    key: 'draws',
    label: 'Draws',
    accentColor: theme.colors.warning,
    accentBackground: theme.colors.surfaceStrong,
  },
];

export function SessionStats({ stats, currentRound }: SessionStatsProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(40).duration(360)}
      style={[styles.container, shadows.card]}
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Session board</Text>
          <Text style={styles.title}>Track the current run</Text>
        </View>
        <View style={styles.roundBadge}>
          <Text style={styles.roundBadgeText}>Round {currentRound}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        {STAT_ITEMS.map((item) => (
          <View key={item.key} style={styles.statCard}>
            <View
              style={[
                styles.statAccent,
                {
                  backgroundColor: item.accentBackground,
                },
              ]}
            >
              <View
                style={[
                  styles.statAccentDot,
                  {
                    backgroundColor: item.accentColor,
                  },
                ]}
              />
            </View>
            <Text style={styles.statValue}>{stats[item.key]}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    ...textStyles.sectionLabel,
  },
  title: {
    ...textStyles.cardTitle,
    fontSize: 20,
  },
  roundBadge: {
    backgroundColor: theme.colors.surfaceStrong,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  roundBadgeText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statCard: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flex: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.sm,
  },
  statAccent: {
    alignItems: 'center',
    borderRadius: theme.radii.pill,
    flexDirection: 'row',
    height: 22,
    justifyContent: 'center',
    width: 22,
  },
  statAccentDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  statValue: {
    color: theme.colors.textPrimary,
    fontFamily: 'Avenir Next',
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
