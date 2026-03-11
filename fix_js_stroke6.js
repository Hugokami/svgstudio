const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf-8');

// There are duplicate const declarations for ecpStrokeDash inside the same block because
// I accidentally appended my snippets multiple times or there was overlap

js = js.replace('const ecpStrokeDash = document.getElementById(\'ecpStrokeDash\');\n            const ecpStrokeOffset = document.getElementById(\'ecpStrokeOffset\');\n            const ecpStrokeLinecap = document.getElementById(\'ecpStrokeLinecap\');\n            const ecpStrokeLinejoin = document.getElementById(\'ecpStrokeLinejoin\');', '');

js = js.replace('const ecpStrokeDash = document.getElementById(\'ecpStrokeDash\');\n        const ecpStrokeOffset = document.getElementById(\'ecpStrokeOffset\');\n        const ecpStrokeLinecap = document.getElementById(\'ecpStrokeLinecap\');\n        const ecpStrokeLinejoin = document.getElementById(\'ecpStrokeLinejoin\');', '');

js = js.replace('const ecpStrokeDash = document.getElementById(\'ecpStrokeDash\');\n        const ecpStrokeOffset = document.getElementById(\'ecpStrokeOffset\');\n        const ecpStrokeLinecap = document.getElementById(\'ecpStrokeLinecap\');\n        const ecpStrokeLinejoin = document.getElementById(\'ecpStrokeLinejoin\');', '');

// Just change `const` to `let` or remove the declarations from my injected block
// Wait, actually I just need ONE declaration at the top level
const globalDeclarations = `
        const ecpStrokeDash = document.getElementById('ecpStrokeDash');
        const ecpStrokeOffset = document.getElementById('ecpStrokeOffset');
        const ecpStrokeLinecap = document.getElementById('ecpStrokeLinecap');
        const ecpStrokeLinejoin = document.getElementById('ecpStrokeLinejoin');
`;

js = js.replace(/const ecpStrokeDash = document.getElementById\('ecpStrokeDash'\);/g, '');
js = js.replace(/const ecpStrokeOffset = document.getElementById\('ecpStrokeOffset'\);/g, '');
js = js.replace(/const ecpStrokeLinecap = document.getElementById\('ecpStrokeLinecap'\);/g, '');
js = js.replace(/const ecpStrokeLinejoin = document.getElementById\('ecpStrokeLinejoin'\);/g, '');

const injectIdx = js.indexOf('const ecpStrokeWidth = document.getElementById(\'ecpStrokeWidth\');');
if (injectIdx !== -1) {
    let nextBrIdx = js.indexOf('\n', injectIdx);
    js = js.slice(0, nextBrIdx) + '\n' + globalDeclarations + js.slice(nextBrIdx);
}

fs.writeFileSync('js/app.js', js);
console.log("Fixed redeclaration errors");
