import {
  applyMove,
  calculateWinner,
  getAvailableMoves,
  isDraw,
} from '../../../features/game/lib/gameLogic';
import type {
  Board,
  CpuStrategy,
  Player,
} from '../../../features/game/types/gameTypes';

const MOVE_PRIORITY = [4, 0, 2, 6, 8, 1, 3, 5, 7];

function sortMoves(moves: number[]): number[] {
  return [...moves].sort(
    (left, right) => MOVE_PRIORITY.indexOf(left) - MOVE_PRIORITY.indexOf(right),
  );
}

function scoreBoard(
  board: Board,
  cpuPlayer: Player,
  humanPlayer: Player,
  depth: number,
): number | null {
  const winner = calculateWinner(board);

  if (winner === cpuPlayer) {
    return 10 - depth;
  }

  if (winner === humanPlayer) {
    return depth - 10;
  }

  if (isDraw(board)) {
    return 0;
  }

  return null;
}

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  cpuPlayer: Player,
  humanPlayer: Player,
): number {
  const terminalScore = scoreBoard(board, cpuPlayer, humanPlayer, depth);

  if (terminalScore !== null) {
    return terminalScore;
  }

  const moves = sortMoves(getAvailableMoves(board));

  if (isMaximizing) {
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const move of moves) {
      const nextBoard = applyMove(board, move, cpuPlayer);
      bestScore = Math.max(
        bestScore,
        minimax(nextBoard, depth + 1, false, cpuPlayer, humanPlayer),
      );
    }

    return bestScore;
  }

  let bestScore = Number.POSITIVE_INFINITY;

  for (const move of moves) {
    const nextBoard = applyMove(board, move, humanPlayer);
    bestScore = Math.min(
      bestScore,
      minimax(nextBoard, depth + 1, true, cpuPlayer, humanPlayer),
    );
  }

  return bestScore;
}

export const minimaxStrategy: CpuStrategy = ({
  board,
  cpuPlayer,
  humanPlayer,
}) => {
  const moves = sortMoves(getAvailableMoves(board));

  if (moves.length === 0) {
    return null;
  }

  let bestMove: number | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (const move of moves) {
    const nextBoard = applyMove(board, move, cpuPlayer);
    const score = minimax(nextBoard, 1, false, cpuPlayer, humanPlayer);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};
