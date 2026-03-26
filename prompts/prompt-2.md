You are a principal-level React Native engineer and product-minded mobile UI architect.

Upgrade this existing Expo + React Native + TypeScript take-home project into a more intriguing, polished, premium-feeling mobile UI.

Important context:

- This is still a take-home assignment for a Principal React Native Engineer role.
- The app is a single-player tic-tac-toe game with a CPU opponent.
- The company explicitly wants an intriguing UI.
- The goal is not to make the UI loud, gimmicky, or overdesigned. The goal is to make it feel sharp, modern, premium, fast, and intentional.
- The UI should feel inspired by a sports betting / sportsbook product: dark, energetic, high-confidence, data-forward, crisp, and slightly dramatic.
- The result should still be production-minded and maintainable, not a design toy.

Hard constraints:

- Do NOT use anime.js.
- Use React Native-friendly animation patterns only.
- Prefer React Native Reanimated for motion and transitions.
- Keep the codebase practical and reviewable.
- Do not introduce unnecessary dependencies.
- Do not break the existing architecture.
- Do not degrade readability or maintainability in pursuit of flash.
- Do not invent backend services or networking.
- Keep all work compatible with Expo if reasonably possible.

Your job:
Inspect the existing codebase, then enhance the visual design system, interaction model, and motion system so the app feels impressive and intentional while preserving clean architecture.

Primary design direction:

- dark theme
- premium sportsbook-inspired feel
- crisp spacing and typography
- strong emphasis states
- subtle depth and elevation
- fast, high-confidence motion
- controlled use of accent color
- excellent perceived responsiveness

Product direction:
This should feel like a mobile mini-game experience that could plausibly live inside a sports betting brand ecosystem as a promotional or engagement feature.

What to implement:

1. Visual design system
   Create or refine a cohesive theme with:

- background colors
- surface/card colors
- text hierarchy
- accent colors
- border styles
- spacing scale
- radii
- shadow/elevation treatment

Keep it tasteful. Avoid neon overload.
Use a consistent token-based approach where reasonable.

2. Screen composition
   Refine the main game screen so it has a clear, premium layout with:

- a branded header/title area
- a subtitle or short descriptor
- a scoreboard or session stats area if it fits cleanly
- a game board container that feels elevated and intentional
- a status area for turn / win / draw / CPU thinking
- a difficulty control that feels like a sportsbook market selector
- a reset / new game control with strong affordance

The layout should feel balanced and mobile-native, not like a web page shrunk into a phone.

3. Motion and micro-interactions
   Use React Native Reanimated to add polished motion where it adds value.

Implement tasteful animations such as:

- cell press feedback with spring/tap scale
- subtle board or card entrance animation
- status banner transition animation
- difficulty selector active-pill animation
- CPU thinking indicator animation
- win-state animation, such as highlighting winning cells and/or revealing a winning line
- reset/new game transition polish

Do not overanimate everything.
Motion should feel premium, not busy.

4. Board polish
   Enhance the game board UI:

- cleaner cell styling
- stronger selected state
- subtle press interaction
- highlighted winning cells/line
- improved spacing and proportions
- visually satisfying X and O presentation

The board should be the centerpiece.

5. Sportsbook-inspired details
   Add subtle brand-adjacent cues, such as:

- segmented control styling reminiscent of odds/market toggles
- a “CPU thinking” state that feels like a live system status
- scoreboard/session tracker for Player / CPU / Draws if it integrates cleanly
- language and visual hierarchy that feels more like a high-performance consumer app than a tutorial app

Do not use real betting flows, odds, or anything that complicates the assignment unnecessarily.

6. Typography and hierarchy
   Improve hierarchy with:

- stronger heading styles
- readable subtext
- clear status emphasis
- clean button labels
- consistent visual rhythm

Typography should help the UI feel expensive.

7. Architecture and code quality
   Preserve or improve the existing architecture.
   Keep:

- domain logic pure
- UI components focused
- animation code localized and understandable
- styling organized sensibly
- no giant monolithic screen files unless clearly justified

If a small theme file, constants file, or reusable UI primitive layer helps, add it.
But do not overengineer.

8. Accessibility and usability
   Maintain good usability:

- sufficient contrast
- obvious touch targets
- clear disabled states
- readable labels
- no essential information hidden only in animation

9. README update
   Update the README to reflect the UI improvements, including:

- design direction
- motion approach
- why React Native Reanimated was used
- how the UI aligns with a premium sportsbook-inspired experience
- any tradeoffs made to keep the take-home practical

10. Validation
    Before finalizing:

- verify imports
- ensure the app still runs
- ensure the animations do not make the experience sluggish
- ensure the result still looks like a disciplined engineering submission, not a flashy prototype

Implementation guidance:

- First inspect the current repo structure and identify the right insertion points.
- Reuse the current architecture wherever possible.
- Add Reanimated only if not already present and if it can be integrated cleanly.
- Prefer incremental, well-contained UI improvements over a full rewrite.
- Keep package additions minimal.
- Do not leave placeholder comments or half-finished experiments.

Desired end result:
A reviewer should open the app and think:
“This feels sharper and more product-minded than a normal take-home. The engineer clearly understands both React Native implementation and consumer-grade UI polish.”

Deliverables:

- upgraded UI
- integrated motion system
- refined styling/theme
- any necessary dependency/config updates
- README updates
- concise summary of what changed and why

Important:
Do not claim anything is implemented unless it actually is.
Do not leave broken scripts.
Do not compromise maintainability for visual flourish.
Start by inspecting the existing repository, then make the improvements carefully and coherently.
