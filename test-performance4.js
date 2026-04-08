const fs = require('fs');
const svgCode = fs.readFileSync('svgviewer.html', 'utf-8');

function formatXMLOpt(xml) {
    let formatted = '';
    let pad = 0;

    // Split the string securely
    const nodes = xml.replace(/(>)\s*(<)/g, '$1\n$2').split('\n');

    // Avoid costly regex and string recreation if possible
    // the regex test could be optimized, or string concatenation mapped

    // Pre-allocate a reasonable array for the result
    const out = [];

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) pad -= 1;
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        let padding = '';
        for (let j = 0; j < pad; j++) padding += '  ';
        out.push(padding + node);
        pad += indent;
    }

    return out.join('\n').trim();
}

const start = performance.now();
for (let i = 0; i < 50; i++) {
    formatXMLOpt(svgCode);
}
const end = performance.now();
console.log(`FormatOpt time: ${end - start} ms`);
