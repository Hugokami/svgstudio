const fs = require('fs');

const html = fs.readFileSync('svgviewer.html', 'utf8');

const regex = /switch\s*\(\s*type\s*\)\s*\{/g;
const match = regex.exec(html);

if (match) {
    console.log("Found switch block start.");
    const blockEnd = html.indexOf('}', match.index);
    console.log(html.substring(match.index, blockEnd + 100));
} else {
    console.log("Switch block not found.");
}
