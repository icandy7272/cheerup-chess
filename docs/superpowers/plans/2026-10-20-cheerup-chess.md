# CheerUp Chess Implementation Plan

> **For agentic workers:** execute using superpowers:executing-plans, with independent review before publication.

**Goal:** Deliver a child-friendly, Chinese tactics learning site, public GitHub source and Tencent deployment.
**Architecture:** Static Vite ES modules; chess.js for legal moves; authored branching answers; safe local progress and imports.
**Tech Stack:** JavaScript, CSS, Vite, chess.js, Node test runner.

## Files and tasks
- [x] 1. tests/core.test.js: write tests for legal puzzle sequences, wrong move nonmutation, replies, completion, hints/review, import rejection and backup recovery. Run npm test and confirm missing implementation fails.
- [x] 2. src/runner.js, src/storage.js, src/import.js: implement tested contracts; rerun tests.
- [x] 3. src/content.js: sixteen stories and 24 original legal theme exercises. Validate every line and have independent review of thematic truth and difficulty.
- [x] 4. src/board.js, src/main.js, src/style.css, index.html: accessible map, narrative, scaffold, board, hints, reward, review and parent tools. No raw user HTML. Include reduced motion and speech fallback.
- [x] 5. tests/import.test.js and content checks: cover malformed input, backup/import atomicity, collisions, branching, storage failures and full solution lines. npm test must pass.
- [x] 6. README.md, LICENSE, CONTENT-LICENSE, docs/DEPLOY.md, public/example-puzzles.json, GitHub CI: reproducible builds, content schema, Tencent deployment, domain and login checklist.
- [x] 7. npm run build; serve locally and use browser to verify child flow, data import/export and responsive layout. Independent code review; fix important findings and repeat relevant tests.
- [x] 8. Create public GitHub repo, push verified source; deploy to Tencent if account access available, verify HTTPS domain and asset responses; otherwise deliver built package and precise pending account action.
