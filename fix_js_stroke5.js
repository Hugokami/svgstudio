const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf-8');

const badCode = `
            if (ecpStrokeDash) {
                const sDash = getCommonAttr('stroke-dasharray');
                ecpStrokeDash.value = (sDash && sDash !== 'none') ? sDash : '';
            }
            if (ecpStrokeOffset) {
                const sOffset = getCommonAttr('stroke-dashoffset');
                ecpStrokeOffset.value = sOffset || '0';
            }
            if (ecpStrokeLinecap) {
                const sLinecap = getCommonAttr('stroke-linecap');
                ecpStrokeLinecap.value = sLinecap || 'butt';
            }
            if (ecpStrokeLinejoin) {
                const sLinejoin = getCommonAttr('stroke-linejoin');
                ecpStrokeLinejoin.value = sLinejoin || 'miter';
            }
`;

const goodCode = `
            const getAttr = (attr) => {
                const val = firstEl.getAttribute(attr);
                if (!isMulti) return val;
                const allSame = selectedElements.every(el => el.getAttribute(attr) === val);
                return allSame ? val : null;
            };

            if (ecpStrokeDash) {
                const sDash = getAttr('stroke-dasharray');
                ecpStrokeDash.value = (sDash && sDash !== 'none') ? sDash : '';
                ecpStrokeDash.placeholder = sDash === null ? 'MIX' : 'e.g. 5,5';
            }
            if (ecpStrokeOffset) {
                const sOffset = getAttr('stroke-dashoffset');
                ecpStrokeOffset.value = sOffset || '0';
                ecpStrokeOffset.placeholder = sOffset === null ? 'MIX' : '0';
            }
            if (ecpStrokeLinecap) {
                const sLinecap = getAttr('stroke-linecap');
                ecpStrokeLinecap.value = sLinecap || 'butt';
            }
            if (ecpStrokeLinejoin) {
                const sLinejoin = getAttr('stroke-linejoin');
                ecpStrokeLinejoin.value = sLinejoin || 'miter';
            }
`;

if (js.includes(badCode.trim())) {
    js = js.replace(badCode.trim(), goodCode.trim());
    fs.writeFileSync('js/app.js', js);
    console.log("Fixed stroke attribute selection logic!");
} else {
    console.log("Could not find bad code.");
}
