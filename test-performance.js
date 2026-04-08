const fs = require('fs');

const svgCode = fs.readFileSync('./js/app.js', 'utf8');

function extractColors(svgString) {
    // Match hex and rgb/rgba
    const regex = /#([0-9a-fA-F]{3}){1,2}\b|rgba?\([^)]+\)/g;
    const matches = svgString.match(regex);
    if (!matches) return [];
    return [...new Set(matches)]; // Unique colors
}

const start = performance.now();
for(let i=0; i<100; i++) {
    extractColors(svgCode);
}
const end = performance.now();
console.log(`Original: ${end - start} ms`);
