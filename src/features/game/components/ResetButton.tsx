import { Pressable, StyleSheet, Text } from 'react-native';

type ResetButtonProps = {
  label: string;
  onPress: () => void;
};

export function ResetButton({ label, onPress }: ResetButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#8C3E2A',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 22,
  },
  pressed: {
    opacity: 0.92,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
