import { CPU_PLAYER, HUMAN_PLAYER } from '../lib/gameConfig';
import type { GameState } from './gameStore';

export const selectIsBoardDisabled = (state: GameState): boolean =>
  state.status !== 'in_progress' ||
  state.isCpuThinking ||
  state.currentPlayer !== HUMAN_PLAYER;

export const selectStatusHeadline = (state: GameState): string => {
  if (state.isCpuThinking) {
    return 'Live engine evaluating';
  }

  switch (state.status) {
    case 'human_won':
      return 'Round secured';
    case 'cpu_won':
      return 'CPU takes the board';
    case 'draw':
      return 'Board settled';
    default:
      return state.currentPlayer === HUMAN_PLAYER ? 'Your move' : 'CPU on deck';
  }
};

export const selectStatusDetail = (state: GameState): string => {
  if (state.isCpuThinking) {
    return state.difficulty === 'hard'
      ? 'Running the minimax solver for the strongest available line.'
      : 'Selecting a valid square from the live board.';
  }

  switch (state.status) {
    case 'human_won':
      return 'You closed the winning lane first. Queue the next round when ready.';
    case 'cpu_won':
      return 'The CPU found the clean finish. Reset or drop to easy for a lighter pace.';
    case 'draw':
      return 'No line was available for either side. Start another round to keep the session moving.';
    default:
      return `You are ${HUMAN_PLAYER}. The CPU plays ${CPU_PLAYER}. Tap any open cell to make the next call.`;
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
