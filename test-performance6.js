const fs = require('fs');
const svgCode = fs.readFileSync('svgviewer.html', 'utf-8');

function formatXMLSuperOpt(xml) {
    let pad = 0;
    const nodes = xml.replace(/(>)\s*(<)/g, '$1\n$2').split('\n');
    const out = [];

    // Create a padding cache to avoid repeated string concatenation
    const padCache = [''];
    function getPad(n) {
        while (padCache.length <= n) {
            padCache.push(padCache[padCache.length - 1] + '  ');
        }
        return padCache[n];
    }

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
        }
        out.push(getPad(pad) + node);
        pad += indent;
    }

    return out.join('\n').trim();
}

const start = performance.now();
for (let i = 0; i < 50; i++) {
    formatXMLSuperOpt(svgCode);
}
const end = performance.now();
console.log(`FormatSuperOpt time: ${end - start} ms`);
