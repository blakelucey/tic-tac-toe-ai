import { StyleSheet, View } from 'react-native';

import { GameCell } from './GameCell';
import type { Board, WinningLine } from '../types/gameTypes';

const GRID_GAP = 12;

type GameBoardProps = {
  board: Board;
  winningLine: WinningLine | null;
  disabled: boolean;
  size: number;
  onCellPress: (index: number) => void;
};

export function GameBoard({
  board,
  winningLine,
  disabled,
  size,
  onCellPress,
}: GameBoardProps) {
  const cellSize = (size - GRID_GAP * 2) / 3;

  return (
    <View style={[styles.board, { width: size }]}>
      {board.map((value, index) => (
        <GameCell
          key={index}
          disabled={disabled || value !== null}
          highlighted={winningLine?.includes(index) ?? false}
          onPress={() => onCellPress(index)}
          size={cellSize}
          value={value}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
});
