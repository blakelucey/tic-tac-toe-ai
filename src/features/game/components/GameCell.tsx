import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { shadows, theme } from '../../../app/theme';
import { GameMark } from './GameMark';
import type { CellValue } from '../types/gameTypes';

type GameCellProps = {
  value: CellValue;
  size: number;
  disabled: boolean;
  highlighted: boolean;
  onPress: () => void;
};

export function GameCell({
  value,
  size,
  disabled,
  highlighted,
  onPress,
}: GameCellProps) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);
  const glow = useSharedValue(highlighted ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(isPressed ? 0.96 : 1, {
      damping: 16,
      stiffness: 240,
    });
  }, [isPressed, scale]);

  useEffect(() => {
    glow.value = highlighted
      ? withRepeat(
          withSequence(
            withTiming(1, {
              duration: 650,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0.35, {
              duration: 650,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          false,
        )
      : withTiming(0, { duration: 180 });
  }, [glow, highlighted]);

  const animatedCellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 0.94 + glow.value * 0.08 }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.pressable,
        {
          width: size,
          height: size,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.cell,
          shadows.floating,
          animatedCellStyle,
          value !== null && styles.filledCell,
          highlighted && styles.highlightedCell,
          disabled && value === null && styles.disabledCell,
        ]}
      >
        <Animated.View
          pointerEvents="none"
          style={[styles.highlightGlow, glowStyle]}
        />
        {value ? (
          <GameMark highlighted={highlighted} size={size} value={value} />
        ) : (
          <View style={styles.emptyDot} />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: theme.radii.md,
  },
  cell: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  filledCell: {
    backgroundColor: theme.colors.surfaceRaised,
    borderColor: theme.colors.borderStrong,
  },
  highlightedCell: {
    borderColor: theme.colors.line,
    backgroundColor: theme.colors.accentSoft,
  },
  disabledCell: {
    opacity: 0.72,
  },
  highlightGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.accentGlow,
  },
  emptyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.borderStrong,
  },
});
