import { Router } from 'express';
import { z } from 'zod';
import { executeSpin } from '../services/spinEngine';
import { getOrCreatePlayer, resetPlayer } from '../services/playerService';
import { getAllRewards, simulateSpins } from '../services/rewardTable';
import { REWARD_TABLE } from '@lucky-spin-lab/shared';

const router = Router();

const SpinRequestSchema = z.object({
  playerId: z.string().min(1).max(64),
  bet: z.number().int().min(1).max(1000),
});

// POST /api/spin
router.post('/spin', (req, res) => {
  const parsed = SpinRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid spin request', details: parsed.error.flatten() });
    return;
  }

  const output = executeSpin(parsed.data);

  if (output.error) {
    res.status(400).json({ error: output.error });
    return;
  }

  res.json(output.response);
});

// GET /api/player/:playerId
router.get('/player/:playerId', (req, res) => {
  const { playerId } = req.params;
  const player = getOrCreatePlayer(playerId);
  res.json(player);
});

// POST /api/player/:playerId/reset
router.post('/player/:playerId/reset', (req, res) => {
  const { playerId } = req.params;
  const player = resetPlayer(playerId);
  res.json(player);
});

// GET /api/rewards — return reward config (for debug panel)
router.get('/rewards', (_req, res) => {
  res.json(getAllRewards());
});

// GET /api/debug/simulate?count=1000 — simulate spins for distribution
router.get('/debug/simulate', (req, res) => {
  const count = Math.min(Number(req.query['count']) || 1000, 100_000);
  const distribution = simulateSpins(count);

  const result = REWARD_TABLE.map((r) => ({
    id: r.id,
    label: r.label,
    weight: r.weight,
    expectedPct: ((r.weight / REWARD_TABLE.reduce((s, x) => s + x.weight, 0)) * 100).toFixed(2),
    actualCount: distribution[r.id] ?? 0,
    actualPct: (((distribution[r.id] ?? 0) / count) * 100).toFixed(2),
  }));

  res.json({ totalSimulated: count, distribution: result });
});

export default router;
