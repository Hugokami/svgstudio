const fs = require('fs');

const svgCode = fs.readFileSync('./js/app.js', 'utf8');

function extractColorsOpt(svgString) {
    // Match hex and rgb/rgba
    const regex = /#([0-9a-fA-F]{3}){1,2}\b|rgba?\([^)]+\)/g;
    let match;
    const colors = new Set();
    while ((match = regex.exec(svgString)) !== null) {
        colors.add(match[0]);
    }
    return [...colors];
}

const start = performance.now();
for(let i=0; i<100; i++) {
    extractColorsOpt(svgCode);
}
const end = performance.now();
console.log(`Optimized: ${end - start} ms`);
