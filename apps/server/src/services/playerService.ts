import { INITIAL_BALANCE } from '@lucky-spin-lab/shared';
import type { SpinResponse } from '@lucky-spin-lab/shared';
import type { InMemoryPlayer } from '../types/spin';

const players = new Map<string, InMemoryPlayer>();

export function getOrCreatePlayer(playerId: string): InMemoryPlayer {
  if (!players.has(playerId)) {
    players.set(playerId, {
      playerId,
      balance: INITIAL_BALANCE,
      totalSpins: 0,
      history: [],
    });
  }
  return players.get(playerId)!;
}

export function recordSpin(playerId: string, result: SpinResponse): void {
  const player = getOrCreatePlayer(playerId);
  player.balance = result.newBalance;
  player.totalSpins += 1;
  player.history.unshift(result);
  // Keep only the last 20 spins in memory
  if (player.history.length > 20) {
    player.history.pop();
  }
}

export function resetPlayer(playerId: string): InMemoryPlayer {
  const fresh: InMemoryPlayer = {
    playerId,
    balance: INITIAL_BALANCE,
    totalSpins: 0,
    history: [],
  };
  players.set(playerId, fresh);
  return fresh;
}
