# PRD

## Project Name

**Lucky Spin Lab**

## Document Version

v1.0

## Owner

May Han

## Last Updated

2026-03-24

---

# 1. Product Overview

## 1.1 Product Summary

Lucky Spin Lab is a browser-based mini game prototype inspired by free-to-play social casino interaction loops. It is designed to demonstrate strong alignment with VGW’s Software Engineer role by combining:

* **client-side game development in TypeScript**
* **browser graphics and animation using PixiJS**
* **service-side result and reward logic using Node.js + TypeScript**
* **full-stack architecture, code quality, deployment, and ownership**

The product simulates a free-to-play reward spin experience. Users can spin a prize wheel, receive results from a backend reward engine, and view updates to balance, reward history, and visual effects in real time.

This project is a **portfolio-aligned engineering prototype**, not a gambling product. It does not involve real money, payments, or wagering.

---

## 1.2 Why This Product Exists

This project is being built specifically to align with the following job requirements from VGW:

* TypeScript client-side development
* browser graphics / animation experience
* PixiJS familiarity
* Node.js / TypeScript backend logic
* software design and architecture mindset
* cloud engineering awareness
* ownership across build, ship, and run
* familiarity with AI coding tools such as Claude Code

The purpose is to produce a compact but polished project that can be shown in interviews, discussed in architectural detail, and included in a resume or portfolio.

---

# 2. Product Goals

## 2.1 Primary Goals

The project must:

1. Demonstrate **client-side browser game engineering** using TypeScript and PixiJS
2. Demonstrate **browser animation and graphics rendering**
3. Demonstrate **service-side reward logic** in Node.js + TypeScript
4. Demonstrate **modular architecture and code quality**
5. Demonstrate **full-stack ownership** from implementation to deployment
6. Be small enough to complete quickly, but complete enough to look intentional and production-minded

---

## 2.2 Secondary Goals

The project should also:

1. Show awareness of **testing, logging, validation, and error handling**
2. Show awareness of **cloud deployment patterns**
3. Show responsible use of **AI coding tools**
4. Provide strong material for:

   * resume bullets
   * GitHub portfolio
   * interview storytelling
   * recruiter conversations

---

# 3. Problem Statement

A generic CRUD project would not strongly differentiate the candidate for this role, because the job explicitly values:

* client-side game development
* browser graphics and animation
* PixiJS / game-engine-adjacent skills
* service-side mathematical outcome logic

The problem is:
**How can a candidate with strong TypeScript full-stack experience quickly build a project that credibly signals readiness for a browser-based social games engineering environment?**

Lucky Spin Lab solves this by focusing on a **small but complete game interaction loop** with:

* visual rendering
* player feedback
* backend-driven outcomes
* clean engineering structure

---

# 4. Target Audience

## 4.1 Primary Audience

* VGW recruiters
* VGW hiring managers
* software engineers reviewing candidate projects
* technical interviewers

## 4.2 Secondary Audience

* recruiters for other frontend / full-stack / game-adjacent roles
* the candidate herself, as a reusable portfolio asset

---

# 5. Product Scope

## 5.1 In Scope

The project will include:

* browser-based spin game interaction
* PixiJS-rendered wheel and pointer
* backend API for generating reward outcomes
* balance updates
* reward history
* result display and animation
* modular code structure
* typed frontend/backend contract
* basic testing
* deployment-ready configuration
* polished README and architecture explanation

## 5.2 Out of Scope

The project will not include:

* real-money gaming
* user authentication
* payment systems
* multiplayer functionality
* advanced slot-machine economics
* production-grade security hardening
* enterprise-scale analytics
* full live ops tooling

---

# 6. User Persona

## Persona: Demo Player / Evaluator

A user opens the app and expects to:

* understand what the game is immediately
* click a spin button
* see a smooth and satisfying animation
* receive a result that feels responsive and game-like
* observe reward updates clearly

A reviewer expects to:

