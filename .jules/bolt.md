## 2024-05-24 - Unthrottled DOM reads during drag operations
**Learning:** In `svgviewer.html`, decoupling high-frequency `mousemove` events from DOM style updates using `requestAnimationFrame` (storing latest coordinates and flushing them on RAF) is crucial to prevent layout thrashing.
**Action:** Use the rAF throttling pattern for all pointer-driven continuous DOM updates, ensuring to cancel pending frames and perform a final synchronous coordinate flush on `mouseup` to avoid dropped frames or state inconsistencies.
