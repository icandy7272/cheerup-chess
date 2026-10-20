# CheerUp Chess / 小马战术乐园

Approved scope: user's 2026-10-20 instruction to start after adding chess.cheerup.tech.

## Experience
Chinese, tablet-first chess tactics for a five-year-old with a parent. Sixteen chapter stories follow the thematic structure of Blokh's book; four chapters initially contain six original exercises each. All diagrams have legal kings and moves. No complete copyrighted book collection ships. Parents may import their own positions, answers and book numbers.

Child flow: map → short narrated story → scaffolded question (identify target/defender) → board exercise → encouraging stars → review. No timer, registration, ads, tracking, or leaderboard. Tapping source and destination supports touch. Illegal and wrong moves preserve position and get different feedback. Correct alternative lines can be listed and accepted. Opponent replies follow validated authored lines. Completion only after the full line.

## Architecture
Static Vite application with chess.js rule validation. Content data, puzzle runner, progress/storage, import validation, board rendering and UI are separate modules. No runtime API or server required. Browser speech synthesis with Chinese language and graceful text fallback. LocalStorage with safe fallback and JSON export/import; backup includes imported puzzles. Reviews prioritize missed/hinted puzzles. Imported content is plain text and never rendered as HTML. Input size and count limited. Import atomically validates all positions, all solution branches and IDs before mutation.

## Content
All 16 stories, 24 curated original exercises across elimination, deflection, attraction, discovered attack. Each contains a valid FEN, full correct SAN lines, scaffold question and square answers, graded hints, explanatory success text, original attribution and optional book reference. Theme truth must be independently reviewed. No engine claim of unique optimality for hand-authored themes; accepted lines are explicit, and UI describes authored exercise objective.

## Publication
Public GitHub repository icandy7272/cheerup-chess, MIT source and CC BY 4.0 original lessons, third-party licenses retained. Tencent Cloud EdgeOne Pages hosting, build npm ci && npm run build, output dist, target chess.cheerup.tech. User authorizes open-source and deployment. Confirm domain/account access before mutating DNS; do not replace existing unrelated records. No paid resources without budget approval. Do not substitute Sites hosting for Tencent. If account access missing, finish source, local tests, preview and deployment instructions, then report exact remaining login step.

## Verification
Node tests validate all authored sequences, content themes via reviewer, illegal and wrong move behavior, alternative branches, opponent reply, reset, review scheduling, backup/import failures and safe content. Build production bundle. Browser verify lesson→exercise→completion, hints, reload, backup, invalid import, mobile/tablet layout. Record actual results and limits.
