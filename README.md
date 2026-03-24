# Lucky Spin Lab

A browser-based mini game prototype built with **TypeScript**, **PixiJS**, and **Node.js** — simulating a free-to-play reward spin experience with a separate backend reward engine.

> **Portfolio project.** Not a real gambling product. No real money involved.

---

## What It Does

- **Spin a prize wheel** rendered via PixiJS with 6 reward segments
- **Backend-driven outcomes** — the server selects the reward using weighted probability; the client never decides results
- **Animated wheel** lands on the correct segment using easing-based animation
- **Balance tracking** and **reward history** update after each spin
- **Error handling** — failed requests recover gracefully without crashing the UI
- **Debug API** — simulate 1,000+ spins and inspect the outcome distribution

---

## Why This Project

Built specifically to demonstrate alignment with browser-based social game engineering:

| JD Requirement | This Project |
|---|---|
| TypeScript client-side development | Full TypeScript frontend with Vite |
| Browser graphics and animation | PixiJS wheel with easing-based spin animation |
| PixiJS familiarity | Wheel entity, scene, animation controller |
| Node.js / TypeScript backend | Express + TypeScript reward engine |
| Service-side math model | Weighted random selection, config-driven reward table |
| Full-stack ownership | End-to-end from API contract to deployment |
| Code quality and architecture | Modular structure, typed APIs, separation of concerns |
| Testing | Vitest unit tests for spin engine and reward table |

---

## Tech Stack

### Frontend
- **TypeScript** — strict typing throughout
- **Vite** — fast dev server and bundler
- **PixiJS v7** — canvas rendering, wheel drawing, animation via `requestAnimationFrame`
- **Zustand** — lightweight client state management
- Plain CSS — clean, game-like visual design

### Backend
- **Node.js + TypeScript**
- **Express** — API server
- **Zod** — request validation
- **express-rate-limit** — basic rate limiting
- In-memory player state (no database required for demo)

### Shared
- **`@lucky-spin-lab/shared`** — shared TypeScript types (`SpinRequest`, `SpinResponse`, `RewardDefinition`) and reward constants used across client and server

### Tooling
- npm workspaces monorepo
- Vitest for unit tests
- GitHub Actions CI

---

## Architecture

```
lucky-spin-lab/
  apps/
    client/          # Vite + TypeScript + PixiJS frontend
      src/
        game/
          scene/     # SpinScene — PixiJS Application setup
          entities/  # Wheel, Pointer — PixiJS display objects
          animation/ # spinController — rAF + easing
          config/    # Reward config + segment mapping
        state/       # Zustand game store
        api/         # Typed fetch wrapper for spin API
        ui/          # DOM UI helpers (balance, history, result banner)
    server/          # Node.js + Express backend
      src/
        routes/      # spin.ts — API route handlers (thin)
        services/    # spinEngine, rewardTable, playerService
        middleware/  # logger, errorHandler
        types/       # Server-local types
  packages/
    shared/          # Shared TypeScript types and reward constants
```

### Key Design Decisions

**Backend is the source of truth.**
The server selects the reward outcome; the client receives `rewardId` and maps it to a wheel segment. The client cannot influence the result.

**Config-driven reward table.**
All reward definitions (label, type, value, weight, color) live in `packages/shared/src/constants/rewards.ts`. Changing odds or adding rewards requires editing one file, not touching engine logic.

**Thin routes, fat services.**
Route handlers validate input with Zod and delegate to `spinEngine.ts`. Business logic is isolated and testable without HTTP context.

**Animation decoupled from state.**
`spinController.ts` handles `requestAnimationFrame` + easing independently. The scene calls `spinToSegment(index, onComplete)` — it doesn't know about rewards or API responses.

---

## Reward System

| Reward | Type | Value | Probability |
|---|---|---|---|
| 5 Coins | coins | +5 | 35% |
| 10 Coins | coins | +10 | 25% |
| 20 Coins | coins | +20 | 18% |
| 50 Coins | coins | +50 | 10% |
| Bonus Spin | bonus_spin | bet refunded | 7% |
| x2 Multiplier | multiplier | bet × 2 | 5% |

All weights sum to 100. The backend uses weighted random selection; the debug endpoint (`GET /api/debug/simulate?count=1000`) validates distribution empirically.

---

## Local Setup

### Prerequisites
- Node.js 20+
- npm 9+

### Install

```bash
npm install
```

### Run (dev mode — both server and client)

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Health check: http://localhost:3001/health

### Run tests

```bash
npm run test
```

### Build

```bash
npm run build
```

---

## API Reference

### `POST /api/spin`

Request:
```json
{ "playerId": "demo-user", "bet": 10 }
```

Response:
```json
{
  "rewardId": "coins_50",
  "rewardLabel": "50 Coins",
  "rewardType": "coins",
  "rewardValue": 50,
  "newBalance": 140,
  "spinId": "spin_000001",
  "timestamp": "2026-03-24T12:00:00.000Z"
}
```

### `GET /api/debug/simulate?count=1000`

Returns empirical outcome distribution over N simulated spins. Useful for validating the weighted random engine.

### `GET /api/rewards`

Returns the full reward configuration table.

### `POST /api/player/:playerId/reset`

Resets a player's balance and history to initial state.

---

## Deployment

### Frontend → Vercel

```bash
cd apps/client
vercel deploy
```

### Backend → Render / Railway

Set environment variables:
```
PORT=3001
CLIENT_ORIGIN=https://your-frontend.vercel.app
```

### Optional: AWS

- Frontend: S3 + CloudFront (static site hosting)
- Backend: ECS/Fargate or Lambda + API Gateway
- CI/CD: GitHub Actions (included)

---

## Testing

Unit tests cover the core backend logic:

- `rewardTable.test.ts` — weighted random selection, probability distribution, simulation
- `spinEngine.test.ts` — spin execution, balance deduction, insufficient balance error, history tracking

Run:
```bash
npm run test
```

---

## Future Improvements

- PostgreSQL persistence for cross-session spin history
- Statistics panel (total spins, reward distribution chart)
- Auto-spin mode
- Sound effects + particle system on win
- Mobile responsive layout
- Feature flags for reward table A/B testing
- Structured JSON logging (Pino)
- OpenTelemetry tracing

---

## Use of AI Tools

Claude Code was used as a development accelerator for:
- Scaffolding the monorepo structure and boilerplate
- Generating initial PixiJS scene and animation code
- Drafting API route and service structure
- Writing test skeletons

Architecture decisions, reward system design, module boundaries, business logic correctness, and code quality review were done manually. The project is designed to be explainable and defensible in an engineering interview — not just generated output.

---

## Resume Bullet

**Lucky Spin Lab | TypeScript, PixiJS, Node.js, Express, Zod, Vitest**
Built a browser-based mini game prototype inspired by free-to-play reward mechanics, using PixiJS for client-side canvas rendering and easing-based spin animation, and a TypeScript/Node.js backend for weighted reward outcome generation. Designed a config-driven reward engine with typed API contracts, Zod validation, unit tests, and a debug simulation endpoint. Structured as an npm workspace monorepo with CI via GitHub Actions.
