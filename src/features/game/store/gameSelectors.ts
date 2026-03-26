import { CPU_PLAYER, HUMAN_PLAYER } from '../lib/gameConfig';
import type { GameState } from './gameStore';

export const selectIsBoardDisabled = (state: GameState): boolean =>
  state.status !== 'in_progress' ||
  state.isCpuThinking ||
  state.currentPlayer !== HUMAN_PLAYER;

export const selectStatusHeadline = (state: GameState): string => {
  if (state.isCpuThinking) {
    return 'CPU is thinking';
  }

  switch (state.status) {
    case 'human_won':
      return 'You win';
    case 'cpu_won':
      return 'CPU wins';
    case 'draw':
      return 'Draw game';
    default:
      return state.currentPlayer === HUMAN_PLAYER
        ? 'Your turn'
        : `${CPU_PLAYER} to move`;
  }
};

export const selectStatusDetail = (state: GameState): string => {
  if (state.isCpuThinking) {
    return `Hard mode is deterministic; easy mode picks a random valid square.`;
  }

  switch (state.status) {
    case 'human_won':
      return 'The highlighted line shows the winning sequence.';
    case 'cpu_won':
      return 'Reset to try again or lower the difficulty.';
    case 'draw':
      return 'Optimal play from both sides ends in a draw.';
    default:
      return `You are ${HUMAN_PLAYER}. The CPU plays ${CPU_PLAYER}.`;
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
