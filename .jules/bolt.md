## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - JIT Overhead in Animation Loops
**Learning:** Compiling dynamic expressions with `new Function` inside high-frequency loops like `requestAnimationFrame` or GSAP tickers (e.g., `updateTimelineUI`) incurs massive JIT compilation overhead, slowing down the animation significantly.
**Action:** Always use a Map to cache dynamically compiled functions for animation expressions so they are compiled once and executed repeatedly.
