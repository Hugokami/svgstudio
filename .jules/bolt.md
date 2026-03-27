## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - Dynamic math expression compilation inside GSAP tickers
**Learning:** In `js/app.js` and `svgviewer.html`, math expressions provided via `data-expr-*` attributes were being compiled dynamically using `new Function()` inside high-frequency event loops like `updateTimelineUI` (GSAP tickers). This causes severe JIT compilation overhead and triggers garbage collection churn on every frame.
**Action:** When evaluating dynamic expressions in high-frequency loops, always declare a persistent `Map` (e.g., `_exprCache`) to cache the compiled functions. This transforms a highly expensive parsing operation into a fast dictionary lookup.
