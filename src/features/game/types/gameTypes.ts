export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type Board = [
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
];

export type Difficulty = 'easy' | 'hard';

export type GameStatus = 'in_progress' | 'human_won' | 'cpu_won' | 'draw';

export type WinningLine = readonly [number, number, number];

export type SessionStats = {
  humanWins: number;
  cpuWins: number;
  draws: number;
  rounds: number;
};

export type CpuStrategy = (input: {
  board: Board;
  cpuPlayer: Player;
  humanPlayer: Player;
}) => number | null;
