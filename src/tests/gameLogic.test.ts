import {
  applyMove,
  calculateWinner,
  createEmptyBoard,
  getAvailableMoves,
  getNextPlayer,
  getWinningLine,
  isDraw,
  resolveGameStatus,
} from '../features/lib/gameLogic';
import type { Board } from '../features/types/gameTypes';

function board(values: Board): Board {
  return values;
}

describe('gameLogic', () => {
  it('creates an empty 9-cell board', () => {
    expect(createEmptyBoard()).toEqual([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  it('returns the available move indexes', () => {
    expect(
      getAvailableMoves(
        board(['X', null, 'O', null, null, null, 'X', null, 'O']),
      ),
    ).toEqual([1, 3, 4, 5, 7]);
  });

  it('applies a valid move without mutating the original board', () => {
    const initialBoard = createEmptyBoard();
    const nextBoard = applyMove(initialBoard, 4, 'X');

    expect(nextBoard[4]).toBe('X');
    expect(initialBoard[4]).toBeNull();
  });

  it('rejects invalid moves', () => {
    expect(() => applyMove(createEmptyBoard(), 99, 'X')).toThrow(RangeError);
    expect(() =>
      applyMove(
        board(['X', null, null, null, null, null, null, null, null]),
        0,
        'O',
      ),
    ).toThrow('already occupied');
  });

  it.each([
    {
      label: 'row',
      input: board(['X', 'X', 'X', null, null, null, null, null, null]),
      line: [0, 1, 2],
    },
    {
      label: 'column',
      input: board(['O', null, null, 'O', null, null, 'O', null, null]),
      line: [0, 3, 6],
    },
    {
      label: 'diagonal',
      input: board(['X', null, null, null, 'X', null, null, null, 'X']),
      line: [0, 4, 8],
    },
  ] as const)('detects a $label winner', ({ input, line }) => {
    const [winnerIndex] = line;

    expect(calculateWinner(input)).toBe(input[winnerIndex]);
    expect(getWinningLine(input)).toEqual(line);
  });

  it('detects a draw board', () => {
    const drawBoard = board(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);

    expect(calculateWinner(drawBoard)).toBeNull();
    expect(isDraw(drawBoard)).toBe(true);
  });

  it('returns the next player', () => {
    expect(getNextPlayer('X')).toBe('O');
    expect(getNextPlayer('O')).toBe('X');
  });

  it('resolves game status for in-progress and finished games', () => {
    expect(resolveGameStatus(createEmptyBoard(), 'X', 'O')).toEqual({
      winner: null,
      winningLine: null,
      status: 'in_progress',
    });

    expect(
      resolveGameStatus(
        board(['O', 'O', 'O', null, 'X', null, 'X', null, null]),
        'X',
        'O',
      ),
    ).toEqual({
      winner: 'O',
      winningLine: [0, 1, 2],
      status: 'cpu_won',
    });
  });
});