* see strong frontend game alignment
* see backend logic separation
* inspect code architecture
* understand trade-offs quickly
* believe the developer can own features end to end

---

# 7. User Stories

## 7.1 Core User Stories

1. As a user, I want to click a Spin button so that I can play the reward game.
2. As a user, I want to see the prize wheel animate smoothly so that the experience feels polished.
3. As a user, I want the game to tell me what reward I received so that the result feels clear.
4. As a user, I want my balance to update after each spin so that I can track progress.
5. As a user, I want to see recent reward history so that I can understand previous outcomes.

## 7.2 Reviewer-Focused Stories

1. As a hiring manager, I want to see browser graphics and animation so that I can assess game-client alignment.
2. As an engineer, I want to see the reward logic separated into backend services so that I can assess architecture quality.
3. As a reviewer, I want typed contracts and tests so that I can assess engineering discipline.
4. As a reviewer, I want a clean README and deployment setup so that I can assess ownership.

---

# 8. Core Gameplay Concept

## 8.1 Gameplay Loop

The user lands on the page with an initial balance and a visible reward wheel.

Flow:

1. User clicks **Spin**
2. Frontend sends request to backend
3. Backend selects reward based on weighted probability
4. Frontend receives reward payload
5. Wheel animates to the winning segment
6. UI shows reward result
7. Balance updates
8. Reward history is appended
9. User can spin again

---

## 8.2 Game Feel Requirements

The experience should feel:

* immediate
* responsive
* visually clear
* playful
* lightweight
* polished enough for portfolio review

---

# 9. Functional Requirements

## 9.1 Frontend Functional Requirements

### FR-1: Render Game Scene

The app must render a game scene containing:

* prize wheel
* pointer
* spin button
* balance display
* reward result area
* reward history area

### FR-2: Spin Interaction

When the user clicks Spin:

* the button must become disabled during the spin
* a request must be sent to the backend
* the frontend must receive the outcome
* the wheel must animate to the correct target segment
* the result must display after animation completion

### FR-3: Balance Display

The app must display the player balance and update it after each spin.

### FR-4: Reward History

The app must display a recent history list showing previous rewards.

### FR-5: Error Handling

If the spin request fails:

* the UI must not crash
* the user must see a readable error message
* the spin button must recover to usable state

### FR-6: Reset State

The app should support resetting the session state for demo purposes.

---

## 9.2 Backend Functional Requirements

### FR-7: Spin API

The backend must expose a spin endpoint:

**Endpoint**
`POST /api/spin`

**Purpose**
Return the reward outcome for a player spin.

### FR-8: Reward Engine

The backend must:

* use a config-driven reward table
* use weighted random selection
* return a deterministic response shape
* manage balance updates consistently

### FR-9: Input Validation

The backend must validate incoming requests and reject invalid payloads.

### FR-10: Logging

The backend must log requests and errors for debugging visibility.

---

## 9.3 Optional Advanced Functional Requirements

### FR-11: Debug / Simulation Panel

An optional panel may allow:

* viewing reward probability configuration
* simulating bulk spins
* viewing outcome distribution
* checking whether weighted probabilities behave as expected

### FR-12: Statistics Panel

An optional panel may show:

* total spins
* reward counts
* balance trend
* win distribution

These optional features are highly valuable because they signal understanding of service-side reward systems and engineering validation.

---

# 10. Non-Functional Requirements

## 10.1 Performance

* Initial load should be lightweight
* Spin interactions should feel responsive
* Animation should run smoothly on modern browsers
* Repeated spins should not degrade UX noticeably

## 10.2 Reliability

* Duplicate spin requests must be prevented while animation is active
* Frontend state must remain consistent after failed requests
* Backend must reject malformed requests gracefully

## 10.3 Maintainability

* TypeScript must be used across the stack
* logic must be separated by responsibility
* reward configuration should be editable without changing core engine logic
* API types should be shared where possible

## 10.4 Security

