import { chooseCpuMove } from '../services/ai/cpuPlayer';
import { minimaxStrategy } from '../services/ai/strategies/minimaxStrategy';
import { createRandomStrategy } from '../services/ai/strategies/randomStrategy';
import type { Board } from '../features/types/gameTypes';

function board(values: Board): Board {
  return values;
}

describe('cpuPlayer', () => {
  it('random strategy returns a valid move from the available set', () => {
    const strategy = createRandomStrategy(() => 0.75);
    const move = strategy({
      board: board(['X', null, 'O', null, null, null, 'X', null, 'O']),
      cpuPlayer: 'O',
      humanPlayer: 'X',
    });

    expect([1, 3, 4, 5, 7]).toContain(move);
  });

  it('minimax chooses an immediate winning move', () => {
    const move = minimaxStrategy({
      board: board(['O', 'O', null, 'X', 'X', null, null, null, null]),
      cpuPlayer: 'O',
      humanPlayer: 'X',
    });

    expect(move).toBe(2);
  });

  it('minimax blocks an immediate human win', () => {
    const move = minimaxStrategy({
      board: board(['X', 'X', null, null, 'O', null, null, null, null]),
      cpuPlayer: 'O',
      humanPlayer: 'X',
    });

    expect(move).toBe(2);
  });

  it('cpu service delegates by difficulty', () => {
    const easyMove = chooseCpuMove({
      board: board(['X', null, null, null, 'O', null, null, null, null]),
      difficulty: 'easy',
      cpuPlayer: 'O',
      humanPlayer: 'X',
    });

    const hardMove = chooseCpuMove({
      board: board(['X', null, null, null, 'O', null, null, null, null]),
      difficulty: 'hard',
      cpuPlayer: 'O',
      humanPlayer: 'X',
    });

    expect([1, 2, 3, 5, 6, 7, 8]).toContain(easyMove);
    expect([1, 2, 3, 5, 6, 7, 8]).toContain(hardMove);
  });

  it('returns null when no moves remain', () => {
    const fullBoard = board(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);

    expect(
      chooseCpuMove({
        board: fullBoard,
        difficulty: 'easy',
        cpuPlayer: 'O',
        humanPlayer: 'X',
      }),
    ).toBeNull();
  });
});
