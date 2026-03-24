import { DEFAULT_BET } from '@lucky-spin-lab/shared';
import type { SpinResponse } from '@lucky-spin-lab/shared';
import { selectWeightedReward } from './rewardTable';
import { getOrCreatePlayer, recordSpin } from './playerService';

let spinCounter = 0;

function generateSpinId(): string {
  spinCounter += 1;
  return `spin_${String(spinCounter).padStart(6, '0')}`;
}

export interface SpinEngineInput {
  playerId: string;
  bet: number;
}

export interface SpinEngineResult {
  response: SpinResponse;
  error?: never;
}

export interface SpinEngineError {
  error: string;
  response?: never;
}

export type SpinEngineOutput = SpinEngineResult | SpinEngineError;

export function executeSpin(input: SpinEngineInput): SpinEngineOutput {
  const { playerId, bet } = input;
  const betAmount = bet ?? DEFAULT_BET;

  const player = getOrCreatePlayer(playerId);

  if (player.balance < betAmount) {
    return { error: 'Insufficient balance to spin.' };
  }

  const reward = selectWeightedReward();

  // Deduct bet first
  let newBalance = player.balance - betAmount;

  // Apply reward
  if (reward.type === 'coins') {
    newBalance += reward.value;
  } else if (reward.type === 'multiplier') {
    newBalance += betAmount * (reward.value - 1); // net gain = bet * (multiplier - 1)
  } else if (reward.type === 'bonus_spin') {
    // Bonus spin: refund the bet cost
    newBalance += betAmount;
  }

  const response: SpinResponse = {
    rewardId: reward.id,
    rewardLabel: reward.label,
    rewardType: reward.type,
    rewardValue: reward.value,
    newBalance,
    spinId: generateSpinId(),
    timestamp: new Date().toISOString(),
  };

  recordSpin(playerId, response);

  return { response };
}
