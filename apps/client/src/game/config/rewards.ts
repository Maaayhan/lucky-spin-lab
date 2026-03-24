import { REWARD_TABLE } from '@lucky-spin-lab/shared';

// Re-export for use in PixiJS scene
export { REWARD_TABLE };

/**
 * Map a rewardId to its wheel segment index (0-based, matches REWARD_TABLE order).
 */
export function getSegmentIndex(rewardId: string): number {
  const index = REWARD_TABLE.findIndex((r) => r.id === rewardId);
  return index === -1 ? 0 : index;
}
