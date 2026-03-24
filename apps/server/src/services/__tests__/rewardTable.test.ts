import { describe, it, expect } from 'vitest';
import { selectWeightedReward, getRewardById, simulateSpins } from '../rewardTable';
import { REWARD_TABLE } from '@lucky-spin-lab/shared';

describe('selectWeightedReward', () => {
  it('always returns a reward from the table', () => {
    for (let i = 0; i < 100; i++) {
      const reward = selectWeightedReward();
      expect(REWARD_TABLE.find((r) => r.id === reward.id)).toBeDefined();
    }
  });

  it('respects approximate probability distribution over many samples', () => {
    const N = 10_000;
    const counts: Record<string, number> = {};

    for (let i = 0; i < N; i++) {
      const r = selectWeightedReward();
      counts[r.id] = (counts[r.id] ?? 0) + 1;
    }

    const totalWeight = REWARD_TABLE.reduce((s, r) => s + r.weight, 0);

    for (const reward of REWARD_TABLE) {
      const expected = (reward.weight / totalWeight) * N;
      const actual = counts[reward.id] ?? 0;
      const tolerance = expected * 0.25; // 25% tolerance
      expect(Math.abs(actual - expected)).toBeLessThan(tolerance);
    }
  });
});

describe('getRewardById', () => {
  it('returns the correct reward for a known id', () => {
    const reward = getRewardById('coins_50');
    expect(reward).toBeDefined();
    expect(reward?.label).toBe('50 Coins');
    expect(reward?.value).toBe(50);
  });

  it('returns undefined for an unknown id', () => {
    expect(getRewardById('nonexistent')).toBeUndefined();
  });
});

describe('simulateSpins', () => {
  it('returns counts for all rewards when count is large enough', () => {
    const result = simulateSpins(1000);
    // All reward IDs should appear at least once with 1000 spins
    for (const reward of REWARD_TABLE) {
      expect(result[reward.id]).toBeGreaterThan(0);
    }
  });

  it('total count equals the requested spin count', () => {
    const N = 500;
    const result = simulateSpins(N);
    const total = Object.values(result).reduce((s, c) => s + c, 0);
    expect(total).toBe(N);
  });
});
