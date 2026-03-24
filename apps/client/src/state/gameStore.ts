import { create } from 'zustand';
import type { SpinResponse } from '@lucky-spin-lab/shared';
import { INITIAL_BALANCE, PLAYER_ID, DEFAULT_BET } from '@lucky-spin-lab/shared';

export type SpinStatus = 'idle' | 'requesting' | 'animating';

export interface GameState {
  playerId: string;
  balance: number;
  bet: number;
  spinStatus: SpinStatus;
  lastResult: SpinResponse | null;
  history: SpinResponse[];
  error: string | null;

  // Actions
  setSpinStatus: (status: SpinStatus) => void;
  applyResult: (result: SpinResponse) => void;
  setError: (error: string | null) => void;
  reset: (newBalance?: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerId: PLAYER_ID,
  balance: INITIAL_BALANCE,
  bet: DEFAULT_BET,
  spinStatus: 'idle',
  lastResult: null,
  history: [],
  error: null,

  setSpinStatus: (status) => set({ spinStatus: status }),

  applyResult: (result) =>
    set((state) => ({
      balance: result.newBalance,
      lastResult: result,
      spinStatus: 'idle',
      error: null,
      history: [result, ...state.history].slice(0, 10),
    })),

  setError: (error) =>
    set({
      error,
      spinStatus: 'idle',
    }),

  reset: (newBalance = INITIAL_BALANCE) =>
    set({
      balance: newBalance,
      spinStatus: 'idle',
      lastResult: null,
      history: [],
      error: null,
    }),
}));
