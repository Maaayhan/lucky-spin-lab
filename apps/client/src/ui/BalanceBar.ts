export function renderBalanceBar(balance: number): string {
  return `
    <div class="balance-bar">
      <span class="balance-bar__coin">🪙</span>
      <div>
        <div class="balance-bar__label">Balance</div>
        <div class="balance-bar__amount" id="balance-amount">${balance}</div>
      </div>
    </div>
  `;
}

export function updateBalanceDisplay(newBalance: number): void {
  const el = document.getElementById('balance-amount');
  if (!el) return;
  el.textContent = String(newBalance);
  el.classList.add('animate');
  setTimeout(() => el.classList.remove('animate'), 400);
}
