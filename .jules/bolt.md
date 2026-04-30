## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-25 - Scrubber RAF and Layout Thrashing Optimization
**Learning:** In the timeline scrubbing logic (`handleScrub`), `tlScrubberContainer.getBoundingClientRect()` was being calculated on every single `mousemove` event inside a `requestAnimationFrame`. Additionally, coordinates were captured only when the RAF fired, potentially dropping intermediate mouse movements and the final mouseup coordinate.
**Action:** Extract `getBoundingClientRect()` to run once on `mousedown`, caching the result. Separate the coordinate capture from the RAF callback, updating an external variable (`scrubClientX`) synchronously on `mousemove` and forcing a final synchronous update on `mouseup`.
