const fs = require('fs');

const svgCode = fs.readFileSync('svgviewer.html', 'utf-8');

function extractColors(svgString) {
    // Match hex and rgb/rgba
    const regex = /#([0-9a-fA-F]{3}){1,2}\b|rgba?\([^)]+\)/g;
    const matches = svgString.match(regex);
    if (!matches) return [];
    return [...new Set(matches)]; // Unique colors
}

function extractColorsOpt(svgString) {
    const colors = new Set();
    const regex = /#([0-9a-fA-F]{3}){1,2}\b|rgba?\([^)]+\)/g;
    let match;
    while ((match = regex.exec(svgString)) !== null) {
        colors.add(match[0]);
    }
    return [...colors];
}

const start1 = performance.now();
for (let i = 0; i < 1000; i++) {
    extractColors(svgCode);
}
const end1 = performance.now();
console.log(`Original extractColors: ${end1 - start1} ms`);

const start2 = performance.now();
for (let i = 0; i < 1000; i++) {
    extractColorsOpt(svgCode);
}
const end2 = performance.now();
console.log(`Optimized extractColors: ${end2 - start2} ms`);
