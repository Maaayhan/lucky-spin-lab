import './styles/main.css';
import { SpinScene } from './game/scene/SpinScene';
import { getSegmentIndex } from './game/config/rewards';
import { useGameStore } from './state/gameStore';
import { postSpin, resetPlayer } from './api/spinApi';
import { updateBalanceDisplay } from './ui/BalanceBar';
import { updateResultBanner, showError } from './ui/ResultBanner';
import { updateHistoryPanel } from './ui/HistoryPanel';
import { renderRewardConfig } from './ui/RewardConfig';
import { updateStatsPanel } from './ui/StatsPanel';
import { INITIAL_BALANCE, PLAYER_ID, DEFAULT_BET, REWARD_TABLE } from '@lucky-spin-lab/shared';

// ── Build HTML shell ─────────────────────────────────────────────────────────
const app = document.getElementById('app')!;
app.innerHTML = `
  <header class="header">
    <div class="header__logo">Lucky Spin <span>Lab</span></div>
    <div style="font-size:0.75rem; color:var(--text-secondary);">TypeScript · PixiJS · Node.js</div>
  </header>

  <div class="game-layout">
    <!-- Left: main game area -->
    <div class="main-area" style="flex:0 0 420px;">
      <div class="balance-bar" style="width:100%">
        <span class="balance-bar__coin">🪙</span>
        <div>
          <div class="balance-bar__label">Balance</div>
          <div class="balance-bar__amount" id="balance-amount">${INITIAL_BALANCE}</div>
        </div>
      </div>

      <div class="canvas-wrapper" id="canvas-wrapper">
        <canvas id="spin-canvas"></canvas>
      </div>

      <button class="spin-btn" id="spin-btn">Spin</button>

      <div id="result-banner" class="result-banner">
        <span class="result-banner__placeholder">Spin to win!</span>
      </div>

      <div id="error-msg" class="error-msg" style="display:none;"></div>

      <button class="reset-btn" id="reset-btn">↺ Reset Game</button>
    </div>

    <!-- Right: side panels -->
    <div class="side-panel">
      <div class="panel-card">
        <div class="panel-card__title">Recent Spins</div>
        <ul class="history-list" id="history-list">
          <li class="history-empty">No spins yet</li>
        </ul>
      </div>

      <div class="panel-card">
        <div class="panel-card__title">Session Stats</div>
        <div id="stats-panel"><div class="history-empty">No spins yet</div></div>
      </div>

      ${renderRewardConfig()}
    </div>
  </div>

  <footer class="footer">
    Lucky Spin Lab · Portfolio Project · Not real gambling · Built with TypeScript + PixiJS + Node.js
  </footer>
`;

// ── Init PixiJS Scene ─────────────────────────────────────────────────────────
const CANVAS_SIZE = 420;
const canvas = document.getElementById('spin-canvas') as HTMLCanvasElement;

const scene = new SpinScene(canvas, {
  width: CANVAS_SIZE,
  height: CANVAS_SIZE,
  onSpinComplete: () => {},
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const spinBtn = document.getElementById('spin-btn') as HTMLButtonElement;
const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
const canvasWrapper = document.getElementById('canvas-wrapper') as HTMLDivElement;

function setSpinning(active: boolean): void {
  spinBtn.disabled = active;
  spinBtn.innerHTML = active ? `<span class="spinner"></span> Spinning…` : 'Spin';
}

function triggerWinFlash(): void {
  canvasWrapper.classList.add('win-flash');
  canvasWrapper.addEventListener('animationend', () => {
    canvasWrapper.classList.remove('win-flash');
  }, { once: true });
}

function refreshUI(): void {
  const { history, balance } = useGameStore.getState();
  updateHistoryPanel(history);
  updateStatsPanel(history, INITIAL_BALANCE, balance);
}

// ── Spin Logic ────────────────────────────────────────────────────────────────
spinBtn.addEventListener('click', async () => {
  const store = useGameStore.getState();
  if (store.spinStatus !== 'idle') return;

  showError(null);
  updateResultBanner(null);
  setSpinning(true);
  useGameStore.getState().setSpinStatus('requesting');

  try {
    const result = await postSpin({ playerId: PLAYER_ID, bet: DEFAULT_BET });

    useGameStore.getState().setSpinStatus('animating');

    const segmentIndex = getSegmentIndex(result.rewardId);

    scene.spinToSegment(segmentIndex, () => {
      useGameStore.getState().applyResult(result);
      useGameStore.getState().setSpinStatus('idle');
      updateBalanceDisplay(result.newBalance);
      updateResultBanner(result);
      refreshUI();
      setSpinning(false);
      scene.playWinEffect();
      triggerWinFlash();
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Spin failed. Please try again.';
    useGameStore.getState().setError(message);
    showError(message);
    setSpinning(false);
  }
});

// ── Reset ─────────────────────────────────────────────────────────────────────
resetBtn.addEventListener('click', async () => {
  try {
    await resetPlayer(PLAYER_ID);
  } catch {
    // fall through — reset locally regardless
  }
  useGameStore.getState().reset(INITIAL_BALANCE);
  updateBalanceDisplay(INITIAL_BALANCE);
  updateResultBanner(null);
  showError(null);
  refreshUI();
});

// ── Keyboard shortcut: Space to spin ─────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !spinBtn.disabled) {
    e.preventDefault();
    spinBtn.click();
  }
});

console.log(
  `[Lucky Spin Lab] Loaded. ${REWARD_TABLE.length} reward segments. Press SPACE or click Spin.`
);
