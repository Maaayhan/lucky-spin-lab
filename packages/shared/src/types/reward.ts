export type RewardType = 'coins' | 'bonus_spin' | 'multiplier';

export interface RewardDefinition {
  id: string;
  label: string;
  type: RewardType;
  value: number;
  weight: number;
  color: string;
}

export interface RewardTable {
  rewards: RewardDefinition[];
}
