# 一、先说结论：你最该做什么项目

我建议你做：

## 项目名

**Lucky Spin Lab**
一个基于 **TypeScript + PixiJS + Node.js** 的浏览器小游戏项目，模拟“社交赌场风格”的转盘/抽奖核心体验，但不碰真钱赌博。

## 项目定位

它不是“赌博网站”，而是一个：

* **前端游戏客户端**：PixiJS 渲染、动画、状态管理、UI 反馈
* **后端概率/结果服务**：Node.js + TypeScript 提供 spin result / payout 逻辑
* **工程化展示项目**：日志、配置、测试、部署、CI/CD、基础 observability

## 为什么这个项目最适合你

因为它一口气对齐了这个 JD 的核心词：

* **client-side development using TypeScript**
* **graphics and animation in browser / PixiJS**
* **full stack**
* **math model backend in TypeScript / Node.js**
* **software design and code quality**
* **cloud / AWS**
* **AI coding tools such as Claude Code**

而且它还能让你在面试里自然讲出这些点：

“我为了贴近 VGW 这类游戏工作室的工程模式，做了一个 browser-based mini game，前端用 PixiJS 做 rendering 和 animation，后端用 TypeScript/Node.js 单独实现 spin math model，并把结果展示、状态同步、配置、测试和部署完整串起来。”

这句话会很有杀伤力。

---

# 二、为什么不建议你做别的

## 不建议 1：做普通 CRUD 全栈项目

因为你已经很多了。BeeQuant、Slugger 都是。
再做一个普通 dashboard，不能补这份 JD 最缺的那块：**browser graphics/game feel**。

## 不建议 2：做太复杂的 slot machine

真正 slot math 很深，RNG、reel strips、paylines、volatility、RTP 都会把你拖死。
你现在目标不是做出行业级数学模型，而是做出：

**“我懂客户端游戏开发 + 我能把一个小型 game loop 和 backend result pipeline 做完整”**

## 不建议 3：做 Three.js 3D

Three.js很酷，但你现在最快出效果的是 **PixiJS 2D**。
VGW JD 里直接点名 PixiJS，这就是信号。

---

# 三、项目核心方案

## 推荐项目

### **Lucky Spin Lab: A TypeScript + PixiJS Browser Game Prototype**

一个轻量浏览器小游戏，用户点击 Spin，看到转盘/奖励盘动画，系统通过后端生成结果并返回奖励，前端展示动画、分数、历史记录、粒子效果和状态反馈。

### 核心玩法

用户进入页面后：

* 初始有 coins / energy
* 点击 **Spin**
* 前端请求后端 `/api/spin`
* 后端根据概率表生成 reward
* 前端播放转盘动画
* 指针停在目标 reward
* 更新余额、历史记录、连击/bonus 状态
* 可加 daily reward / auto-spin / streak / bonus multiplier

这个结构非常适合展示：

* 客户端动画
* 前后端分工
* 数学模型服务
* 状态同步
* 工程质量

---

# 四、这个项目如何映射 VGW JD

## JD 对应关系

### 1. Client-side development using TypeScript

你会用：

* TypeScript
* PixiJS
* 游戏状态管理
* 动画控制
* UI component separation

### 2. Graphics and animation in browser

你会做：

* 转盘旋转动画
* easing
* pointer feedback
* particle / glow / win pulse effect
* sprite / canvas rendering

### 3. Some service-side math model development

你会做：

* reward probability table
* weighted random selection
* bonus multiplier
* expected return tuning
* 后端独立计算结果

### 4. Software design and application architecture mindset

你会展示：

* 前后端分层
* renderer / scene / UI / game logic 分离
* config-driven reward table
* typed API contract
* testable math engine

### 5. Cloud / AWS

你可以轻量接：

* 前端 Vercel / S3 + CloudFront
* 后端 Render / Railway / ECS-lite thinking
* 或 AWS Lambda + API Gateway 的设计说明
* README 里写 cloud deployment approach

### 6. CI/CD / O11y / CyberSec

你可以最小化实现：

* GitHub Actions
* request logging
* error boundary
* env config
* rate limit / input validation
* basic metrics

### 7. AI coding tools

你可以明确写：

* Used Claude Code for scaffolding PixiJS scene structure, animation iteration, and test generation, while manually reviewing architecture and business logic.

这反而是加分项。

---

# 五、PRD 文档

下面我直接给你一版可以开干的 PRD。

---

# PRD — Lucky Spin Lab

## 1. Product Overview

