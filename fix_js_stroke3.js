const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf-8');

const selectLogicHook = `
            const ecpStrokeDash = document.getElementById('ecpStrokeDash');
            const ecpStrokeOffset = document.getElementById('ecpStrokeOffset');
            const ecpStrokeLinecap = document.getElementById('ecpStrokeLinecap');
            const ecpStrokeLinejoin = document.getElementById('ecpStrokeLinejoin');
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

// Find where updateECP gets stroke-width
const swIdx = js.indexOf('if (sw === null) ecpStrokeWidth.placeholder = \'MIX\'; else ecpStrokeWidth.placeholder = \'\';');
if (swIdx !== -1) {
    let nextBrIdx = js.indexOf('\n', swIdx);
    js = js.slice(0, nextBrIdx) + '\n' + selectLogicHook + js.slice(nextBrIdx);
    console.log("Injected stroke selection logic into updateECP.");
}

fs.writeFileSync('js/app.js', js);
