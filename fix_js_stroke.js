const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf-8');

// I need to hook up these new UI elements to update the SVG and add keyframes.
// Looking at how stroke/fill are hooked up in js/app.js

const newLogic = `
        // STR0KE ENHANCEMENTS UI
        const ecpStrokeDash = document.getElementById('ecpStrokeDash');
        const ecpStrokeOffset = document.getElementById('ecpStrokeOffset');
        const ecpStrokeLinecap = document.getElementById('ecpStrokeLinecap');
        const ecpStrokeLinejoin = document.getElementById('ecpStrokeLinejoin');

        if (ecpStrokeDash) {
            ecpStrokeDash.addEventListener('input', (e) => {
                if (!selectedElement) return;
                const val = e.target.value;
                selectedElement.setAttribute('stroke-dasharray', val || 'none');
                addKeyframe('stroke-dasharray', val);
            });
        }
        if (ecpStrokeOffset) {
            ecpStrokeOffset.addEventListener('input', (e) => {
                if (!selectedElement) return;
                const val = e.target.value;
                selectedElement.setAttribute('stroke-dashoffset', val || '0');
                addKeyframe('stroke-dashoffset', val);
            });
        }
        if (ecpStrokeLinecap) {
            ecpStrokeLinecap.addEventListener('change', (e) => {
                if (!selectedElement) return;
                const val = e.target.value;
                selectedElement.setAttribute('stroke-linecap', val);
                addKeyframe('stroke-linecap', val);
            });
        }
        if (ecpStrokeLinejoin) {
            ecpStrokeLinejoin.addEventListener('change', (e) => {
                if (!selectedElement) return;
                const val = e.target.value;
                selectedElement.setAttribute('stroke-linejoin', val);
                addKeyframe('stroke-linejoin', val);
            });
        }
`;

// Also, update the UI when selecting an element
const selectLogicHook = `
            if (ecpStrokeDash) {
                const sDash = selectedElement.getAttribute('stroke-dasharray');
                ecpStrokeDash.value = (sDash && sDash !== 'none') ? sDash : '';
            }
            if (ecpStrokeOffset) {
                const sOffset = selectedElement.getAttribute('stroke-dashoffset');
                ecpStrokeOffset.value = sOffset || '0';
            }
            if (ecpStrokeLinecap) {
                const sLinecap = selectedElement.getAttribute('stroke-linecap');
                ecpStrokeLinecap.value = sLinecap || 'butt';
            }
            if (ecpStrokeLinejoin) {
                const sLinejoin = selectedElement.getAttribute('stroke-linejoin');
                ecpStrokeLinejoin.value = sLinejoin || 'miter';
            }
`;

// We inject the new Logic anywhere global/near bottom
js += '\n' + newLogic;

// We need to inject selectLogicHook inside function selectElement(el)
// Let's find ecpStrokeWidth.value =
const swIdx = js.indexOf('ecpStrokeWidth.value = parseFloat(selectedElement.getAttribute(\'stroke-width\')');
if (swIdx !== -1) {
    let nextBrIdx = js.indexOf('\n', swIdx);
    js = js.slice(0, nextBrIdx) + '\n' + selectLogicHook + js.slice(nextBrIdx);
    console.log("Injected stroke selection logic.");
} else {
    console.log("Could not find selectElement stroke-width line");
}

fs.writeFileSync('js/app.js', js);
