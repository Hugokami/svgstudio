## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2025-03-05 - Repeated DOM traversal in SMIL translation
**Learning:** In `js/app.js` and `svgviewer.html`, the `translateSMILToGSAP` function parses all SMIL animation tags and resolves their targets via `svg.getElementById`. Because complex animated SVGs often have multiple animation tags targeting the same element, this resulted in repeated O(N) DOM traversals for the same IDs within the loop.
**Action:** Always cache `getElementById` results in a `Map` when processing collections of elements (like SVG animations or definitions) that frequently reference the same targets via hrefs or IDs to reduce traversal overhead.