**Product Name:** Lucky Spin Lab
**Type:** Browser-based mini game prototype
**Goal:** Build a polished TypeScript + PixiJS game-like experience with a small backend math model service to demonstrate client-side game engineering, animation, code quality, and full-stack ownership.

## 2. Background

VGW’s role focuses on client-side development for casino-style social games, with some service-side math model work using TypeScript and Node.js. This project is designed as a compact portfolio piece aligned to that environment.

The project will simulate a free-to-play reward spin experience in the browser. It will not involve real money, real gambling, or payment flows.

## 3. Product Goals

### Primary Goals

* Demonstrate hands-on **TypeScript client-side engineering**
* Showcase **PixiJS-based graphics and animation**
* Build a simple **Node.js math/result service**
* Present clear **architecture, code quality, testing, and deployment**
* Create a project that can be explained in interviews within 2–3 minutes

### Secondary Goals

* Show familiarity with cloud deployment practices
* Show ability to use AI coding tools effectively
* Produce a visually appealing and interactive demo

## 4. Target Audience

* Recruiters reviewing a portfolio quickly
* Hiring managers for game/client/full-stack roles
* Engineers evaluating architecture and implementation quality
* The user themselves as a talking-point project for interviews

## 5. User Story

As a player, I want to click a spin button and immediately experience a responsive, animated reward game, so that I feel a polished game interaction and can track my rewards over time.

## 6. Core Experience

1. User lands on the game page
2. User sees available coin balance and a reward wheel
3. User clicks **Spin**
4. Client sends request to backend
5. Backend returns reward result
6. Wheel animates and lands on the correct segment
7. UI displays reward, updates balance, logs history
8. Optional streak / bonus / auto-spin features enhance replay feel

## 7. Functional Requirements

## 7.1 Frontend Requirements

### Game Canvas

* Render reward wheel using PixiJS
* Render pointer, spin button, result banner
* Show coin balance and spin cost
* Show recent reward history

### Spin Interaction

* Disable button while spinning
* Call backend spin API
* Animate wheel rotation toward returned result
* Play end-state feedback animation

### State Management

* Track:

  * balance
  * spin status
  * reward history
  * streak / bonus state
  * error state

### UI Feedback

* Win glow / pulse effect
* Toast or modal for reward result
* Error notification if API fails
* Reset game button

## 7.2 Backend Requirements

### Spin API

Endpoint:
`POST /api/spin`

Request:

```json
{
  "playerId": "demo-user",
  "bet": 10
}
```

Response:

```json
{
  "rewardId": "gold_50",
  "rewardLabel": "50 Coins",
  "rewardValue": 50,
  "newBalance": 140,
  "serverSeed": "demo-seed",
  "timestamp": "2026-03-24T12:00:00Z"
}
```

### Math Model

* Weighted probability table
* Deterministic config-driven reward definitions
* Simple reward balancing logic
* Optional bonus multiplier chance

### Persistence

MVP options:

* In-memory store first
* Optional PostgreSQL for:

  * player profile
  * spin history
  * reward stats

## 7.3 Admin / Debug Panel

Optional but very useful:

* Toggle probability table view
* Show current reward config
* Show recent API payloads
* Simulate 1000 spins and display distribution

这个功能非常加分，因为它体现你对“math model + engineering validation”的理解。

---

## 8. Non-Functional Requirements

### Performance

* Initial load fast
* Spin interaction responsive
* Animation smooth in modern desktop browsers

### Maintainability

* Strong TypeScript typing
* Clear module boundaries
* Config-driven rewards
* Reusable utility functions

### Reliability

* Graceful API failure handling
* No duplicate spin request while active
* Input validation on backend

### Security

* Validate request payloads
* No trust in client balance updates
* Basic rate limiting for demo
* Env-based config

### Observability

* Server request logs
* Error logging
* Frontend error boundary or fallback UI
* Basic timing logs for spin request duration

---

## 9. Technical Architecture

## 9.1 Frontend

* TypeScript
* Vite
* PixiJS
* optional Zustand for lightweight UI state
* CSS / Tailwind for shell UI outside canvas

### Suggested frontend modules

* `game/scene/SpinScene.ts`
* `game/entities/Wheel.ts`
* `game/entities/Pointer.ts`
* `game/animation/spinController.ts`
* `game/config/rewards.ts`
* `game/state/gameStore.ts`
* `api/spinApi.ts`
* `components/HistoryPanel.tsx`
* `components/BalanceBar.tsx`

## 9.2 Backend

