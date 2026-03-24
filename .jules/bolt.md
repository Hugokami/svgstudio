## 2026-03-24 - SVG DOM Traversal Overhead
**Learning:** In heavily nested SVG documents, using JavaScript `TreeWalker` to iterate over all nodes and manually filter by `tagName` for bulk operations (like marquee selection bounding box checks) is a massive main-thread bottleneck.
**Action:** For bulk element queries in SVGs, pre-calculate a dynamic CSS selector string and use a single `querySelectorAll()` call to offload filtering to the browser's native C++ engine. Be careful with SVG tag case-sensitivity (e.g., `<textPath>`) when building the selector string.

## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.
