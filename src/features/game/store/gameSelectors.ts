import { CPU_PLAYER, HUMAN_PLAYER } from '../lib/gameConfig';
import type { GameState } from './gameStore';

export const selectIsBoardDisabled = (state: GameState): boolean =>
  state.status !== 'in_progress' ||
  state.isCpuThinking ||
  state.currentPlayer !== HUMAN_PLAYER;

export const selectStatusHeadline = (state: GameState): string => {
  if (state.isCpuThinking) {
    return 'CPU turn';
  }

  switch (state.status) {
    case 'human_won':
      return 'You won';
    case 'cpu_won':
      return 'CPU won';
    case 'draw':
      return 'Draw';
    default:
      return state.currentPlayer === HUMAN_PLAYER ? 'Your turn' : 'CPU turn';
  }
};

export const selectStatusDetail = (state: GameState): string => {
  if (state.isCpuThinking) {
    return state.difficulty === 'hard'
      ? 'The CPU is evaluating the best available move.'
      : 'The CPU is choosing a random valid move.';
  }

  switch (state.status) {
    case 'human_won':
      return 'The highlighted line marks the winning three-in-a-row.';
    case 'cpu_won':
      return 'The highlighted line marks the CPU win.';
    case 'draw':
      return 'All squares are filled and neither side completed a line.';
    default:
      return `You are ${HUMAN_PLAYER}. The CPU is ${CPU_PLAYER}. Tap any open square to make a move.`;
  }
};

export const selectStatusTone = (
  state: GameState,
): 'neutral' | 'success' | 'danger' => {
  if (state.status === 'human_won') {
    return 'success';
  }

  if (state.status === 'cpu_won') {
    return 'danger';
  }

  return 'neutral';
};
