import {
  createSessionStats,
  recordCompletedRound,
} from '../features/game/lib/sessionStats';

describe('sessionStats', () => {
  it('creates an empty session tracker', () => {
    expect(createSessionStats()).toEqual({
      humanWins: 0,
      cpuWins: 0,
      draws: 0,
      rounds: 0,
    });
  });

  it('records a completed human round', () => {
    expect(recordCompletedRound(createSessionStats(), 'human_won')).toEqual({
      humanWins: 1,
      cpuWins: 0,
      draws: 0,
      rounds: 1,
    });
  });

  it('records a completed cpu round', () => {
    expect(recordCompletedRound(createSessionStats(), 'cpu_won')).toEqual({
      humanWins: 0,
      cpuWins: 1,
      draws: 0,
      rounds: 1,
    });
  });

  it('records a draw round', () => {
    expect(recordCompletedRound(createSessionStats(), 'draw')).toEqual({
      humanWins: 0,
      cpuWins: 0,
      draws: 1,
      rounds: 1,
    });
  });

  it('ignores in-progress states', () => {
    const initial = createSessionStats();

    expect(recordCompletedRound(initial, 'in_progress')).toBe(initial);
  });
});
