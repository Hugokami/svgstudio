## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - Avoid universal selectors in large SVGs
**Learning:** In large SVG documents, using `querySelectorAll('*')` followed by JavaScript `Array.from().filter()` to find specific elements (like those with animation classes) causes significant DOM traversal overhead and unnecessary C++ to JS array conversions.
**Action:** Always use targeted attribute selectors (e.g., `querySelectorAll('[class*="anim-"]')`) to let the browser's optimized C++ engine filter the elements natively before returning the collection to JavaScript.
