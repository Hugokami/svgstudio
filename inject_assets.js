const fs = require('fs');
const path = require('path');

const generateAssets = () => {
    const assets = [];

    // Y2K Stars
    assets.push({ cat: 'y2k', name: '4-Point Star', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="2"><path d="M50 10 C50 40 60 50 90 50 C60 50 50 60 50 90 C50 60 40 50 10 50 C40 50 50 40 50 10 Z" fill="#E5FF00" opacity="0.2"/></svg>` });
    assets.push({ cat: 'y2k', name: '8-Point Star', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><path d="M50 5 L55 40 L90 45 L55 50 L50 85 L45 50 L10 45 L45 40 Z"/><path d="M50 20 L65 35 L80 20 L65 50 L80 80 L65 65 L50 80 L35 65 L20 80 L35 50 L20 20 L35 35 Z" opacity="0.5"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Hollow Star', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="3"><path d="M50 10 L58 42 L90 50 L58 58 L50 90 L42 58 L10 50 L42 42 Z"/><path d="M50 25 L54 46 L75 50 L54 54 L50 75 L46 54 L25 50 L46 46 Z" stroke-width="1"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Spike Ring', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="2"><circle cx="50" cy="50" r="30"/><path d="M50 5 L50 20 M95 50 L80 50 M50 95 L50 80 M5 50 L20 50 M80 20 L70 30 M20 80 L30 70 M20 20 L30 30 M80 80 L70 70" stroke-width="4"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Y2K Sparkle', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><path d="M50 0 C50 40 60 50 100 50 C60 50 50 60 50 100 C50 60 40 50 0 50 C40 50 50 40 50 0 Z"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Chrome Drop', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="2"><path d="M50 10 C80 50 80 80 50 90 C20 80 20 50 50 10 Z"/><circle cx="60" cy="65" r="5" fill="#E5FF00"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Tribal Flame', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><path d="M50 90 C20 70 30 30 50 10 C60 40 80 60 50 90 Z"/><path d="M50 80 C35 65 40 40 50 25 C55 45 65 55 50 80 Z" fill="#050505"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Tribal Wing', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><path d="M10 50 Q40 20 90 10 Q60 40 80 60 Q50 50 50 90 Q30 60 10 50 Z"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Symmetrical Tribal', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><path d="M50 10 Q70 40 90 50 Q70 60 50 90 Q30 60 10 50 Q30 40 50 10 Z M50 30 Q60 45 70 50 Q60 55 50 70 Q40 55 30 50 Q40 45 50 30 Z" fill-rule="evenodd"/></svg>` });
    assets.push({ cat: 'y2k', name: 'Orbiting Ellipses', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="1.5"><ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(30 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(-30 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(90 50 50)"/></svg>` });

    // Cyber
    assets.push({ cat: 'cyber', name: 'Targeting HUD', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1.5"><circle cx="50" cy="50" r="40" stroke-dasharray="8 4" opacity="0.6"/><circle cx="50" cy="50" r="30" /><path d="M50 0 V20 M50 80 V100 M0 50 H20 M80 50 H100" stroke-width="3"/><circle cx="50" cy="50" r="3" fill="#E5FF00"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Sniper Scope', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1"><circle cx="50" cy="50" r="45"/><circle cx="50" cy="50" r="25"/><line x1="0" y1="50" x2="100" y2="50" opacity="0.5"/><line x1="50" y1="0" x2="50" y2="100" opacity="0.5"/><rect x="45" y="45" width="10" height="10" stroke-width="2"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Radar Sweep', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none"><circle cx="50" cy="50" r="40" stroke-width="1" stroke-dasharray="2 2" /><path d="M50 50 L90 10" stroke-width="2" opacity="0.8"/><circle cx="50" cy="50" r="10" fill="#E5FF00" opacity="0.3"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Hexagon Grid', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1"><polygon points="50,15 80,30 80,70 50,85 20,70 20,30"/><polygon points="50,30 65,40 65,60 50,70 35,60 35,40" stroke-dasharray="2 2"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Cyber Eye', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="2"><path d="M10 50 Q50 10 90 50 Q50 90 10 50 Z"/><circle cx="50" cy="50" r="15"/><circle cx="50" cy="50" r="5" fill="#E5FF00"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Data Nodes', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1"><circle cx="20" cy="30" r="5"/><circle cx="80" cy="40" r="5"/><circle cx="40" cy="80" r="5"/><circle cx="60" cy="20" r="5"/><polyline points="20,30 60,20 80,40 40,80 20,30" stroke-dasharray="4 2"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Circuit Trace', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="2"><path d="M10 90 L30 90 L50 70 L50 30 L70 10 L90 10"/><circle cx="10" cy="90" r="3" fill="#E5FF00"/><circle cx="90" cy="10" r="3" fill="#E5FF00"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Tech Triangle', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="2"><polygon points="50,15 90,80 10,80"/><polygon points="50,30 75,70 25,70" stroke-dasharray="3 3"/><line x1="50" y1="15" x2="50" y2="30"/><line x1="90" y1="80" x2="75" y2="70"/><line x1="10" y1="80" x2="25" y2="70"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Digital Sun', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="2"><circle cx="50" cy="50" r="20"/><path d="M50 10 L50 25 M50 75 L50 90 M10 50 L25 50 M75 50 L90 50 M20 20 L32 32 M78 78 L68 68 M80 20 L68 32 M20 80 L32 68" stroke-dasharray="1 3"/></svg>` });
    assets.push({ cat: 'cyber', name: 'Core Processor', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="2"><rect x="30" y="30" width="40" height="40"/><rect x="40" y="40" width="20" height="20" fill="#E5FF00" opacity="0.3"/><line x1="10" y1="50" x2="30" y2="50"/><line x1="70" y1="50" x2="90" y2="50"/><line x1="50" y1="10" x2="50" y2="30"/><line x1="50" y1="70" x2="50" y2="90"/></svg>` });

    // UI / HUD
    assets.push({ cat: 'ui', name: 'Tech Barcode', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="#E5FF00"><rect x="10" y="10" width="4" height="30" /><rect x="18" y="10" width="2" height="30" /><rect x="24" y="10" width="8" height="30" /><rect x="36" y="10" width="2" height="30" /><rect x="42" y="10" width="6" height="30" /><rect x="52" y="10" width="4" height="30" /><rect x="60" y="10" width="12" height="30" /><rect x="76" y="10" width="2" height="30" /><rect x="82" y="10" width="8" height="30" /></svg>` });
    assets.push({ cat: 'ui', name: 'Loading Ring 1', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="4"><circle cx="50" cy="50" r="40" stroke-dasharray="60 190" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"/></circle><circle cx="50" cy="50" r="40" stroke-opacity="0.2"/></svg>` });
    assets.push({ cat: 'ui', name: 'Loading Ring 2', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="3"><circle cx="50" cy="50" r="40" stroke-dasharray="10 10"><animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="4s" repeatCount="indefinite"/></circle><circle cx="50" cy="50" r="30" stroke-dasharray="50 100"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"/></circle></svg>` });
    assets.push({ cat: 'ui', name: 'Battery Status', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="2"><rect x="20" y="30" width="50" height="40" rx="3"/><path d="M70 40 L75 40 Q80 40 80 45 L80 55 Q80 60 75 60 L70 60"/><rect x="25" y="35" width="10" height="30" fill="#E5FF00"/><rect x="40" y="35" width="10" height="30" fill="#E5FF00"/><rect x="55" y="35" width="10" height="30" fill="#E5FF00" opacity="0.3"/></svg>` });
    assets.push({ cat: 'ui', name: 'Warning Sign', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="3"><polygon points="50,15 90,85 10,85"/><line x1="50" y1="40" x2="50" y2="65"/><circle cx="50" cy="75" r="2" fill="#E5FF00"/></svg>` });
    assets.push({ cat: 'ui', name: 'Signal Bars', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><rect x="20" y="70" width="10" height="15"/><rect x="40" y="50" width="10" height="35"/><rect x="60" y="30" width="10" height="55"/><rect x="80" y="10" width="10" height="75" opacity="0.3"/></svg>` });
    assets.push({ cat: 'ui', name: 'Audio Wave', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="4" stroke-linecap="round"><line x1="20" y1="40" x2="20" y2="60"/><line x1="35" y1="20" x2="35" y2="80"/><line x1="50" y1="10" x2="50" y2="90"/><line x1="65" y1="30" x2="65" y2="70"/><line x1="80" y1="45" x2="80" y2="55"/></svg>` });
    assets.push({ cat: 'ui', name: 'Crosshair Box', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="2"><rect x="30" y="30" width="40" height="40"/><path d="M10 20 L20 20 L20 10 M80 10 L80 20 L90 20 M90 80 L80 80 L80 90 M20 90 L20 80 L10 80"/></svg>` });
    assets.push({ cat: 'ui', name: 'Grid Overlay', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="0.5" opacity="0.5"><path d="M0 20 H100 M0 40 H100 M0 60 H100 M0 80 H100 M20 0 V100 M40 0 V100 M60 0 V100 M80 0 V100"/></svg>` });
    assets.push({ cat: 'ui', name: 'Glitch Blocks', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><rect x="10" y="20" width="30" height="10"/><rect x="60" y="30" width="20" height="5"/><rect x="25" y="60" width="45" height="15" opacity="0.6"/><rect x="15" y="80" width="15" height="8"/><rect x="70" y="70" width="25" height="12" opacity="0.3"/></svg>` });

    // Abstract
    assets.push({ cat: 'abstract', name: 'Wireframe Box', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" stroke-width="1" fill="none"><path d="M20,30 L80,30 L80,90 L20,90 Z" opacity="0.5"/><path d="M30,20 L90,20 L90,80 L30,80 Z"/><path d="M20,30 L30,20 M80,30 L90,20 M80,90 L90,80 M20,90 L30,80"/></svg>` });
    assets.push({ cat: 'abstract', name: 'Wireframe Globe', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1"><circle cx="50" cy="50" r="40"/><ellipse cx="50" cy="50" rx="40" ry="15"/><ellipse cx="50" cy="50" rx="15" ry="40"/></svg>` });
    assets.push({ cat: 'abstract', name: 'Liquid Blob', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="2"><path d="M 50 15 C 80 15 90 40 85 65 C 80 90 50 95 25 80 C 0 65 20 15 50 15 Z"><animate attributeName="d" values="M 50 15 C 80 15 90 40 85 65 C 80 90 50 95 25 80 C 0 65 20 15 50 15 Z; M 50 20 C 75 10 95 50 80 75 C 65 100 35 90 15 70 C -5 50 25 30 50 20 Z; M 50 15 C 80 15 90 40 85 65 C 80 90 50 95 25 80 C 0 65 20 15 50 15 Z" dur="4s" repeatCount="indefinite"/></path></svg>` });
    assets.push({ cat: 'abstract', name: 'Topographic Lines', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1"><path d="M10 20 Q30 40 50 20 T90 20"/><path d="M10 40 Q30 60 50 40 T90 40"/><path d="M10 60 Q30 80 50 60 T90 60"/><path d="M10 80 Q30 100 50 80 T90 80"/></svg>` });
    assets.push({ cat: 'abstract', name: 'Metatron Cube', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="20" r="10"/><circle cx="24" cy="35" r="10"/><circle cx="24" cy="65" r="10"/><circle cx="50" cy="80" r="10"/><circle cx="76" cy="65" r="10"/><circle cx="76" cy="35" r="10"/><line x1="50" y1="20" x2="24" y2="35"/><line x1="24" y1="35" x2="24" y2="65"/><line x1="24" y1="65" x2="50" y2="80"/><line x1="50" y1="80" x2="76" y2="65"/><line x1="76" y1="65" x2="76" y2="35"/><line x1="76" y1="35" x2="50" y2="20"/></svg>` });
    assets.push({ cat: 'abstract', name: 'Geometric Pattern', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="1.5"><rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)"/><rect x="35" y="35" width="30" height="30" transform="rotate(45 50 50)"/><rect x="45" y="45" width="10" height="10" transform="rotate(45 50 50)"/></svg>` });
    assets.push({ cat: 'abstract', name: 'Vortex', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="1.5"><path d="M50 50 L50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 15 A35 35 0 0 1 85 50 A35 35 0 0 1 50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 20"/></svg>` });
    assets.push({ cat: 'abstract', name: 'Optical Illusion', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#E5FF00"><polygon points="50,10 90,50 50,90 10,50" opacity="0.2"/><polygon points="50,20 80,50 50,80 20,50" opacity="0.4"/><polygon points="50,30 70,50 50,70 30,50" opacity="0.6"/><polygon points="50,40 60,50 50,60 40,50" opacity="0.8"/></svg>` });
    assets.push({ cat: 'abstract', name: 'DNA Helix', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#E5FF00" stroke-width="2"><path d="M30 10 Q70 30 30 50 Q70 70 30 90"/><path d="M70 10 Q30 30 70 50 Q30 70 70 90" stroke-dasharray="2 2"/><line x1="38" y1="20" x2="62" y2="20"/><line x1="50" y1="30" x2="50" y2="30"/><line x1="38" y1="40" x2="62" y2="40"/><line x1="38" y1="60" x2="62" y2="60"/><line x1="38" y1="80" x2="62" y2="80"/></svg>` });
    assets.push({ cat: 'abstract', name: 'Fractal Branch', code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#E5FF00" fill="none" stroke-width="1.5"><path d="M50 100 L50 60 L30 30 M50 60 L70 30 M30 30 L20 10 M30 30 L40 10 M70 30 L60 10 M70 30 L80 10"/></svg>` });


    return assets;
};

const assetsData = generateAssets();
const htmlFile = path.join(__dirname, 'svgviewer.html');
let html = fs.readFileSync(htmlFile, 'utf8');

// Regex to find the current array content
const regex = /(const y2kAssetsData = \[)([\s\S]*?)(\];)/;
const match = html.match(regex);

if (match) {
    const existingContent = match[2].trim();
    
    // We'll append the new assets to the existing ones.
    // To avoid duplicates, we can check names, but for now, simple append is safer than overwrite.
    // The existing content should end with a comma if we want to append nicely, 
    // or we can just create a new array string.
    
    let combinedAssets;
    try {
        // Try to parse existing content (this is brittle but might work if it's clean JSON-like)
        // Since it's JS, we might need a more robust way, but let's try to just append string-wise.
        const newAssetsJson = JSON.stringify(assetsData, null, 4).trim();
        // Remove the outer [ and ]
        const newAssetsContent = newAssetsJson.substring(1, newAssetsJson.length - 1).trim();
        
        let finalContent = existingContent;
        if (finalContent && !finalContent.endsWith(',')) {
            finalContent += ',';
        }
        finalContent += '\n' + newAssetsContent;
        
        const replacement = `${match[1]}\n${finalContent}\n${match[3]}`;
        html = html.replace(regex, mtch => replacement);
        fs.writeFileSync(htmlFile, html, 'utf8');
        console.log('Successfully merged new assets into svgviewer.html');
    } catch (e) {
        console.error('Error merging assets:', e);
        // Fallback or exit
    }
} else {
    console.error('Could not find y2kAssetsData array in svgviewer.html');
}
