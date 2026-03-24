export interface SpinRequest {
  playerId: string;
  bet: number;
}

export interface SpinResponse {
  rewardId: string;
  rewardLabel: string;
  rewardType: string;
  rewardValue: number;
  newBalance: number;
  spinId: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
}

export interface PlayerState {
  playerId: string;
  balance: number;
  totalSpins: number;
  history: SpinResponse[];
}
