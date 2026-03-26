import { getAvailableMoves } from '../../../features/game/lib/gameLogic';
import type { CpuStrategy } from '../../../features/game/types/gameTypes';

export function createRandomStrategy(random: () => number): CpuStrategy {
  return ({ board }) => {
    const availableMoves = getAvailableMoves(board);

    if (availableMoves.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(random() * availableMoves.length);
    return availableMoves[randomIndex] ?? null;
  };
}

export const randomStrategy = createRandomStrategy(Math.random);
