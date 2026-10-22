# Approved B layout implementation plan

Goal: implement the user-approved B comparison, preserving actual chess interactions and viewport fit. At 1024x680 the board should be about 606px instead of 486px.

- [ ] Extend the tablet browser regression before implementation: assert at least 600px board at 1024x680, hidden large header, visible compact toolbar/menu and route navigation. Verify expected failure.
- [ ] Implement the single-row practice toolbar with accessible native details menu containing map/review/parent navigation and full source metadata. Close on outside click and Escape. Keep ordinary mobile header behavior.
- [ ] Replace tablet practice CSS with the approved compact layout. Constrain board by width and dynamic viewport height, keep existing portrait adaptation and persistent actions. Hide decoration and repeated praise; preserve errors, hints, score, explanations, stars and history.
- [ ] Run Chromium and WebKit tablet touch regressions, long history, menu navigation, rotation, completion and next. Check diagrams and phone/desktop overflow; compare the actual 1024x680 completion screenshot to approved B.
- [ ] Update layout documentation, run npm test and npm run build, commit and publish to authorized Tencent host, verify live Safari-engine flow and GitHub synchronization.

Files: src/main.js (toolbar/menu), src/style.css (practice layout), tests/browser/tablet-layout.mjs (actual touch regression), docs/ipad-practice-layout.md and README.md (current behavior). All family/book data remain outside Git.
