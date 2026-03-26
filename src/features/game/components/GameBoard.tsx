import { StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';

import { theme } from '../../../app/theme';
import { GameCell } from './GameCell';
import { WinningLineOverlay } from './WinningLineOverlay';
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
  const cellSize = (size - GRID_GAP * 2 - GRID_GAP) / 3;

  return (
    <Animated.View
      entering={FadeInDown.duration(360)}
      layout={LinearTransition.springify().damping(20).stiffness(180)}
      style={[
        styles.board,
        {
          width: size,
          height: size,
        },
      ]}
    >
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
      <WinningLineOverlay
        cellSize={cellSize}
        gap={GRID_GAP}
        winningLine={winningLine}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  board: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    padding: GRID_GAP / 2,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
