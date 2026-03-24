import type { SpinResponse } from '@lucky-spin-lab/shared';

export interface InMemoryPlayer {
  playerId: string;
  balance: number;
  totalSpins: number;
  history: SpinResponse[];
}
