---
name: svg-animator
description: Transforms simple ideas into high-end, performant, and interactive SVG animation prompts using the "Master Architecture" (4 Layers).
---

# SVG Animator: High-End Prompt Architecture

Use this skill to architect SVG animations that are 60fps, hardware-accelerated, and interactive. Every prompt generated must follow the **Four Layers of SVG Excellence**.

## 1. The Four Architecture Layers

### Layer 1: Viewport & Coordinate Rules (Precision Control)

- **Constraint**: Force `viewBox="0 0 1000 1000"` (or appropriate 1:1/16:9 ratio).
- **Constraint**: Max 2 decimal places for all coordinates (`path data`).
- **Goal**: Prevent DOM bloat and layout thrashing.

### Layer 2: Base Vector Elements (Aesthetic & Semantic Structure)

- **Grouping**: Use semantic `<g>` tags (e.g., `#base`, `#glow`, `#particles`).
- **Style**: Specify high-end aesthetics (e.g., "Corporate Memphis," "Digital Brutalist," "Glassmorphic").

### Layer 3: Animation Engine Selection

- **CSS**: For simple loops (e.g., pulse, float).
- **GSAP**: For complex choreography, `MorphSVG`, `DrawSVG`.
- **SMIL**: For declarative filter animations (e.g., animating `seed` in `feTurbulence`).
- **Framer Motion**: For React-based physics, gestures, and interruptible motion.

### Layer 4: Hardware Acceleration Hints

- **Properties**: Only animate `transform`, `opacity`, `filter`.
- **Optimization**: Explicitly demand `will-change: transform`.

---

## 2. Interactive SVG Patterns

### Interactive Mouse Tracking (Tilt/Parallax)

- **Logic**: Use `onMouseMove` to calculate relative displacement.
- **GSAP Prompt**: "Calculate X/Y offset from center (500,500) and use `gsap.to` with `overwrite: 'auto'` for smooth tracking."

### Liquid Distortion Hover (Filter Modulation)

- **Logic**: Modulate `scale` of `<feDisplacementMap>` on mouse over.
- **SMIL Prompt**: "Animate `<feDisplacementMap>` scale from 0 to 50 on `#hover-trigger`."

### Data-Synced Evolution

- **Logic**: Map external data (e.g., Supabase) to path properties.
- **Logic**: Use `stroke-dashoffset` for real-time progress bars or charts.

---

## 3. Transformation Logic (Simple -> High End)

### The "Permutation Bracket" Technique

Instead of a simple "pulse," permutate the engine and filter:

- **Base**: "Pulse a circle."
- **Permutated**: "Scale a circle via GSAP, but add a `feGaussianBlur` that modulates inverse to the scale, creating a 'breathing' organic feel."

### Examples

- **Geometric Morphing**: "Assemble shattered triangles into a wolf, then morph into an eagle using MorphSVG stagger."
- **Infinity Zoom**: "Scale multiple centered SVG layers (BG/Mid/FG) using an infinite ease-in-out loop."
- **Fluid Glitch**: "Use `feTurbulence` with an animated `seed` and apply to a high-contrast brutalist icon."

---

## 4. Usage Rules for AI Agents

1. **Never** use raw `<path>` data without grouping.
2. **Always** include a `<defs>` section for reusable filters.
3. **Always** specify the animation engine (CSS, GSAP, etc.) to avoid confusion.
4. **Enforce** performance by forbidding top/left/width/height animations.