* Node.js
* TypeScript
* Express or Fastify
* Zod for request validation
* optional PostgreSQL + Prisma/TypeORM

### Suggested backend modules

* `routes/spin.ts`
* `services/spinEngine.ts`
* `services/rewardTable.ts`
* `services/playerService.ts`
* `middleware/logger.ts`
* `middleware/errorHandler.ts`

## 9.3 Deployment

### MVP Deployment

* Frontend: Vercel
* Backend: Render / Railway

### Optional AWS alignment

* Frontend static build on S3 + CloudFront
* Backend on Lambda + API Gateway or ECS/Fargate conceptually

---

# 六、MVP 范围

## 必做 MVP

### Phase 1

* PixiJS reward wheel
* spin button
* backend weighted reward API
* frontend animation based on backend result
* balance update
* history list
* clean README
* deployed demo

## Phase 2

* PostgreSQL spin history
* statistics panel
* simulated RTP / outcome distribution chart
* GitHub Actions CI
* structured logging

## Phase 3

* sound effects
* particle system
* auto-spin
* mobile responsiveness
* feature flags
* AWS deploy version

---

# 七、你 7 天快速完成计划

## Day 1 — 定义与搭架子

目标：

* 定项目 scope
* 建 repo
* 前后端初始化
* Claude Code 帮你搭框架

输出：

* monorepo 或 frontend/backend 双目录
* README 初稿
* reward config 初稿
* basic app running

### Claude Code 任务

* scaffold Vite + TS + PixiJS frontend
* scaffold Node + TS backend
* set up lint, prettier, basic scripts
* create folder structure

---

## Day 2 — 先做 backend math model

目标：

* 把 spin API 跑起来
* 定 reward table
* 结果可返回

输出：

* `/api/spin`
* weighted random engine
* request validation
* postman / curl 测试通过

### 你要做的重点

* reward table 要清晰
* 不要把逻辑写死在 route 里
* 抽出 `spinEngine.ts`

---

## Day 3 — PixiJS 画面与基本转盘

目标：

* 浏览器里有 wheel/pointer/button
* 可以本地假转

输出：

* 基础场景
* wheel segment render
* basic spin animation
* result banner placeholder

### 注意

一开始不需要超美，先让它“像个游戏”。

---

## Day 4 — 前后端联调

目标：

* 点击 spin -> 请求 backend -> 返回 reward -> 动画停在指定区域

输出：

* 真正 end-to-end flow
* balance 更新
* 历史记录更新
* loading / disabled state

这是最核心的一天。

---

## Day 5 — polish + test

目标：

* 补 UI 反馈
* 补测试
* 补错误处理

输出：

* win glow / bounce
* backend unit tests for spinEngine
* frontend basic interaction test
* edge cases fixed

---

## Day 6 — 部署 + observability + README

目标：

* 可访问 demo
* CI 能跑
* README 专业

输出：

* deployed frontend/backend
* GitHub Actions
* setup instructions
* architecture diagram
* why this project aligns to browser game engineering

---

## Day 7 — 打磨成简历/面试资产

目标：

* 形成可投递叙事

输出：

* resume bullet
* project summary
* interview script
* GitHub repo polish
* short Loom/demo video

---

# 八、你的项目功能细节我帮你定一下

## 奖励类型建议

不要太复杂，6 个就够：

* 5 Coins
* 10 Coins
* 20 Coins
* 50 Coins
* Bonus Spin
* Multiplier x2

## 概率建议

例子：

* 5 Coins — 35%
* 10 Coins — 25%
* 20 Coins — 18%
* 50 Coins — 10%
* Bonus Spin — 7%
* Multiplier x2 — 5%

这样有稀有奖励，也有展示空间。

---

# 九、项目目录建议

```txt
lucky-spin-lab/
  apps/
    client/
      src/
        game/
          scene/
          entities/
          animation/
          config/
          state/
        api/
        components/
        pages/
    server/
      src/
        routes/
        services/
        middleware/
        config/
        types/
  packages/
    shared/
      src/
        types/
        constants/
  README.md
```

这个结构会显得你很懂工程。

---

# 十、你简历上未来可以怎么写

## 项目描述版本

**Lucky Spin Lab | TypeScript, PixiJS, Node.js, Express, Zod, PostgreSQL, GitHub Actions**
Built a browser-based mini game prototype inspired by social casino interaction loops, using PixiJS for client-side rendering and animation and a TypeScript/Node.js backend for reward logic and spin result generation. Designed a config-driven reward engine, integrated typed APIs, implemented error handling and test coverage, and deployed the full-stack app with CI support.

