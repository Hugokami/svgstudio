## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-10-24 - [Avoid new Function in Animation Loops]
**Learning:** Using `new Function(...)` inside high-frequency event loops like GSAP tickers or `requestAnimationFrame` causes severe Just-In-Time (JIT) compilation overhead, resulting in stuttering and low frame rates when evaluating mathematical expressions for SVG properties.
**Action:** Always compile dynamic expressions once and cache them in a `Map`. Use the cached function in the animation loop to evaluate the expression efficiently.
