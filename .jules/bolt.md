## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-25 - Caching dynamically compiled expressions
**Learning:** In `svgviewer.html` and `js/app.js`, dynamic math expressions compiled with `new Function()` inside high-frequency event loops like `updateTimelineUI` (GSAP tickers) can cause severe JIT compilation overhead, severely degrading performance.
**Action:** Always cache the compiled functions in a `Map` (e.g. `compiledExprCache.get(expr)`) so they are only compiled once per expression string, reusing the compiled function for subsequent frame updates.
