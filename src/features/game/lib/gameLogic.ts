import { WINNING_LINES } from './winningLines';
import type {
  Board,
  GameStatus,
  Player,
  WinningLine,
} from '../types/gameTypes';

export function createEmptyBoard(): Board {
  return [null, null, null, null, null, null, null, null, null];
}

export function getAvailableMoves(board: Board): number[] {
  return board.flatMap((cell, index) => (cell === null ? [index] : []));
}

export function applyMove(board: Board, index: number, player: Player): Board {
  if (!Number.isInteger(index) || index < 0 || index > 8) {
    throw new RangeError(
      `Move index must be between 0 and 8. Received ${index}.`,
    );
  }

  if (board[index] !== null) {
    throw new Error(`Cell ${index} is already occupied.`);
  }

  const nextBoard = [...board] as Board;
  nextBoard[index] = player;
  return nextBoard;
}

export function getWinningLine(board: Board): WinningLine | null {
  for (const line of WINNING_LINES) {
    const [firstIndex, secondIndex, thirdIndex] = line;
    const firstCell = board[firstIndex];

    if (
      firstCell !== null &&
      firstCell === board[secondIndex] &&
      firstCell === board[thirdIndex]
    ) {
      return line;
    }
  }

  return null;
}

export function calculateWinner(board: Board): Player | null {
  const winningLine = getWinningLine(board);

  if (!winningLine) {
    return null;
  }

  return board[winningLine[0]]!;
}

export function isDraw(board: Board): boolean {
  return (
    calculateWinner(board) === null && getAvailableMoves(board).length === 0
  );
}

export function getNextPlayer(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

export function resolveGameStatus(
  board: Board,
  humanPlayer: Player,
  cpuPlayer: Player,
): {
  winner: Player | null;
  winningLine: WinningLine | null;
  status: GameStatus;
} {
  const winningLine = getWinningLine(board);
  const winner = winningLine ? board[winningLine[0]] : null;

  if (winner === humanPlayer) {
    return {
      winner,
      winningLine,
      status: 'human_won',
    };
  }

  if (winner === cpuPlayer) {
    return {
      winner,
      winningLine,
      status: 'cpu_won',
    };
  }

  if (isDraw(board)) {
    return {
      winner: null,
      winningLine: null,
      status: 'draw',
    };
  }

  return {
    winner: null,
    winningLine: null,
    status: 'in_progress',
  };
}
