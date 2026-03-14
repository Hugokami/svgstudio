const fs = require('fs');

let html = fs.readFileSync('svgviewer.html', 'utf8');

// 1. Add options to animType
const newOptions = `
                                    <optgroup label="Cinematic & Titles">
                                        <option value="stranger-things">NEON SPLIT (STRANGER THINGS)</option>
                                        <option value="god-rays">VOLUMETRIC LIGHT SWEEP</option>
                                        <option value="lens-flare">LENS FLARE REVEAL</option>
                                    </optgroup>
                                    <optgroup label="Path & Geometry">
                                        <option value="shatter">SHATTER & REASSEMBLE</option>
                                        <option value="blob-morph">ORGANIC BLOB MORPH</option>
                                        <option value="blueprint">BLUEPRINT RENDER</option>
                                    </optgroup>
                                    <optgroup label="Particle & Filter FX">
                                        <option value="thanos-snap">DISSOLVE TO ASH</option>
                                        <option value="quantum-tunnel">QUANTUM TUNNELING</option>
                                        <option value="cyber-glitch">GLITCH DISPLACE</option>
                                    </optgroup>
                                    <optgroup label="Premium UI">
                                        <option value="glass-pulse">GLASSMORPHISM PULSE</option>
                                        <option value="holo-foil">HOLOGRAPHIC FOIL</option>
                                        <option value="mesh-gradient">MORPHING MESH GRADIENT</option>
                                    </optgroup>
`;

html = html.replace(/(<select id="animType"[\s\S]*?>)/, `$1\n${newOptions}`);
fs.writeFileSync('svgviewer.html', html);
