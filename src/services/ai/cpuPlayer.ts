import { minimaxStrategy } from './strategies/minimaxStrategy';
import { randomStrategy } from './strategies/randomStrategy';
import type {
  Board,
  CpuStrategy,
  Difficulty,
  Player,
} from '../../features/game/types/gameTypes';

const STRATEGIES: Record<Difficulty, CpuStrategy> = {
  easy: randomStrategy,
  hard: minimaxStrategy,
};

export function chooseCpuMove(input: {
  board: Board;
  difficulty: Difficulty;
  cpuPlayer: Player;
  humanPlayer: Player;
}): number | null {
  const strategy = STRATEGIES[input.difficulty];
  return strategy(input);
}
