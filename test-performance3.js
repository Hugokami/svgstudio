const fs = require('fs');
const svgCode = fs.readFileSync('svgviewer.html', 'utf-8');

function formatXML(xml) {
    let formatted = '', pad = 0;
    xml = xml.replace(/(>)\s*(<)/g, '$1\n$2');
    xml.split('\n').forEach(node => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) indent = 0;
        else if (node.match(/^<\/\w/)) { if (pad !== 0) pad -= 1; }
        else if (node.match(/^<\w[^>]*[^\/]>.*$/)) indent = 1;
        else indent = 0;
        formatted += '  '.repeat(pad) + node + '\n';
        pad += indent;
    });
    return formatted.trim();
}

const start = performance.now();
for (let i = 0; i < 50; i++) {
    formatXML(svgCode);
}
const end = performance.now();
console.log(`Format time: ${end - start} ms`);
