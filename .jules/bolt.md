## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-06-12 - Marquee Selection O(N*M) Performance Bottleneck
**Learning:** During marquee selection (and potentially other bulk array filtering operations), calling `Array.includes` inside a loop against the `selectedElements` array causes an O(N*M) algorithmic bottleneck that drastically degrades performance when selecting many elements in large SVGs.
**Action:** When performing membership checks within a loop against `selectedElements` or similar large arrays, always instantiate a temporary `Set` before the loop and use `Set.has` inside the loop, adding new elements to the `Set` as they are encountered, to reduce algorithmic complexity to O(N+M).
