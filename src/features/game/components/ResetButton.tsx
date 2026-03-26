import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { textStyles, theme } from '../../../app/theme';

type ResetButtonProps = {
  label: string;
  onPress: () => void;
};

export function ResetButton({ label, onPress }: ResetButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isPressed ? 0.97 : 1, {
      damping: 16,
      stiffness: 240,
    });
  }, [isPressed, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={styles.pressable}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <View style={styles.buttonAccent} />
        <Text style={styles.kicker}>Round control</Text>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  button: {
    alignItems: 'flex-start',
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radii.lg,
    gap: theme.spacing.xxs,
    justifyContent: 'center',
    minHeight: 72,
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    width: '100%',
  },
  buttonAccent: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: theme.radii.pill,
    height: 90,
    position: 'absolute',
    right: -18,
    top: -28,
    width: 90,
  },
  kicker: {
    ...textStyles.sectionLabel,
    color: '#05301D',
  },
  label: {
    color: '#03150E',
    fontFamily: 'Avenir Next',
    fontSize: 18,
    fontWeight: '700',
  },
});