## 更偏 JD 版本

Built a TypeScript + PixiJS browser game prototype with a separate Node.js reward engine to simulate client-side game interaction, animation flow, and service-side outcome generation. Structured the app with strong typing, modular architecture, validation, testing, and deployment practices to reflect production-minded game engineering.

---

# 十一、面试时怎么讲最加分

你可以这样讲：

“Because this role emphasised TypeScript, PixiJS, browser graphics, and some service-side math model work, I built a small game prototype rather than another generic CRUD app. I used PixiJS to implement the game client and animation flow, and separated the reward calculation into a TypeScript/Node.js backend service. I wanted to show that I can think about both player-facing interaction quality and the engineering structure behind it.”

这个很对味。

---

# 十二、Claude Code 该怎么用最有效

你这次不要让 Claude Code 从头自由发挥，你要把它当“高效率工程搭子”。

## 最佳使用方式

你负责：

* scope
* 架构
* 文件边界
* 功能验收
* 最终 code review

Claude Code 负责：

* scaffold
* repetitive boilerplate
* PixiJS scene code 初版
* API route 初版
* 单测模板
* README 初稿
* refactor suggestions

## 原则

不要说：
“帮我做一个游戏”

要说：
“Create a PixiJS wheel scene with 6 labelled reward segments, a pointer at the top, and an exported method `spinToSegment(index: number)` using easing-based animation.”

这样质量高很多。

---

# 十三、我建议你现在就用的 Claude Code 提示词

## Prompt 1：项目初始化

```text
Create a monorepo project called lucky-spin-lab with:
- apps/client: Vite + TypeScript + PixiJS
- apps/server: Node.js + TypeScript + Express
- packages/shared: shared TypeScript types
Set up ESLint, Prettier, and npm workspace scripts.
Keep the structure clean and production-minded.
```

## Prompt 2：后端 spin engine

```text
In apps/server, implement a spin engine for a browser reward game.
Requirements:
- config-driven reward table
- weighted random selection
- POST /api/spin endpoint
- request validation with Zod
- response includes rewardId, rewardLabel, rewardValue, newBalance, timestamp
- keep route handlers thin and business logic in services/spinEngine.ts
- add unit tests for weighted selection and balance updates
```

## Prompt 3：PixiJS 转盘

```text
In apps/client, create a PixiJS reward wheel scene with:
- 6 reward segments
- labels for each segment
- top pointer
- spin button outside canvas
- exported method spinToSegment(index: number)
- easing-based animation
- clear separation between scene setup, wheel rendering, and animation logic
Use TypeScript throughout.
```

## Prompt 4：联调

```text
Connect the PixiJS client to the backend spin API.
Flow:
- click spin button
- call POST /api/spin
- map rewardId to wheel segment index
- animate wheel to the winning segment
- update balance and reward history in UI
- prevent duplicate requests while spinning
- handle API errors gracefully
```

## Prompt 5：README

```text
Write a professional README for Lucky Spin Lab.
Include:
- project overview
- why this project was built
- tech stack
- architecture
- local setup
- deployment notes
- testing
- future improvements
- a short section explaining how Claude Code was used as a development accelerator while architecture and business logic were manually reviewed
```

---

# 十四、我对你最真实的建议

对你来说，**最重要的不是项目做多大，而是做得“像 VGW 会喜欢的工程师做出来的东西”**。

所以这个项目一定要有这三个气质：

## 1. 有“游戏感”

哪怕小游戏，也要有：

* 动画
* 反馈
* 视觉完成度

## 2. 有“工程感”

不是一个 demo spaghetti：

* 分层
* 类型
* config
* 测试
* README
* CI

## 3. 有“ownership”

让别人一看就觉得你真的能：

* 自己拆需求
* 自己建结构
* 自己联调
* 自己部署
* 自己解释取舍

这正好对应 VGW 那句：
**you build it, you ship it, you run it**

---

# 十五、最后给你一个最终执行建议

你的最佳路线不是犹豫，而是直接开始：

**这周就做 Lucky Spin Lab MVP。**

顺序就是：

1. 先把 PRD 定下来
2. 用 Claude Code 起 monorepo
3. 先做 backend spin engine
4. 再做 PixiJS wheel
5. 第四天联调
6. 第五天 polish
7. 第六天部署
8. 第七天写进简历和面试话术

你要的话，我下一条可以直接继续给你：

**一版可以直接丢给 Claude Code 的完整英文 PRD + tech spec + task breakdown**
这样你几乎可以今天就开工。
