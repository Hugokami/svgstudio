## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - JIT Compilation Overhead in Animation Tickers
**Learning:** In high-frequency animation loops (like GSAP tick handlers for scrubber or UI updates), evaluating dynamic expressions using `new Function(...)` causes severe JIT compilation overhead on every frame, leading to degraded performance.
**Action:** When dynamically evaluating math or property expressions frame-by-frame, always cache the compiled `Function` instance (e.g., using a `Map` keyed by the expression string) so it is only compiled once per unique expression.
