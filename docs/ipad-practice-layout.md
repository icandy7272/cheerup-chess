# iPad practice viewport layout

The practice page must keep the complete board and current primary action within the browser viewport. Safari toolbars reduce the available height; use dynamic viewport units with a vh fallback. Apply only to practice pages at tablet widths (768px and above), retaining ordinary document scrolling for other pages and phones.

Landscape: compact site header and puzzle title, two columns, square board constrained by both width and viewport height. The coach panel has a scrollable content area and a separate persistent action area. Portrait: board above a compact coach panel, with the same persistent actions. Preserve guiding questions, explanations, hints, move replay, stars and local progress. Hide the practice footer in this mode. Storage errors remain visible and accessible.

Verify real completion and next navigation at 1024x600, 1024x680, 1180x700, 1366x860, 768x900 and 820x1000; assert complete board and action rectangles inside the viewport, without document scrolling. Also check long lines, diagrams, phone and desktop regressions; run npm test and npm run build before release.

Browser regression: `tests/browser/tablet-layout.mjs` uses original exercises only and performs actual touchscreen moves. Run with Node and Playwright installed, against BASE_URL (default local port 5174). Set BROWSER=webkit for Safari-engine coverage; PLAYWRIGHT_MODULE can identify an existing Playwright module. It covers completion, next, hints, a long repetition exercise, rotation and leaving the practice page. The standard unit suite remains `npm test`.
