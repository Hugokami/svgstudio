const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf-8');

const selectLogicHook = `
            const ecpStrokeDash = document.getElementById('ecpStrokeDash');
            const ecpStrokeOffset = document.getElementById('ecpStrokeOffset');
            const ecpStrokeLinecap = document.getElementById('ecpStrokeLinecap');
            const ecpStrokeLinejoin = document.getElementById('ecpStrokeLinejoin');
            if (ecpStrokeDash) {
                const sDash = firstEl.getAttribute('stroke-dasharray');
                ecpStrokeDash.value = (sDash && sDash !== 'none') ? sDash : '';
            }
            if (ecpStrokeOffset) {
                const sOffset = firstEl.getAttribute('stroke-dashoffset');
                ecpStrokeOffset.value = sOffset || '0';
            }
            if (ecpStrokeLinecap) {
                const sLinecap = firstEl.getAttribute('stroke-linecap');
                ecpStrokeLinecap.value = sLinecap || 'butt';
            }
            if (ecpStrokeLinejoin) {
                const sLinejoin = firstEl.getAttribute('stroke-linejoin');
                ecpStrokeLinejoin.value = sLinejoin || 'miter';
            }
`;

const swIdx = js.indexOf('if (sw === null) ecpStrokeWidth.placeholder = \'MIX\'; else ecpStrokeWidth.placeholder = \'\';');
if (swIdx !== -1) {
    let nextBrIdx = js.indexOf('\n', swIdx);
    js = js.slice(0, nextBrIdx) + '\n' + selectLogicHook + js.slice(nextBrIdx);
    console.log("Injected stroke selection logic.");
}

const eventLogicHook = `
        const ecpStrokeDash = document.getElementById('ecpStrokeDash');
        const ecpStrokeOffset = document.getElementById('ecpStrokeOffset');
        const ecpStrokeLinecap = document.getElementById('ecpStrokeLinecap');
        const ecpStrokeLinejoin = document.getElementById('ecpStrokeLinejoin');

        if (ecpStrokeDash) {
            ecpStrokeDash.addEventListener('input', (e) => {
                if (selectedElements.length === 0) return;
                const val = e.target.value;
                selectedElements.forEach(el => el.setAttribute('stroke-dasharray', val || 'none'));
                updateEditorFromPreview();
            });
        }
        if (ecpStrokeOffset) {
            ecpStrokeOffset.addEventListener('input', (e) => {
                if (selectedElements.length === 0) return;
                const val = e.target.value;
                selectedElements.forEach(el => el.setAttribute('stroke-dashoffset', val || '0'));
                updateEditorFromPreview();
            });
        }
        if (ecpStrokeLinecap) {
            ecpStrokeLinecap.addEventListener('change', (e) => {
                if (selectedElements.length === 0) return;
                const val = e.target.value;
                selectedElements.forEach(el => el.setAttribute('stroke-linecap', val));
                updateEditorFromPreview();
            });
        }
        if (ecpStrokeLinejoin) {
            ecpStrokeLinejoin.addEventListener('change', (e) => {
                if (selectedElements.length === 0) return;
                const val = e.target.value;
                selectedElements.forEach(el => el.setAttribute('stroke-linejoin', val));
                updateEditorFromPreview();
            });
        }
`;

const evtIdx = js.indexOf('ecpStrokeWidth.addEventListener(\'change\', () => {');
if (evtIdx !== -1) {
    js = js.slice(0, evtIdx) + eventLogicHook + '\n' + js.slice(evtIdx);
    console.log("Injected stroke event listeners.");
}

fs.writeFileSync('js/app.js', js);