* no trust should be placed in client-submitted reward values
* input validation is required
* environment variables should be used for config
* basic rate-limiting may be added for demo hardening

## 10.5 Observability

* backend request logging is required
* backend error logging is required
* frontend should have basic error display and recovery
* latency timing logs are preferred

---

# 11. Product Design Requirements

## 11.1 Visual Style

The product should feel:

* clean
* bright
* game-like
* modern
* slightly playful
* portfolio-ready rather than overly flashy

## 11.2 Visual Elements

The main visual elements are:

* prize wheel with segmented rewards
* top pointer
* spin button
* reward banner or modal
* balance counter
* history panel

## 11.3 Animation Requirements

At minimum:

* wheel rotation animation
* easing-based stop animation
* reward reveal effect

Optional:

* pulse glow
* bounce effect
* particles / sparkles
* sound effects

---

# 12. Reward System Design

## 12.1 Reward Types

The MVP reward table should contain 6 reward outcomes:

1. 5 Coins
2. 10 Coins
3. 20 Coins
4. 50 Coins
5. Bonus Spin
6. Multiplier x2

## 12.2 Suggested Probability Distribution

Initial weighted probabilities:

* 5 Coins: 35%
* 10 Coins: 25%
* 20 Coins: 18%
* 50 Coins: 10%
* Bonus Spin: 7%
* Multiplier x2: 5%

These numbers are for demo purposes only and may be adjusted during tuning.

## 12.3 Reward Engine Rules

* each reward has a unique id
* each reward has a label
* each reward has a weight
* each reward maps to a frontend wheel segment
* backend is the source of truth for selected outcome

---

# 13. Technical Architecture

## 13.1 High-Level Architecture

The product will follow a simple full-stack architecture:

### Frontend

* browser app
* renders the wheel and UI
* handles player interactions
* calls spin API
* animates result

### Backend

* exposes spin API
* validates input
* computes reward outcome
* updates balance
* returns typed response

### Shared Layer

* reward types
* API interfaces
* constants

---

## 13.2 Frontend Tech Stack

* TypeScript
* Vite
* PixiJS
* optional React shell for layout
* optional Zustand for local state
* CSS or Tailwind for surrounding UI

## 13.3 Backend Tech Stack

* Node.js
* TypeScript
* Express or Fastify
* Zod for validation

## 13.4 Optional Persistence

For MVP, in-memory data is acceptable.

Optional upgrade:

* PostgreSQL
* Prisma or TypeORM

This is useful if the project later needs persistent spin history.

---

# 14. API Design

## 14.1 Spin Request

**Endpoint:**
`POST /api/spin`

**Request Body**

```json
{
  "playerId": "demo-user",
  "bet": 10
}
```

## 14.2 Spin Response

```json
{
  "rewardId": "gold_50",
  "rewardLabel": "50 Coins",
  "rewardType": "coins",
  "rewardValue": 50,
  "newBalance": 140,
  "spinId": "spin_001",
  "timestamp": "2026-03-24T12:00:00Z"
}
```

## 14.3 Error Response

```json
{
  "error": "Invalid spin request"
}
```

---

# 15. Module Breakdown

## 15.1 Frontend Modules

Suggested structure:

* `game/scene/SpinScene.ts`
* `game/entities/Wheel.ts`
* `game/entities/Pointer.ts`
* `game/animation/spinController.ts`
* `game/config/rewards.ts`
* `game/state/gameStore.ts`
* `api/spinApi.ts`
* `components/BalanceBar.tsx`
* `components/HistoryPanel.tsx`
* `components/ResultBanner.tsx`

## 15.2 Backend Modules

Suggested structure:

* `routes/spin.ts`
* `services/spinEngine.ts`
* `services/rewardTable.ts`
* `services/playerService.ts`
* `middleware/logger.ts`
* `middleware/errorHandler.ts`
* `types/spin.ts`

## 15.3 Shared Modules

Suggested structure:

