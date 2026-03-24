import { REWARD_TABLE } from '@lucky-spin-lab/shared';
import type { RewardDefinition } from '@lucky-spin-lab/shared';

/**
 * Select a reward using weighted random selection.
 * The higher the weight, the more likely the reward is selected.
 */
export function selectWeightedReward(): RewardDefinition {
  const totalWeight = REWARD_TABLE.reduce((sum, r) => sum + r.weight, 0);
  let random = Math.random() * totalWeight;

  for (const reward of REWARD_TABLE) {
    random -= reward.weight;
    if (random <= 0) {
      return reward;
    }
  }

  // Fallback (should never reach here with valid weights)
  return REWARD_TABLE[0];
}

/**
 * Get reward by ID.
 */
export function getRewardById(id: string): RewardDefinition | undefined {
  return REWARD_TABLE.find((r) => r.id === id);
}

/**
 * Get all rewards.
 */
export function getAllRewards(): RewardDefinition[] {
  return REWARD_TABLE;
}

/**
 * Simulate N spins and return outcome distribution (for debug panel).
 */
export function simulateSpins(count: number): Record<string, number> {
  const counts: Record<string, number> = {};
  for (let i = 0; i < count; i++) {
    const reward = selectWeightedReward();
    counts[reward.id] = (counts[reward.id] ?? 0) + 1;
  }
  return counts;
}
