import { Pressable, StyleSheet, Text } from 'react-native';

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
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.cell,
        {
          width: size,
          height: size,
        },
        highlighted && styles.highlightedCell,
        pressed && !disabled && styles.pressedCell,
        value !== null && styles.filledCell,
      ]}
    >
      <Text style={[styles.label, value === 'O' && styles.cpuLabel]}>
        {value ?? ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: '#F6F3EE',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D7CFC5',
    justifyContent: 'center',
  },
  filledCell: {
    borderColor: '#B3A89B',
  },
  highlightedCell: {
    backgroundColor: '#DFF3E7',
    borderColor: '#2E8B57',
  },
  pressedCell: {
    transform: [{ scale: 0.98 }],
  },
  label: {
    color: '#112233',
    fontFamily: 'Avenir Next',
    fontSize: 42,
    fontWeight: '700',
  },
  cpuLabel: {
    color: '#8C3E2A',
  },
});
