import type { GameStatus, SessionStats } from '../types/gameTypes';

export function createSessionStats(): SessionStats {
  return {
    humanWins: 0,
    cpuWins: 0,
    draws: 0,
    rounds: 0,
  };
}

export function recordCompletedRound(
  stats: SessionStats,
  status: GameStatus,
): SessionStats {
  switch (status) {
    case 'human_won':
      return {
        ...stats,
        humanWins: stats.humanWins + 1,
        rounds: stats.rounds + 1,
      };
    case 'cpu_won':
      return {
        ...stats,
        cpuWins: stats.cpuWins + 1,
        rounds: stats.rounds + 1,
      };
    case 'draw':
      return {
        ...stats,
        draws: stats.draws + 1,
        rounds: stats.rounds + 1,
      };
    default:
      return stats;
  }
}
