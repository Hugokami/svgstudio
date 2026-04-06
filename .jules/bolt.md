## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** `svgviewer.html` is a large single-file application where layout thrashing is a primary performance bottleneck. Several drag operations (marquee selection, panning, scrubbing) were recalculating layout (e.g., `getBoundingClientRect`) or modifying DOM state inline during `mousemove` events without `requestAnimationFrame` throttling, causing unnecessary layout calculation on every frame.
**Action:** When working with custom drag/drop or mousemove-driven interactions in this specific file, always implement `requestAnimationFrame` and ensure bounding rects are cached on `mousedown` rather than calculated on `mousemove`.

## 2024-05-25 - Dynamic Function Compilation Overhead
**Learning:** In GSAP ticker loops (which run roughly 60fps), calling `new Function(...)` to evaluate dynamic math expressions on every frame causes massive JIT compilation overhead. The JS engine has to re-parse and compile the string expression repeatedly, causing severe performance degradation (~17ms vs ~1.7ms per 10k evals).
**Action:** When evaluating dynamic user string expressions in tight animation loops, always cache the compiled function in a `Map` (e.g., `let cache = new Map(); fn = cache.get(expr); if (!fn) { fn = new Function(...); cache.set(expr, fn); }`).
