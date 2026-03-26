import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { theme } from '../../app/theme';
import type { Player } from '../types/gameTypes';

type GameMarkProps = {
  value: Player;
  size: number;
  highlighted: boolean;
};

export function GameMark({ value, size, highlighted }: GameMarkProps) {
  const pulse = useSharedValue(highlighted ? 1 : 0);
  const barThickness = Math.max(5, size * 0.065);
  const xBarLength = size * 0.42;
  const ringSize = size * 0.5;
  const glowSize = size * 0.72;

  useEffect(() => {
    pulse.value = highlighted
      ? withRepeat(
          withSequence(
            withTiming(1, {
              duration: 700,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0.45, {
              duration: 700,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          false,
        )
      : withTiming(0, { duration: 180 });
  }, [highlighted, pulse]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.92 + pulse.value * 0.12 }],
  }));

  return (
    <Animated.View entering={ZoomIn.duration(220)} style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          glowStyle,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
            backgroundColor:
              value === 'X' ? theme.colors.accentGlow : theme.colors.cpuSoft,
          },
        ]}
      />
      {value === 'X' ? (
        <View style={styles.xMark}>
          <View
            style={[
              styles.xBar,
              {
                width: xBarLength,
                height: barThickness,
                borderRadius: barThickness / 2,
                backgroundColor: theme.colors.textPrimary,
                transform: [{ rotate: '45deg' }],
              },
            ]}
          />
          <View
            style={[
              styles.xBar,
              {
                width: xBarLength,
                height: barThickness,
                borderRadius: barThickness / 2,
                backgroundColor: theme.colors.textPrimary,
                transform: [{ rotate: '-45deg' }],
              },
            ]}
          />
        </View>
      ) : (
        <View
          style={[
            styles.oMark,
            {
              width: ringSize,
              height: ringSize,
              borderRadius: ringSize / 2,
              borderWidth: barThickness,
              borderColor: theme.colors.cpu,
            },
          ]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
  },
  xMark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  xBar: {
    position: 'absolute',
  },
  oMark: {
    backgroundColor: 'transparent',
  },
});
