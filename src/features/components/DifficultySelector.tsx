import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { shadows, textStyles, theme } from '../../app/theme';
import type { Difficulty } from '../types/gameTypes';

const OPTIONS: ReadonlyArray<{
  value: Difficulty;
  label: string;
  detail: string;
}> = [
  {
    value: 'easy',
    label: 'Easy',
    detail: 'Random',
  },
  {
    value: 'hard',
    label: 'Hard',
    detail: 'Minimax',
  },
];

const CONTROL_PADDING = 4;
const CONTROL_GAP = 8;

type DifficultySelectorProps = {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

export function DifficultySelector({
  difficulty,
  onChange,
}: DifficultySelectorProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const offset = useSharedValue(0);

  const segmentWidth =
    containerWidth > 0
      ? (containerWidth - CONTROL_PADDING * 2 - CONTROL_GAP) / OPTIONS.length
      : 0;

  useEffect(() => {
    if (segmentWidth === 0) {
      return;
    }

    const selectedIndex = OPTIONS.findIndex(
      (option) => option.value === difficulty,
    );

    offset.value = withSpring(selectedIndex * (segmentWidth + CONTROL_GAP), {
      damping: 18,
      stiffness: 220,
    });
  }, [difficulty, offset, segmentWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      style={styles.container}
    >
      {segmentWidth > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activePill,
            shadows.glow,
            indicatorStyle,
            {
              width: segmentWidth,
            },
          ]}
        />
      ) : null}
      {OPTIONS.map((option) => {
        const selected = option.value === difficulty;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={styles.option}
          >
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {option.label}
            </Text>
            <Text style={[styles.detail, selected && styles.selectedDetail]}>
              {option.detail}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    gap: CONTROL_GAP,
    padding: CONTROL_PADDING,
    position: 'relative',
  },
  activePill: {
    backgroundColor: theme.colors.surfaceStrong,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.accentStrong,
    bottom: CONTROL_PADDING,
    left: CONTROL_PADDING,
    position: 'absolute',
    top: CONTROL_PADDING,
  },
  option: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    minHeight: 72,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    zIndex: 1,
  },
  label: {
    ...textStyles.cardTitle,
    color: theme.colors.textSecondary,
    fontSize: 18,
  },
  detail: {
    color: theme.colors.textTertiary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  selectedLabel: {
    color: theme.colors.textPrimary,
  },
  selectedDetail: {
    color: theme.colors.accent,
  },
});
