import type { SpinResponse } from '@lucky-spin-lab/shared';

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function updateHistoryPanel(history: SpinResponse[]): void {
  const el = document.getElementById('history-list');
  if (!el) return;

  if (history.length === 0) {
    el.innerHTML = `<li class="history-empty">No spins yet</li>`;
    return;
  }

  el.innerHTML = history
    .map(
      (item) => `
      <li class="history-item">
        <span class="history-item__label">${item.rewardLabel}</span>
        <span class="history-item__time">${formatTime(item.timestamp)}</span>
      </li>
    `
    )
    .join('');
}
