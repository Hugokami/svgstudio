## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-18 - [Optimize animation discovery queries]
**Learning:** Querying all DOM nodes with \`querySelectorAll('*')\` and filtering via Javascript arrays of \`classList\` properties is an anti-pattern. Browser implementations handle exact attribute prefixes and substring matching far faster inside their C++ rendering engine than converting all nodes into a JS array.
**Action:** When performing substring or exact-prefix checks against element classes (like matching \`anim-*\`), use exact prefix attribute selectors such as \`querySelectorAll('[class^="anim-"], [class*=" anim-"]')\` to let the browser engine do the filtering and avoid massive DOM traversal overhead.
