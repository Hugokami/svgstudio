const fs = require('fs');
const svgCode = fs.readFileSync('svgviewer.html', 'utf-8');

function formatXMLRegexOpt(xml) {
    let pad = 0;

    // Split the string securely
    const nodes = xml.replace(/(>)\s*(<)/g, '$1\n$2').split('\n');

    // Pre-allocate a reasonable array for the result
    const out = [];

    // Cache regexes to avoid recompiling
    const rx1 = /.+<\/\w[^>]*>$/;
    const rx2 = /^<\/\w/;
    const rx3 = /^<\w[^>]*[^\/]>.*$/;

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let indent = 0;
        if (rx1.test(node)) {
            indent = 0;
        } else if (rx2.test(node)) {
            if (pad !== 0) pad -= 1;
        } else if (rx3.test(node)) {
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
    formatXMLRegexOpt(svgCode);
}
const end = performance.now();
console.log(`FormatRegexOpt time: ${end - start} ms`);
