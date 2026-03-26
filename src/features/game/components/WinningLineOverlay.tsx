import { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { theme } from '../../../app/theme';
import type { WinningLine } from '../types/gameTypes';

type WinningLineOverlayProps = {
  winningLine: WinningLine | null;
  cellSize: number;
  gap: number;
};

export function WinningLineOverlay({
  winningLine,
  cellSize,
  gap,
}: WinningLineOverlayProps) {
  const progress = useSharedValue(winningLine ? 1 : 0);
  const inset = gap / 2;
  const lineThickness = 6;

  const metrics = useMemo(() => {
    if (!winningLine) {
      return null;
    }

    const centerForIndex = (index: number) => {
      const row = Math.floor(index / 3);
      const column = index % 3;

      return {
        x: inset + column * (cellSize + gap) + cellSize / 2,
        y: inset + row * (cellSize + gap) + cellSize / 2,
      };
    };

    const [startIndex, , endIndex] = winningLine;
    const start = centerForIndex(startIndex);
    const end = centerForIndex(endIndex);
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    const angle =
      (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;

    return {
      angle,
      length,
      left: (start.x + end.x) / 2 - length / 2,
      top: (start.y + end.y) / 2 - lineThickness / 2,
    };
  }, [cellSize, gap, inset, winningLine]);

  useEffect(() => {
    progress.value = withTiming(winningLine ? 1 : 0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress, winningLine]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { rotate: `${metrics?.angle ?? 0}deg` },
      { scaleX: progress.value },
    ],
  }));

  if (!metrics) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.line,
        animatedStyle,
        {
          left: metrics.left,
          top: metrics.top,
          width: metrics.length,
          height: lineThickness,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.line,
    shadowColor: theme.colors.accent,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
});
