import json
import random

# Core components derived from NotebookLM research
CATEGORIES = {
    "Geometric/Abstract Morphing": {
        "styles": ["shattered geometric", "poly-art", "neo-brutalist", "minimalist isometric", "organic fluid"],
        "objects": ["wolf to eagle", "human heart to crystalline grid", "shattered glass shards", "dynamic fractal web", "exploding supernova"],
        "engines": ["GSAP MorphSVG", "CSS keyframe transforms", "SVG <animate> (SMIL)"],
        "technical": ["30+ distinct paths", "fixed vertex counts", "staggered snapping", "controlled bezier jitter"],
        "secret_sauce": ["stagger: 0.05", "ease: 'expo.inOut'", "pathDataToBezier", "rough-ease noise"]
    },
    "Cinematic Scenes": {
        "styles": ["retro-cyberpunk", "blueprint sci-fi", "parallax starry night", "industrial noir", "y2k neon"],
        "objects": ["futuristic megacity", "space station ring", "infinite race track", "underwater research lab", "desert canyon flyover"],
        "engines": ["Remotion (Antigravity skill)", "GSAP Timeline", "Framer Motion"],
        "technical": ["3 exact layers", "transform-origin: center", "infinity zoom logic", "atmospheric fog gradients"],
        "secret_sauce": ["feGaussianBlur overlay", "parallax scroll sync", "noise-texture filter", "cinematic ease-in-out"]
    },
    "VFX Filters & Distortion": {
        "styles": ["glitch-core", "thermal vision", "liquid metal", "pixelated mesh", "plasma flow"],
        "objects": ["human skull", "camera lens", "circuit board grid", "fluid drop", "digital eye"],
        "engines": ["SVG <feTurbulence>", "SVG <feDisplacementMap>", "GSAP Filter animation"],
        "technical": ["animated baseFrequency", "dynamic seed values", "rapid displacement scale", "color matrix shifts"],
        "secret_sauce": ["feColorMatrix: hueRotate", "fractalNoise", "SMIL seed animation", "mouse-tracking distortion"]
    },
    "Audio-Reactive & Polyrhythmic": {
        "styles": ["concentric minimalist", "oscilloscope wave", "radial bar chart", "pulsing dna strand", "frequency constellation"],
        "objects": ["21 concentric arcs", "staggered circle clusters", "vibrating bridge cables", "pulsing lotus flower", "sinusoidal orbit grid"],
        "engines": ["Web Audio API + vanilla JS", "GSAP stagger", "requestAnimationFrame loops"],
        "technical": ["angular velocity calculation", "frequency-to-radius mapping", "beat-synced stroke-dasharray", "velocity staggering"],
        "secret_sauce": ["ping-pong easing", "harmonic interval timing", "audio-note triggering", "dynamic stroke-width pulse"]
    },
    "Data-Driven UI/Dashboards": {
        "styles": ["premium glassmorphism", "high-tech cockpit", "3d isometric grid", "terminal console", "biometric scan interface"],
        "objects": ["revenue line chart", "threat detection radar", "real-time energy grid", "genetic sequence viewer", "global trade map"],
        "engines": ["Framer Motion + React", "Supabase MCP sync", "D3.js integration"],
        "technical": ["dynamic stroke-dashoffset", "3D hover rotation", "real-time data injection", "morphing data points"],
        "secret_sauce": ["neon-glow feGaussianBlur", "spring physics", "conditional rendering logic", "interactive tooltips"]
    }
}

TEMPLATE = """Prompt: "Generate a high-end {style} {category} animation of a {object}.
- Infrastructure: Use {engine}. 
- Structural Requirements: Ensure {technical}.
- Technical Nuance: Implement {secret_sauce} to achieve an 'insane' professional look.
- Optimization: Reduce coordinate decimal precision and use clean semantic grouping tags."
"""

def generate_library(count=500):
    library = []
    cat_list = list(CATEGORIES.keys())
    
    for i in range(count):
        cat_name = cat_list[i % len(cat_list)]
        cat_data = CATEGORIES[cat_name]
        
        prompt = TEMPLATE.format(
            style=random.choice(cat_data["styles"]),
            category=cat_name,
            object=random.choice(cat_data["objects"]),
            engine=random.choice(cat_data["engines"]),
            technical=random.choice(cat_data["technical"]),
            secret_sauce=random.choice(cat_data["secret_sauce"])
        )
        library.append(f"{i+1}. {prompt}\n")
    
    return library

if __name__ == "__main__":
    prompts = generate_library(550) # Extra for buffer
    output_path = r"C:\Users\lyan1\.gemini\antigravity\brain\1223015d-9d35-4729-b351-23d8da59fe8b\master_prompt_reference.md"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("# ⚡ MASTER SVG ANIMATION PROMPT LIBRARY ⚡\n\n")
        f.write("## 500+ INSANE AI PROMPTS FOR HIGH-END MOTION GRAPHICS\n\n")
        f.write("> [!IMPORTANT]\n")
        f.write("> These prompts are architected based on NotebookLM research to leverage advanced AI models (Gemini 3.1 Pro) and SVG Studio capabilities.\n\n")
        f.writelines(prompts)
        
    print(f"Generated {len(prompts)} prompts to {output_path}")
