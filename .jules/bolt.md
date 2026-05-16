## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - querySelectorAll optimization
**Learning:** Using `querySelectorAll('*')` followed by JavaScript array filtering is highly inefficient on large documents, leading to high parsing overhead.
**Action:** Replace `querySelectorAll('*')` filtering with exact prefix attribute selectors like `querySelectorAll('[class^="anim-"], [class*=" anim-"]')` to let the native C++ DOM engine handle filtering significantly faster.
