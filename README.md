# Tic-Tac-Toe AI

Single-player tic-tac-toe built with Expo, React Native, and TypeScript. The goal of this submission was to keep the app intentionally small while making the architecture, domain boundaries, tooling, and documentation look like production-quality engineering rather than demo code.

## Project Overview

- Human plays as `X`.
- CPU plays as `O`.
- Two CPU strategies are supported:
  - `easy`: random valid move
  - `hard`: deterministic minimax
- The UI is intentionally styled like a premium sportsbook-adjacent mini-game: dark surfaces, strong status hierarchy, session stats, animated emphasis states, and fast feedback that keeps the board feeling live.

## Why This Architecture

The codebase is organized around the game feature, with the core rules implemented as pure framework-agnostic functions and the CPU logic abstracted behind a service layer.

```text
src/
  app/
    App.tsx
    providers.tsx
  features/
    game/
      components/
      hooks/
      lib/
      screens/
      store/
      types/
  services/
    ai/
  tests/
```

Design choices:

- `src/features/game/lib/gameLogic.ts` contains pure game rules and board operations.
- `src/services/ai` owns CPU strategy selection so UI and store code do not know strategy internals.
- Zustand is used for a single focused store because the app state is small but still benefits from explicit actions and selector-based reads.
- `useCpuTurn` centralizes the delayed CPU move flow instead of scattering timers or effects across UI components.
- A small token-based theme file keeps colors, spacing, radii, and elevation consistent without introducing a full design-system abstraction.
- Session stats are tracked in the store so the experience feels more product-minded without adding backend complexity.
- `App.tsx` at the repo root is intentionally thin and delegates to [`src/app/App.tsx`](/Users/blakelucey/Desktop/Coding/Dev/tic-tac-toe-ai/src/app/App.tsx).

## Design Direction

The updated visual system is intentionally inspired by a modern sportsbook product:

- dark background with raised surfaces and controlled accent color
- crisp text hierarchy with uppercase metadata labels
- board-first composition with stronger depth and match-state emphasis
- data-forward session tracking and live-status treatment
- motion that feels fast and confident rather than playful or decorative

The result is meant to feel like a promotional engagement surface that could plausibly exist inside a Cheddr mobile product without pretending to be a real wagering flow.

## CPU Strategy

`easy` selects a random move from the current list of valid squares.

`hard` uses minimax with deterministic move ordering. Because tic-tac-toe is a solved game, minimax is a good fit here: it is easy to verify, easy to test, and guarantees optimal play without adding unnecessary complexity.

## Motion Approach

The app uses `react-native-reanimated` for contained, high-value interaction polish:

- cell press scale feedback
- animated difficulty selector pill
- status banner transitions and CPU activity pulse
- winning line reveal
- entrance motion for the primary cards

Reanimated was chosen because it is React Native-native, Expo-compatible, and lets animation stay close to the component that owns the interaction. That keeps the code reviewable while still improving perceived quality substantially.

## Tradeoffs

- I kept state in a single store rather than splitting it across reducers or contexts because the app is small and the current approach is easier to trace.
- I added Reanimated because it materially improves the interaction quality, but kept the motion system scoped and avoided turning the take-home into a flashy prototype.
- I kept the theme layer intentionally small instead of building a generalized component library.
- I did not add persistence, navigation, analytics, or backend calls because they would increase surface area without improving the core take-home evaluation.
- Tests focus on domain correctness and CPU behavior rather than UI snapshots. That gives better signal for a game like this.

## Run With Bun

Prerequisites:

- Node.js current LTS
- Bun
- Xcode / iOS Simulator if you want to launch the iOS app directly from the CLI

Install and run:

```bash
bun install
bun run start
```

Useful Bun commands:

```bash
bun run ios
bun run android
bun run test
bun run lint
bun run format
bun run typecheck
```

## Run With npm / npx

Install and run with npm:

```bash
npm install
npm run start
```

Expo CLI equivalents also work:

```bash
npx expo start
npx expo start --ios
npx expo start --android
```

Useful npm commands:

```bash
npm run ios
npm run android
npm test
npm run lint
npm run format
npm run typecheck
```

## Testing

The test suite covers the domain and CPU logic:

- winner detection for rows, columns, and diagonals
- draw detection
- valid and invalid move application
- available move calculation
- minimax choosing winning and blocking moves
- CPU strategies returning valid indexes
- session stat aggregation for completed rounds

Run tests with:

```bash
npm test
```

## Linting And Formatting

```bash
npm run lint
npm run format:check
npm run format
```

## Future Improvements

- Add a small E2E smoke test pass with Detox or Maestro for basic tap flow verification.
- Persist difficulty selection and recent results locally.
- Add haptic feedback tuned to move, win, and reset events.
- Add a branded onboarding / explainer sheet if this were embedded in a larger Cheddr app surface.
- Expose a difficulty analytics surface only if this became a real shipped feature.

## AI Usage Disclosure

I used AI tools to accelerate development and explore implementation approaches, specifically for:

- scaffolding a production-grade project structure
- enforcing separation of concerns between domain logic, UI, and services
- generating initial approaches for CPU strategies and UI refinement

## Prompts Used

- Architecture & Implementation prompt: [`prompts/prompt-1.md`](/Users/blakelucey/Desktop/Coding/Dev/tic-tac-toe-ai/prompts/prompt-1.md)
- UI & Motion Enhancement prompt: [`prompts/prompt-2.md`] (/Users/blakelucey/Desktop/Coding/Dev/tic-tac-toe-ai/prompts/prompt-2.md)
