## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-24 - Avoid universal selector querySelectorAll('*') for parsing animations in SVG
**Learning:** Using `querySelectorAll('*')` to find specific classes in a large SVG document causes a significant performance bottleneck due to full DOM traversal and C++ to JS array conversion overhead.
**Action:** When querying for specific classes (like animation classes 'anim-'), use an attribute selector like `querySelectorAll('[class*="anim-"]')` instead to heavily reduce traversal overhead.
