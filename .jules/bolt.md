## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-18 - [DOM Cleanup Performance]
**Learning:** Using multiple sequential `querySelectorAll` passes on a large document for heavy cleanup operations causes significant tree traversal overhead and layout thrashing.
**Action:** Consolidate these operations into a single `TreeWalker` pass using `ownerDocument.createTreeWalker()` to improve cleanup performance and prevent UI blocking.
