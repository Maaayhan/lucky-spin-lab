import type { RewardDefinition } from '../types/reward';

export const REWARD_TABLE: RewardDefinition[] = [
  {
    id: 'coins_5',
    label: '5 Coins',
    type: 'coins',
    value: 5,
    weight: 35,
    color: '#FF6B6B',
  },
  {
    id: 'coins_10',
    label: '10 Coins',
    type: 'coins',
    value: 10,
    weight: 25,
    color: '#FFD93D',
  },
  {
    id: 'coins_20',
    label: '20 Coins',
    type: 'coins',
    value: 20,
    weight: 18,
    color: '#6BCB77',
  },
  {
    id: 'coins_50',
    label: '50 Coins',
    type: 'coins',
    value: 50,
    weight: 10,
    color: '#4D96FF',
  },
  {
    id: 'bonus_spin',
    label: 'Bonus Spin',
    type: 'bonus_spin',
    value: 0,
    weight: 7,
    color: '#C77DFF',
  },
  {
    id: 'multiplier_x2',
    label: 'x2 Multi',
    type: 'multiplier',
    value: 2,
    weight: 5,
    color: '#FF9F1C',
  },
];

export const INITIAL_BALANCE = 100;
export const DEFAULT_BET = 10;
export const PLAYER_ID = 'demo-user';
