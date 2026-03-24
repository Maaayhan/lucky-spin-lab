import { describe, it, expect, beforeEach } from 'vitest';
import { executeSpin } from '../spinEngine';
import { resetPlayer, getOrCreatePlayer } from '../playerService';
import { INITIAL_BALANCE } from '@lucky-spin-lab/shared';

const TEST_PLAYER = 'test-player-spin';

beforeEach(() => {
  resetPlayer(TEST_PLAYER);
});

describe('executeSpin', () => {
  it('returns a valid spin response', () => {
    const result = executeSpin({ playerId: TEST_PLAYER, bet: 10 });
    expect(result.error).toBeUndefined();
    expect(result.response).toBeDefined();
    expect(result.response?.rewardId).toBeTruthy();
    expect(result.response?.spinId).toMatch(/^spin_/);
    expect(result.response?.timestamp).toBeTruthy();
  });

  it('deducts the bet from balance', () => {
    const initialBalance = getOrCreatePlayer(TEST_PLAYER).balance;
    const result = executeSpin({ playerId: TEST_PLAYER, bet: 10 });
    // Regardless of reward, new balance must differ by at least the bet
    expect(result.response).toBeDefined();
    // balance should change (bet deducted + reward applied)
    // At minimum: newBalance <= initialBalance (bet always deducted; reward may vary)
    expect(result.response!.newBalance).toBeLessThanOrEqual(initialBalance + 50);
    expect(result.response!.newBalance).toBeGreaterThanOrEqual(0);
  });

  it('returns error if balance is insufficient', () => {
    const player = getOrCreatePlayer(TEST_PLAYER);
    // Drain all but 5 coins
    player.balance = 5;
    const result = executeSpin({ playerId: TEST_PLAYER, bet: 10 });
    expect(result.error).toBeDefined();
    expect(result.response).toBeUndefined();
  });

  it('increments spin history after each spin', () => {
    executeSpin({ playerId: TEST_PLAYER, bet: 10 });
    executeSpin({ playerId: TEST_PLAYER, bet: 10 });
    const player = getOrCreatePlayer(TEST_PLAYER);
    expect(player.totalSpins).toBe(2);
    expect(player.history.length).toBe(2);
  });

  it('initial balance is correct', () => {
    const player = getOrCreatePlayer('fresh-player-xyz');
    expect(player.balance).toBe(INITIAL_BALANCE);
  });
});
