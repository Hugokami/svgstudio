## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.
## 2024-05-24 - JIT Compilation Overhead in Animation Loops
**Learning:** The application evaluates arbitrary mathematical expressions embedded in SVG attributes () during GSAP's timeline updates (up to 60fps). Creating a  on every frame for every expression forces the JavaScript engine to parse and compile the string continuously, causing severe CPU overhead and GC churn.
**Action:** When dynamically evaluating strings in tight loops (like  or GSAP ), always parse the function once and cache the compiled function object (e.g., in a  keyed by the expression string) for reuse.

## 2024-05-24 - JIT Compilation Overhead in Animation Loops
**Learning:** The application evaluates arbitrary mathematical expressions embedded in SVG attributes (`data-expr-*`) during GSAP's timeline updates (up to 60fps). Creating a `new Function` on every frame for every expression forces the JavaScript engine to parse and compile the string continuously, causing severe CPU overhead and GC churn.
**Action:** When dynamically evaluating strings in tight loops (like `requestAnimationFrame` or GSAP `onUpdate`), always parse the function once and cache the compiled function object (e.g., in a `Map` keyed by the expression string) for reuse.
