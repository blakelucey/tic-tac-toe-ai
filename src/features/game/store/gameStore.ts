import { create } from 'zustand';

import { chooseCpuMove } from '../../../services/ai/cpuPlayer';
import {
  applyMove,
  createEmptyBoard,
  getNextPlayer,
  resolveGameStatus,
} from '../lib/gameLogic';
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
};

export type GameState = GameStateShape & {
  resetGame: (difficulty?: Difficulty) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  makeHumanMove: (index: number) => boolean;
  beginCpuTurn: () => void;
  executeCpuMove: () => void;
};

function createGameState(difficulty: Difficulty): GameStateShape {
  return {
    board: createEmptyBoard(),
    currentPlayer: HUMAN_PLAYER,
    winner: null,
    winningLine: null,
    status: 'in_progress',
    difficulty,
    isCpuThinking: false,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  ...createGameState(DEFAULT_DIFFICULTY),
  resetGame: (difficulty) => {
    set(createGameState(difficulty ?? get().difficulty));
  },
  setDifficulty: (difficulty) => {
    set(createGameState(difficulty));
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

      set({
        board,
        currentPlayer:
          snapshot.status === 'in_progress'
            ? getNextPlayer(HUMAN_PLAYER)
            : HUMAN_PLAYER,
        winner: snapshot.winner,
        winningLine: snapshot.winningLine,
        status: snapshot.status,
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

      set({
        winner: snapshot.winner,
        winningLine: snapshot.winningLine,
        status: snapshot.status,
        isCpuThinking: false,
      });

      return;
    }

    const board = applyMove(state.board, move, CPU_PLAYER);
    const snapshot = resolveGameStatus(board, HUMAN_PLAYER, CPU_PLAYER);

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
    });
  },
}));
