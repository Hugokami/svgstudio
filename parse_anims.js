const fs = require('fs');

const html = fs.readFileSync('svgviewer.html', 'utf8');

const regex = /switch\s*\(\s*type\s*\)\s*\{/;
const match = regex.exec(html);

if (match) {
    console.log("Found Switch!");
} else {
    // maybe it uses if-else?
    console.log("No switch");
    const idx = html.indexOf("if (type === '");
    if (idx !== -1) {
        console.log("Found if-else block!");
    } else {
        console.log("Neither found.");
    }
}
