import type { SpinRequest, SpinResponse, PlayerState } from '@lucky-spin-lab/shared';

const BASE_URL = '/api';

export async function postSpin(request: SpinRequest): Promise<SpinResponse> {
  const res = await fetch(`${BASE_URL}/spin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<SpinResponse>;
}

export async function fetchPlayer(playerId: string): Promise<PlayerState> {
  const res = await fetch(`${BASE_URL}/player/${playerId}`);
  if (!res.ok) throw new Error(`Failed to fetch player state`);
  return res.json() as Promise<PlayerState>;
}

export async function resetPlayer(playerId: string): Promise<PlayerState> {
  const res = await fetch(`${BASE_URL}/player/${playerId}/reset`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to reset player`);
  return res.json() as Promise<PlayerState>;
}
