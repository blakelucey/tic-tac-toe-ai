import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Difficulty } from '../types/gameTypes';

const OPTIONS: ReadonlyArray<{
  value: Difficulty;
  label: string;
  detail: string;
}> = [
  {
    value: 'easy',
    label: 'Easy',
    detail: 'Random moves',
  },
  {
    value: 'hard',
    label: 'Hard',
    detail: 'Minimax',
  },
];

type DifficultySelectorProps = {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

export function DifficultySelector({
  difficulty,
  onChange,
}: DifficultySelectorProps) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const selected = option.value === difficulty;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[styles.option, selected && styles.selectedOption]}
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
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    backgroundColor: '#F8F5F0',
    borderColor: '#D9CDBE',
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectedOption: {
    backgroundColor: '#16324A',
    borderColor: '#16324A',
  },
  label: {
    color: '#112233',
    fontFamily: 'Avenir Next',
    fontSize: 18,
    fontWeight: '600',
  },
  detail: {
    color: '#58687A',
    fontSize: 13,
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
  selectedDetail: {
    color: '#D9E5EF',
  },
});
