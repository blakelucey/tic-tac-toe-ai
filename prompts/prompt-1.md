You are a senior-to-principal React Native engineer. Finish this repository into a polished, production-quality take-home submission for a Principal React Native Engineer position.

Context:

- This is a single-player tic-tac-toe game with a CPU opponent.
- The goal is not just to make the game work. The goal is to make the codebase look like it was designed by a strong senior/principal engineer.
- The reviewer will download the repo, follow the README on a Mac mini, run the app, inspect the architecture, inspect the tests, and evaluate whether this is a reasonable submission for a senior/principal-level engineer.
- The project must be React Native with Expo and TypeScript.
- The repo is already initialized.
- I prefer Bun for local development, but the project must also be runnable by a reviewer using npm/npx Expo commands without friction.
- The reviewer explicitly said AI tools are allowed, but wants to see the prompts used if applicable. Include an AI usage section in the README that is honest and concise.

Your job:
Complete the app and repository with strong engineering quality, clean architecture, good DX, and thoughtful documentation.

High-level requirements:

1. Build a single-player tic-tac-toe game.
2. Implement a CPU opponent.
3. Include at least two CPU strategies:
   - easy: random valid move
   - hard: minimax or similarly strong deterministic strategy
4. Provide a clean, polished mobile UI.
5. Make the project easy to run on a Mac.
6. Include tests that prove the domain logic is correct.
7. Include a README that explains setup, architecture, tradeoffs, and AI usage.

Non-goals:

- Do not add backend services.
- Do not add unnecessary libraries.
- Do not overengineer with enterprise boilerplate that adds no value.
- Do not make the UI flashy for the sake of it.
- Do not add features that undermine clarity.

Engineering expectations:

- Use TypeScript strictly.
- Separate pure game/domain logic from UI concerns.
- Use feature-based organization.
- Keep components small and focused.
- Keep state management predictable and easy to follow.
- Optimize for clarity, testability, and maintainability.
- Prefer boring, dependable patterns over cleverness.

Repository expectations:

- Support Bun for local development.
- Also support npm/npx Expo commands for the reviewer.
- Add scripts for start, ios, android, test, lint, and format.
- Ensure the README includes both Bun and npm setup instructions.

Target project structure:

- Root App.tsx should be thin and delegate to src/app/App.tsx
- Use a structure roughly like:

src/
app/
App.tsx
providers.tsx
features/
game/
components/
GameBoard.tsx
GameCell.tsx
GameStatusBanner.tsx
DifficultySelector.tsx
ResetButton.tsx
lib/
gameLogic.ts
winningLines.ts
store/
gameStore.ts
gameSelectors.ts
types/
gameTypes.ts
hooks/
useCpuTurn.ts
screens/
GameScreen.tsx
services/
ai/
cpuPlayer.ts
strategies/
randomStrategy.ts
minimaxStrategy.ts
tests/
gameLogic.test.ts
cpuPlayer.test.ts

You may adapt the structure slightly if needed, but preserve the architecture principles.

Implementation requirements:

1. Domain model
   Create explicit types for:

- Player
- CellValue
- Board
- Difficulty
- GameStatus
- CpuStrategy

Use a fixed 9-cell board model.

2. Pure game logic
   In src/features/game/lib/gameLogic.ts implement pure functions such as:

- createEmptyBoard
- getAvailableMoves
- applyMove
- calculateWinner
- isDraw
- getNextPlayer
- getWinningLine (if useful)

These functions must be framework-agnostic and fully unit tested.

3. CPU strategies
   Implement:

- easy strategy using random valid move
- hard strategy using minimax or equivalent optimal approach

Abstract strategy selection behind a CPU service. The UI/store should not know the internals of the algorithm.

4. State management
   Use Zustand if it is already available or if it fits cleanly. If not already installed, add it if appropriate.
   The store should manage:

- board
- currentPlayer
- winner
- winningLine
- status
- difficulty
- isCpuThinking
- actions like resetGame, setDifficulty, makeHumanMove, executeCpuMove

The flow must be deterministic and not rely on messy effect chains.

5. UX polish
   Include:

- clear title/header
- board
- current status text
- difficulty selector
- reset/new game button
- disabled interaction when game is over
- visible CPU thinking state with a short delay so the app feels intentional
- highlight winning line when someone wins

6. Styling
   Use clean React Native styling.
   Keep the layout responsive and readable.
   Avoid large design-system dependencies unless truly justified.

7. Testing
   Set up and verify Jest.
   Add meaningful tests:

- winner detection for rows, columns, diagonals
- draw detection
- valid and invalid moves
- available moves
- minimax choosing winning or blocking moves in representative scenarios
- cpu strategy returns valid indices

Do not add shallow or trivial tests just to inflate count.

8. README
   Write a strong README with sections for:

- Project overview
- Why this architecture
- CPU strategy explanation
- Tradeoffs
- How to run with Bun
- How to run with npm/npx
- How to test
- Lint/format commands
- Future improvements
- AI usage disclosure
- Prompts used

The AI usage section should be candid but concise. State that AI was used for acceleration/scaffolding/alternative implementation exploration, but all final architecture and code decisions were manually reviewed and refined.

9. Tooling
   Ensure:

- TypeScript strict mode
- ESLint
- Prettier
- sensible package.json scripts
- clean imports
- no dead code
- no TODOs left behind unless explicitly documented as future work

10. GitHub readiness
    Make the repository look reviewable:

- clean naming
- no junk files
- no broken scripts
- no commented-out code blocks
- no placeholder README text

Execution approach:

1. Inspect the existing repo and understand current files.
2. Add or update only what is necessary.
3. Implement the domain layer first.
4. Add tests for domain logic and CPU logic.
5. Implement store and hooks.
6. Implement UI.
7. Verify imports and scripts.
8. Write README last after confirming actual behavior.

Important constraints:

- Do not invent behavior that is not implemented.
- Do not claim tests pass unless they actually do in the repo.
- Do not leave the repo in a half-finished state.
- Do not create unnecessary abstractions just to look sophisticated.
- Keep the codebase elegant, practical, and review-friendly.

Final deliverables:

- completed source code
- updated package.json scripts
- test setup
- README.md
- any required config files for linting/testing/formatting
- concise summary of what was changed and why

Before making broad changes, first inspect the existing repository structure and files, then proceed carefully.
