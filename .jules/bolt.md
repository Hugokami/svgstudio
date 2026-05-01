## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - SMIL to GSAP translation DOM traversal overhead
**Learning:** In `translateSMILToGSAP`, resolving animation targets via `svg.getElementById()` for every `animate`, `animateTransform`, or `animateMotion` element can cause significant DOM traversal overhead, especially when multiple animations target the same elements via `href`.
**Action:** Always cache `getElementById` results in a `Map` when processing collections of elements (like SVG animations or definitions) that frequently reference the same targets via hrefs or IDs to reduce DOM traversal overhead.
