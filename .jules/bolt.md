## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.
## 2024-05-25 - Efficient DOM querying for animation classes
**Learning:** Using `querySelectorAll('*')` followed by a JS array filter is significantly slower than relying on native C++ DOM traversal via attribute selectors like `querySelectorAll('[class^="anim-"], [class*=" anim-"]')`.
**Action:** Always prefer CSS attribute selectors over JS-level DOM tree filtering when finding elements by class prefix in large SVG documents.
