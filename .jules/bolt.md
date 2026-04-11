## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - Layout thrashing in Resizer
**Learning:** Resizer logic calculated `document.body.clientWidth` synchronously inside an unthrottled `mousemove` event listener, causing continuous layout thrashing while dragging the divider.
**Action:** Always cache bounding boxes / layout reads like `clientWidth` on `mousedown` when interacting with continuous `mousemove` drag events, and always use `requestAnimationFrame` to throttle visual/style updates.
