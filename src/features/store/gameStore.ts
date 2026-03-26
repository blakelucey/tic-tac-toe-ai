import { create } from 'zustand';

import { chooseCpuMove } from '../../services/ai/cpuPlayer';
import {
  applyMove,
  createEmptyBoard,
  getNextPlayer,
  resolveGameStatus,
} from '../lib/gameLogic';
import { createSessionStats, recordCompletedRound } from '../lib/sessionStats';
import {
  CPU_PLAYER,
  DEFAULT_DIFFICULTY,
  HUMAN_PLAYER,
} from '../lib/gameConfig';
import type {
  Board,
  Difficulty,
  GameStatus,
  Player,
  SessionStats,
  WinningLine,
} from '../types/gameTypes';

type GameStateShape = {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningLine: WinningLine | null;
  status: GameStatus;
  difficulty: Difficulty;
  isCpuThinking: boolean;
  sessionStats: SessionStats;
};

export type GameState = GameStateShape & {
  resetGame: (difficulty?: Difficulty) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  makeHumanMove: (index: number) => boolean;
  beginCpuTurn: () => void;
  executeCpuMove: () => void;
};

function createGameState(
  difficulty: Difficulty,
  sessionStats: SessionStats = createSessionStats(),
): GameStateShape {
  return {
    board: createEmptyBoard(),
    currentPlayer: HUMAN_PLAYER,
    winner: null,
    winningLine: null,
    status: 'in_progress',
    difficulty,
    isCpuThinking: false,
    sessionStats,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  ...createGameState(DEFAULT_DIFFICULTY),
  resetGame: (difficulty) => {
    set(createGameState(difficulty ?? get().difficulty, get().sessionStats));
  },
  setDifficulty: (difficulty) => {
    set(createGameState(difficulty, get().sessionStats));
  },
  makeHumanMove: (index) => {
    const state = get();

    if (
      state.currentPlayer !== HUMAN_PLAYER ||
      state.status !== 'in_progress' ||
      state.isCpuThinking
    ) {
      return false;
    }

    try {
      const board = applyMove(state.board, index, HUMAN_PLAYER);
      const snapshot = resolveGameStatus(board, HUMAN_PLAYER, CPU_PLAYER);
      const sessionStats =
        snapshot.status === 'in_progress'
          ? state.sessionStats
          : recordCompletedRound(state.sessionStats, snapshot.status);

      set({
        board,
        currentPlayer:
          snapshot.status === 'in_progress'
            ? getNextPlayer(HUMAN_PLAYER)
            : HUMAN_PLAYER,
        winner: snapshot.winner,
        winningLine: snapshot.winningLine,
        status: snapshot.status,
        sessionStats,
      });

      return true;
    } catch {
      return false;
    }
  },
  beginCpuTurn: () => {
    const state = get();

    if (
      state.currentPlayer !== CPU_PLAYER ||
      state.status !== 'in_progress' ||
      state.isCpuThinking
    ) {
      return;
    }

    set({ isCpuThinking: true });
  },
  executeCpuMove: () => {
    const state = get();

    if (state.currentPlayer !== CPU_PLAYER || state.status !== 'in_progress') {
      return;
    }

    const move = chooseCpuMove({
      board: state.board,
      difficulty: state.difficulty,
      cpuPlayer: CPU_PLAYER,
      humanPlayer: HUMAN_PLAYER,
    });

    if (move === null) {
      const snapshot = resolveGameStatus(state.board, HUMAN_PLAYER, CPU_PLAYER);
      const sessionStats =
        snapshot.status === 'in_progress'
          ? state.sessionStats
          : recordCompletedRound(state.sessionStats, snapshot.status);

      set({
        winner: snapshot.winner,
        winningLine: snapshot.winningLine,
        status: snapshot.status,
        isCpuThinking: false,
        sessionStats,
      });

      return;
    }

    const board = applyMove(state.board, move, CPU_PLAYER);
    const snapshot = resolveGameStatus(board, HUMAN_PLAYER, CPU_PLAYER);
    const sessionStats =
      snapshot.status === 'in_progress'
        ? state.sessionStats
        : recordCompletedRound(state.sessionStats, snapshot.status);

    set({
      board,
      currentPlayer:
        snapshot.status === 'in_progress'
          ? getNextPlayer(CPU_PLAYER)
          : CPU_PLAYER,
      winner: snapshot.winner,
      winningLine: snapshot.winningLine,
      status: snapshot.status,
      isCpuThinking: false,
      sessionStats,
    });
  },
}));
