import { REWARD_TABLE } from '@lucky-spin-lab/shared';

export function renderRewardConfig(): string {
  const totalWeight = REWARD_TABLE.reduce((s, r) => s + r.weight, 0);

  const rows = REWARD_TABLE.map(
    (r) => `
    <div class="reward-row">
      <div class="reward-color-dot" style="background:${r.color}"></div>
      <span class="reward-row__label">${r.label}</span>
      <span class="reward-row__pct">${((r.weight / totalWeight) * 100).toFixed(0)}%</span>
    </div>
  `
  ).join('');

  return `
    <div class="panel-card">
      <div class="panel-card__title">Reward Odds</div>
      ${rows}
    </div>
  `;
}
