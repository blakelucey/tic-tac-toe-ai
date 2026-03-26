import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { shadows, textStyles, theme } from '../../../app/theme';
import type { Difficulty } from '../types/gameTypes';

type GameStatusBannerProps = {
  headline: string;
  detail: string;
  tone: 'neutral' | 'success' | 'danger';
  difficulty: Difficulty;
  isCpuThinking: boolean;
};

export function GameStatusBanner({
  headline,
  detail,
  tone,
  difficulty,
  isCpuThinking,
}: GameStatusBannerProps) {
  const pulse = useSharedValue(isCpuThinking ? 1 : 0.55);

  useEffect(() => {
    pulse.value = isCpuThinking
      ? withRepeat(
          withSequence(
            withTiming(1, { duration: 650 }),
            withTiming(0.35, { duration: 650 }),
          ),
          -1,
          false,
        )
      : withTiming(0.7, { duration: 180 });
  }, [isCpuThinking, pulse]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.86 + pulse.value * 0.18 }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(80).duration(360)}
      layout={LinearTransition.springify().damping(20).stiffness(180)}
      style={[
        styles.container,
        shadows.card,
        tone === 'success' && styles.success,
        tone === 'danger' && styles.danger,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.statusMeta}>
          <Animated.View
            style={[
              styles.dot,
              dotStyle,
              tone === 'danger' && styles.dotDanger,
              tone === 'success' && styles.dotSuccess,
            ]}
          />
          <Text style={styles.metaLabel}>
            {isCpuThinking ? 'Live system' : 'Round status'}
          </Text>
        </View>
        <View style={styles.modeChip}>
          <Text style={styles.modeChipText}>
            {difficulty === 'hard' ? 'Hard / Solver' : 'Easy / Quick Pick'}
          </Text>
        </View>
      </View>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    gap: theme.spacing.xs,
    maxWidth: 480,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    width: '100%',
  },
  success: {
    backgroundColor: theme.colors.successSoft,
    borderColor: theme.colors.accentStrong,
  },
  danger: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: theme.colors.danger,
  },
  topRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xxs,
    flexWrap: 'wrap',
  },
  statusMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: theme.colors.warning,
  },
  dotSuccess: {
    backgroundColor: theme.colors.accent,
  },
  dotDanger: {
    backgroundColor: theme.colors.danger,
  },
  metaLabel: {
    ...textStyles.sectionLabel,
    color: theme.colors.textSecondary,
  },
  modeChip: {
    backgroundColor: theme.colors.surfaceStrong,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  modeChipText: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headline: {
    ...textStyles.cardTitle,
  },
  detail: {
    ...textStyles.body,
  },
});
