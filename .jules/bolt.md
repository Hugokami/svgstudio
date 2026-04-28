## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-25 - Caching JIT-compiled math expressions during high-frequency loops
**Learning:** In `js/app.js` and `svgviewer.html`, dynamic math expressions like `[data-expr-x]` were using `new Function(...)` directly inside `updateTimelineUI()`, which executes on every GSAP animation frame (60fps). JIT compilation of thousands of functions per second causes severe CPU overhead and GC churn.
**Action:** Always cache the results of `new Function` in `window.expressionCache` using a `Map` so that each unique expression string is only compiled into a JS function once, then invoked directly during animation loops.
