import type { SpinResponse } from '@lucky-spin-lab/shared';

export function updateResultBanner(result: SpinResponse | null): void {
  const el = document.getElementById('result-banner');
  if (!el) return;

  if (!result) {
    el.className = 'result-banner';
    el.innerHTML = `<span class="result-banner__placeholder">Spin to win!</span>`;
    return;
  }

  el.className = 'result-banner win';
  el.innerHTML = `
    <div>
      <span class="result-banner__label">You won</span>
      <div class="result-banner__value">${result.rewardLabel}</div>
    </div>
  `;
}

export function showError(message: string | null): void {
  const el = document.getElementById('error-msg');
  if (!el) return;
  if (!message) {
    el.style.display = 'none';
    el.textContent = '';
    return;
  }
  el.style.display = 'block';
  el.textContent = message;
}
