# Tic-Tac-Toe AI

Single-player tic-tac-toe built with Expo, React Native, and TypeScript. The goal of this submission was to keep the app intentionally small while making the architecture, domain boundaries, tooling, and documentation look like production-quality engineering rather than demo code.

## Project Overview

- Human plays as `X`.
- CPU plays as `O`.
- Two CPU strategies are supported:
  - `easy`: random valid move
  - `hard`: deterministic minimax
- The UI highlights the winning line, disables invalid interaction, and adds a short CPU thinking delay so the turn flow feels intentional.

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
- `App.tsx` at the repo root is intentionally thin and delegates to [`src/app/App.tsx`](/Users/blakelucey/Desktop/Coding/Dev/tic-tac-toe-ai/src/app/App.tsx).

## CPU Strategy

`easy` selects a random move from the current list of valid squares.

`hard` uses minimax with deterministic move ordering. Because tic-tac-toe is a solved game, minimax is a good fit here: it is easy to verify, easy to test, and guarantees optimal play without adding unnecessary complexity.

## Tradeoffs

- I kept state in a single store rather than splitting it across reducers or contexts because the app is small and the current approach is easier to trace.
- I did not add persistence, navigation, analytics, or animation libraries because they would increase surface area without improving the core take-home evaluation.
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
- Add subtle move / win animations now that the core architecture is stable.
- Expose a difficulty analytics surface only if this became a real shipped feature.

## AI Usage Disclosure

AI tooling was used to accelerate scaffolding, explore implementation options, and help draft portions of the initial structure. All final architecture, code paths, tests, naming, and documentation were manually reviewed and refined before being kept in the repository.

## Prompts Used

- Primary build prompt: [`prompts/prompt-1.md`](/Users/blakelucey/Desktop/Coding/Dev/tic-tac-toe-ai/prompts/prompt-1.md)
