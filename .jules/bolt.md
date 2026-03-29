## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-25 - Caching JIT Function Compilations in high-frequency loops
**Learning:** Compiling dynamic expressions with `new Function()` inside a requestAnimationFrame or GSAP ticker loop introduces severe performance degradation (JIT compilation thrashing). In this application, evaluating custom properties on DOM nodes every frame via `new Function` dropped the timeline framerate significantly.
**Action:** Always extract `new Function()` instantiations outside of tight loops or implement a `Map`-based memoization cache (`_exprCache.get(expr)`) when the expression strings are re-evaluated frequently.
