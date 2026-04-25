## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-25 - Unthrottled DOM reads during layout resizing
**Learning:** The window resizer component shared an identical performance bottleneck as panning and marquee selection. During `mousemove`, the resizer queried `document.body.clientWidth` and directly updated `flex` styling without `requestAnimationFrame`. This continuous layout querying and inline style thrashing impacted performance.
**Action:** Extract expensive DOM layout reads like `clientWidth` to the `mousedown` handler when possible, and ensure active drag event listeners throttle styling updates strictly within a `requestAnimationFrame` block to consolidate repaints.
