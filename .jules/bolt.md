## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - O(N*M) DOM Selection Array Checks
**Learning:** In marquee selections traversing large SVG node counts, using `Array.includes()` for `selectedElements` within a loop creates an O(N*M) performance penalty where N is new selections and M is existing selections.
**Action:** When filtering or merging live collections of elements (like in `svgviewer.html` and `js/app.js`), use an intermediate `Set` before the loop (e.g. `new Set(selectedElements)`) and add matched elements to both the Set and the Array inside the loop, turning an O(N*M) membership check into O(N+M).