* `types/reward.ts`
* `types/api.ts`
* `constants/rewards.ts`

---

# 16. Success Criteria

The project will be considered successful if:

1. A reviewer can open the app and understand it within 10 seconds
2. The spin flow works end to end
3. The animation visibly lands on the correct reward
4. The backend reward logic is clearly separated from frontend rendering
5. The codebase looks structured and intentional
6. The README explains architecture and decisions clearly
7. The project can be discussed confidently in an interview
8. The project clearly signals fit for TypeScript + PixiJS + browser game work

---

# 17. MVP Definition

## MVP Must Include

* TypeScript frontend
* PixiJS-rendered wheel
* Node.js + TypeScript backend spin API
* weighted reward engine
* balance updates
* reward history
* loading / disabled state during spin
* error handling
* README
* deployed demo

## MVP Should Include

* shared types
* unit tests for reward engine
* simple request logging
* polished visuals

## MVP Nice-to-Have

* stats panel
* simulation panel
* PostgreSQL persistence
* GitHub Actions
* AWS deployment variant

---

# 18. Delivery Plan

## Phase 1 — Foundation

* set up repo structure
* scaffold frontend and backend
* define shared types
* define reward table
* implement initial spin API

## Phase 2 — Core Gameplay

* build PixiJS wheel
* build pointer
* connect spin button
* animate wheel to backend-selected result
* update balance and history

## Phase 3 — Quality

* add error handling
* add tests
* add logs
* polish UI and animation

## Phase 4 — Ship

* deploy frontend and backend
* write README
* capture screenshots / demo video
* prepare resume bullet and interview explanation

---

# 19. Risks and Mitigations

## Risk 1: Overbuilding

The project could become too ambitious if it tries to simulate a full casino game.

**Mitigation:**
Keep scope focused on one polished interaction loop.

## Risk 2: Weak visual polish

If the project works but looks too plain, it may fail to signal game alignment.

**Mitigation:**
Prioritise animation and feedback early.

## Risk 3: Backend overengineering

A database-heavy backend may slow down delivery.

**Mitigation:**
Start with in-memory state and only add persistence if time permits.

## Risk 4: Claude Code generating messy structure

AI-generated code may create weak module boundaries.

**Mitigation:**
Define architecture first and use Claude Code only for scoped implementation tasks.

---

# 20. Use of Claude Code

Claude Code will be used as a development accelerator for:

* scaffolding project structure
* generating boilerplate
* drafting PixiJS scene code
* drafting API routes
* generating test skeletons
* helping refactor repetitive code

The developer remains responsible for:

* product scope
* system design
* architecture review
* business logic correctness
* final validation
* code quality decisions

This is important because the project should demonstrate not only tool usage, but engineering judgment.

---

# 21. Resume Positioning

This project should ultimately support a resume description such as:

**Lucky Spin Lab | TypeScript, PixiJS, Node.js, Express**
Built a browser-based mini game prototype inspired by free-to-play reward mechanics, using PixiJS for client-side rendering and animation and a TypeScript/Node.js backend for reward logic and result generation. Designed a modular full-stack architecture with typed APIs, validation, testing, and deployment-ready structure to demonstrate production-minded browser game engineering.

---

# 22. Interview Positioning

This project should support the following interview narrative:

“I built Lucky Spin Lab specifically to strengthen my fit for browser-based game engineering roles. I wanted to demonstrate client-side TypeScript development, browser rendering and animation with PixiJS, and a separate Node.js reward engine for service-side outcome logic. I kept the project small in scope but complete in engineering flow, so it shows how I think about interaction quality, modular design, and end-to-end ownership.”

---

# 23. Final Product Statement

Lucky Spin Lab is a focused portfolio project intended to prove readiness for a TypeScript-heavy, browser-based game engineering environment. It balances visual interaction, backend outcome logic, and engineering structure in a compact build that is realistic to complete quickly and strong enough to discuss professionally.