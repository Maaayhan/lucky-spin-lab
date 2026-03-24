import type { SpinResponse } from '@lucky-spin-lab/shared';
import { REWARD_TABLE } from '@lucky-spin-lab/shared';

export function updateStatsPanel(history: SpinResponse[], initialBalance: number, currentBalance: number): void {
  const el = document.getElementById('stats-panel');
  if (!el) return;

  const totalSpins = history.length;

  if (totalSpins === 0) {
    el.innerHTML = `<div class="history-empty">No spins yet</div>`;
    return;
  }

  const netChange = currentBalance - initialBalance;
  const netSign = netChange >= 0 ? '+' : '';
  const netColor = netChange >= 0 ? 'var(--success)' : 'var(--error)';

  // Count per reward
  const counts: Record<string, number> = {};
  for (const spin of history) {
    counts[spin.rewardId] = (counts[spin.rewardId] ?? 0) + 1;
  }

  const rows = REWARD_TABLE.map((r) => {
    const count = counts[r.id] ?? 0;
    const pct = totalSpins > 0 ? ((count / totalSpins) * 100).toFixed(0) : '0';
    const barWidth = totalSpins > 0 ? (count / totalSpins) * 100 : 0;
    return `
      <div class="stat-row">
        <div class="reward-color-dot" style="background:${r.color}"></div>
        <span class="stat-row__label">${r.label}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar" style="width:${barWidth}%;background:${r.color}"></div>
        </div>
        <span class="stat-row__count">${count}×</span>
        <span class="stat-row__pct">${pct}%</span>
      </div>
    `;
  }).join('');

  el.innerHTML = `
    <div class="stat-summary">
      <span>${totalSpins} spins</span>
      <span style="color:${netColor};font-weight:700">${netSign}${netChange} coins net</span>
    </div>
    ${rows}
  `;
}
