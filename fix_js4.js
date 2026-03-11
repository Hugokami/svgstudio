const fs = require('fs');

const globalJsxLogic = `
// Expose it globally so we can just call it from HTML
window.openReactExportModal = function() {
    console.log("Opening React Modal!");
    const svgWrapper = document.getElementById('svgTransformWrapper');
    if (!svgWrapper) { console.error("No svg wrapper found"); return; }
    const svgElement = svgWrapper.querySelector('svg');
    if (!svgElement) { console.error("No svg element found"); return; }

    const clone = svgElement.cloneNode(true);
    clone.querySelectorAll('[data-id], .selectable-element').forEach(el => {
        el.removeAttribute('data-id');
        el.classList.remove('selectable-element', 'selected');
    });

    // In our app, animations is a global variable
    let animData = [];
    if (typeof animations !== 'undefined') {
        animData = animations;
    } else if (typeof window.animations !== 'undefined') {
        animData = window.animations;
    }

    const timelineData = animData.map(anim => {
        let propsCopy = { ...anim.props, duration: anim.duration || 1 };
        if (anim.ease) propsCopy.ease = anim.ease;
        return {
            elementId: anim.elementId || anim.selector,
            type: anim.type || 'to',
            props: propsCopy,
            startTime: anim.startTime || 0
        };
    });

    let svgString = clone.outerHTML;
    svgString = svgString.replace(/ ([a-z]+)-([a-z]+)=/g, (match, p1, p2) => \` \${p1}\${p2.charAt(0).toUpperCase() + p2.slice(1)}=\`);
    svgString = svgString.replace(/ class=/g, ' className=');

    // Standard problematic SVG attrs
    const fixAttrs = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'stroke-dasharray', 'stroke-dashoffset'];
    fixAttrs.forEach(attr => {
        const camel = attr.split('-')[0] + attr.split('-')[1].charAt(0).toUpperCase() + attr.split('-')[1].slice(1);
        svgString = svgString.replace(new RegExp(\` \${attr}=\`, 'g'), \` \${camel}=\`);
    });

    const componentName = 'AnimatedSVG';
    let jsxComponent = \`import React, { useEffect, useRef } from 'react';\\nimport gsap from 'gsap';\\n\\nexport const \${componentName} = () => {\\n  const svgRef = useRef(null);\\n\\n  useEffect(() => {\\n    const ctx = gsap.context(() => {\\n      const tl = gsap.timeline();\\n\`;

    timelineData.forEach(anim => {
        const selector = anim.elementId ? \`#\${anim.elementId}\` : '';
        if (!selector) return;
        let propsString = JSON.stringify(anim.props).replace(/"([^"]+)":/g, '$1:');
        jsxComponent += \`      tl.to('\${selector}', \${propsString}, \${anim.startTime});\\n\`;
    });

    jsxComponent += \`    }, svgRef);\\n\\n    return () => ctx.revert();\\n  }, []);\\n\\n  return (\\n    <div ref={svgRef}>\\n      \${svgString}\\n    </div>\\n  );\\n};\\n\`;

    const modal = document.createElement('div');
    modal.innerHTML = \`<div style="position:fixed;top:10%;left:10%;width:80%;height:80%;background:#1a1a24;z-index:9999;border:1px solid #E5FF00;padding:20px;display:flex;flex-direction:column;box-shadow:0 0 20px rgba(0,0,0,0.8);">
        <h3 style="color:#E5FF00;margin:0 0 10px 0;font-family:monospace;font-size:18px;">React JSX Component</h3>
        <button id="closeJsxBtn" style="position:absolute;right:15px;top:15px;background:transparent;color:#fff;border:none;cursor:pointer;font-size:20px;">×</button>
        <textarea id="jsxTextArea" style="flex:1;width:100%;background:#0f0f15;color:#00ffcc;font-family:monospace;padding:15px;border:1px solid #333;outline:none;resize:none;margin-bottom:15px;">\${jsxComponent}</textarea>
        <button id="copyJsxBtn" style="padding:12px;background:#E5FF00;color:#000;border:none;cursor:pointer;font-weight:bold;font-family:monospace;text-transform:uppercase;">Copy to Clipboard</button>
    </div>\`;

    document.body.appendChild(modal);
    document.getElementById('closeJsxBtn').onclick = () => modal.remove();
    document.getElementById('copyJsxBtn').onclick = (e) => {
        navigator.clipboard.writeText(document.getElementById('jsxTextArea').value);
        e.target.textContent = 'COPIED!';
        setTimeout(() => e.target.textContent = 'COPY TO CLIPBOARD', 2000);
    };
};
`;

let js = fs.readFileSync('js/app.js', 'utf-8');
fs.writeFileSync('js/app.js', js + '\n' + globalJsxLogic);

let html = fs.readFileSync('svgviewer.html', 'utf-8');

const jsxButtonHTML = `
<button class="tooltip p-1.5 text-muted hover:text-[#61DAFB] transition-colors" id="exportReactBtn" onclick="window.openReactExportModal()"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
</path>
</svg><span class="tooltip-text">Export React JSX</span></button>
`;
html = html.replace('</svg><span class="tooltip-text">Export GIF (Loop)</span></button>', '</svg><span class="tooltip-text">Export GIF (Loop)</span></button>\n' + jsxButtonHTML);

fs.writeFileSync('svgviewer.html', html);
