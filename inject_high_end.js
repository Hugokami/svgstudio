const fs = require('fs');

let html = fs.readFileSync('svgviewer.html', 'utf8');

const newAnims = `
            } else if (type === 'stranger-things') {
                if (!svg.querySelector('#strangerGlow')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "strangerGlow");
                    filter.innerHTML = \`<feGaussianBlur stdDeviation="\${2 * intensity}" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge><feComponentTransfer><feFuncA type="linear" slope="\${1.5 * intensity}"/></feComponentTransfer>\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                if (!style.textContent.includes('@keyframes strangerFlicker')) style.textContent += \`\\n@keyframes strangerFlicker { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px red); } 30% { opacity: 0.8; filter: drop-shadow(0 0 20px red) contrast(150%); } 35% { opacity: 0.2; } 40% { opacity: 0.9; } 60% { filter: drop-shadow(0 0 5px red); } 65% { opacity: 0.4; } 70% { opacity: 1; } }\`;
                style.textContent += \`\\n.anim-stranger { animation: strangerFlicker \${duration}s ease-in-out infinite alternate; }\\n\`;
                applyClassToTargets('anim-stranger', el => el.setAttribute('filter', 'url(#strangerGlow)'));
            } else if (type === 'god-rays') {
                if (!svg.querySelector('#godRaysMask')) {
                    const defs = svg.querySelector('defs') || doc.createElementNS("http://www.w3.org/2000/svg", "defs");
                    if (!svg.querySelector('defs')) svg.insertBefore(defs, svg.firstChild);
                    defs.innerHTML += \`<linearGradient id="rayGrad" x1="-100%" y1="0%" x2="0%" y2="0%"><animate attributeName="x1" values="-100%;200%" dur="\${duration}s" repeatCount="indefinite"/><animate attributeName="x2" values="0%;300%" dur="\${duration}s" repeatCount="indefinite"/><stop offset="0%" stop-color="rgba(255,255,255,0)"/><stop offset="50%" stop-color="rgba(255,255,255,\${0.8 * intensity})"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></linearGradient><mask id="godRaysMask"><rect x="-100%" y="-100%" width="300%" height="300%" fill="url(#rayGrad)" transform="rotate(45)"/></mask>\`;
                }
                applyClassToTargets('', el => {
                    const clone = el.cloneNode(true);
                    clone.setAttribute('mask', 'url(#godRaysMask)');
                    clone.style.mixBlendMode = 'screen';
                    clone.removeAttribute('id');
                    clone.classList.remove('selected-element');
                    el.parentNode.insertBefore(clone, el.nextSibling);
                });
            } else if (type === 'lens-flare') {
                if (!svg.querySelector('#lensFlareFilter')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "lensFlareFilter");
                    filter.innerHTML = \`<feColorMatrix type="matrix" values="1 0 0 0 \${intensity}  0 1 0 0 \${intensity}  0 0 1 0 \${intensity}  0 0 0 1 0" result="bright"/><feGaussianBlur in="bright" stdDeviation="\${10 * intensity}" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                if (!style.textContent.includes('@keyframes opticFlash')) style.textContent += \`\\n@keyframes opticFlash { 0%, 100% { filter: brightness(1) drop-shadow(0 0 0px #fff); } 10% { filter: brightness(2) drop-shadow(0 0 \${20 * intensity}px #fff); } 20% { filter: brightness(1) drop-shadow(0 0 0px #fff); } }\`;
                style.textContent += \`\\n.anim-flare { animation: opticFlash \${duration}s cubic-bezier(0.1, 1, 0.1, 1) infinite; }\\n\`;
                applyClassToTargets('anim-flare', el => el.setAttribute('filter', 'url(#lensFlareFilter)'));
            } else if (type === 'shatter') {
                if (!svg.querySelector('#shatterFilter')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "shatterFilter");
                    filter.innerHTML = \`<feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="1" result="noise"/><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -20" in="noise" result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="\${40 * intensity}" xChannelSelector="R" yChannelSelector="G" result="shattered"><animate attributeName="scale" values="0; \${40 * intensity}; 0" dur="\${duration}s" repeatCount="indefinite" /></feDisplacementMap>\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                applyClassToTargets('', el => el.setAttribute('filter', 'url(#shatterFilter)'));
            } else if (type === 'blob-morph') {
                if (!svg.querySelector('#blobFilter')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "blobFilter");
                    filter.innerHTML = \`<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise"><animate attributeName="baseFrequency" values="0.05; 0.08; 0.05" dur="\${duration}s" repeatCount="indefinite" /></feTurbulence><feDisplacementMap in="SourceGraphic" in2="noise" scale="\${20 * intensity}" xChannelSelector="R" yChannelSelector="G" />\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                applyClassToTargets('', el => el.setAttribute('filter', 'url(#blobFilter)'));
            } else if (type === 'blueprint') {
                if (!svg.querySelector('#blueprintFilter')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "blueprintFilter");
                    filter.innerHTML = \`<feMorphology operator="dilate" radius="1" in="SourceGraphic" result="outline"/><feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.5  0 0 0 0 1  0 0 0 1 0" in="outline"/><feMerge><feMergeNode/></feMerge>\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                if (!style.textContent.includes('@keyframes blueprintSweep')) style.textContent += \`\\n@keyframes blueprintSweep { 0% { clip-path: inset(0 100% 0 0); } 50%, 100% { clip-path: inset(0 0 0 0); } }\`;
                style.textContent += \`\\n.anim-blueprint { animation: blueprintSweep \${duration}s ease-out infinite alternate; }\\n\`;
                applyClassToTargets('anim-blueprint', el => el.setAttribute('filter', 'url(#blueprintFilter)'));
            } else if (type === 'thanos-snap') {
                if (!svg.querySelector('#thanosFilter')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "thanosFilter");
                    filter.innerHTML = \`<feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"><animate attributeName="scale" values="0; \${100 * intensity}" dur="\${duration}s" repeatCount="indefinite" /></feDisplacementMap><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"><animate attributeName="values" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0; 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0" dur="\${duration}s" repeatCount="indefinite"/></feColorMatrix>\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                applyClassToTargets('', el => el.setAttribute('filter', 'url(#thanosFilter)'));
            } else if (type === 'quantum-tunnel') {
                if (!style.textContent.includes('@keyframes quantumStretch')) style.textContent += \`\\n@keyframes quantumStretch { 0%, 100% { transform: scaleX(1); filter: blur(0px); opacity: 1; } 50% { transform: scaleX(\${10 * intensity}); filter: blur(\${5 * intensity}px); opacity: 0.5; } }\`;
                style.textContent += \`\\n.anim-quantum { animation: quantumStretch \${duration}s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; transform-origin: center; transform-box: fill-box; }\\n\`;
                applyClassToTargets('anim-quantum');
            } else if (type === 'cyber-glitch') {
                if (!svg.querySelector('#cyberGlitchFilter')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "cyberGlitchFilter");
                    filter.innerHTML = \`<feTurbulence type="fractalNoise" baseFrequency="0.01 1.5" numOctaves="1" result="noise"><animate attributeName="baseFrequency" values="0.01 1.5; 0.1 2.5; 0.01 1.5" dur="\${duration}s" calcMode="discrete" repeatCount="indefinite"/></feTurbulence><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -5" in="noise" result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="\${30 * intensity}" xChannelSelector="R" yChannelSelector="G"/><feColorMatrix type="hueRotate" values="0"><animate attributeName="values" values="0; 90; -90; 180; 0" dur="\${duration}s" calcMode="discrete" repeatCount="indefinite"/></feColorMatrix>\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                applyClassToTargets('', el => el.setAttribute('filter', 'url(#cyberGlitchFilter)'));
            } else if (type === 'glass-pulse') {
                if (!svg.querySelector('#glassMask')) {
                    const defs = doc.createElementNS("http://www.w3.org/2000/svg", "defs");
                    defs.innerHTML = \`<linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%"><animate attributeName="x1" values="-100%; 200%" dur="\${duration}s" repeatCount="indefinite"/><animate attributeName="x2" values="0%; 300%" dur="\${duration}s" repeatCount="indefinite"/><stop offset="0%" stop-color="rgba(255,255,255,0)"/><stop offset="50%" stop-color="rgba(255,255,255,0.4)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></linearGradient><mask id="glassMask"><rect x="-100%" y="-100%" width="300%" height="300%" fill="url(#glassGrad)"/></mask>\`;
                    svg.insertBefore(defs, svg.firstChild);
                }
                applyClassToTargets('', el => {
                    const clone = el.cloneNode(true);
                    clone.setAttribute('mask', 'url(#glassMask)');
                    clone.style.mixBlendMode = 'overlay';
                    clone.removeAttribute('id');
                    clone.classList.remove('selected-element');
                    el.parentNode.insertBefore(clone, el.nextSibling);
                });
            } else if (type === 'holo-foil') {
                if (!svg.querySelector('#holoFoilGrad')) {
                    const defs = doc.createElementNS("http://www.w3.org/2000/svg", "defs");
                    defs.innerHTML = \`<linearGradient id="holoFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%"><animateTransform attributeName="gradientTransform" type="rotate" values="0 .5 .5; 360 .5 .5" dur="\${duration}s" repeatCount="indefinite"/><stop offset="0%" stop-color="#ff0080"/><stop offset="25%" stop-color="#ff8c00"/><stop offset="50%" stop-color="#40e0d0"/><stop offset="75%" stop-color="#8a2be2"/><stop offset="100%" stop-color="#ff0080"/></linearGradient>\`;
                    svg.insertBefore(defs, svg.firstChild);
                }
                applyClassToTargets('', el => el.setAttribute('fill', 'url(#holoFoilGrad)'));
            } else if (type === 'mesh-gradient') {
                if (!svg.querySelector('#meshGradDef')) {
                    const defs = doc.createElementNS("http://www.w3.org/2000/svg", "defs");
                    defs.innerHTML = \`<filter id="meshBlur"><feGaussianBlur stdDeviation="\${15 * intensity}"/></filter><linearGradient id="meshBase" x1="0" y1="0" x2="1" y2="1"><animate attributeName="x1" values="0;1;0" dur="\${duration}s" repeatCount="indefinite"/><stop offset="0%" stop-color="#ff512f"/><stop offset="100%" stop-color="#dd2476"/></linearGradient>\`;
                    svg.insertBefore(defs, svg.firstChild);
                }
                applyClassToTargets('', el => {
                    el.setAttribute('fill', 'url(#meshBase)');
                    el.setAttribute('filter', 'url(#meshBlur)');
                });
`;

html = html.replace(/            \} else if \(type === 'text-glitch'\) \{[\s\S]*?url\(\#textGlitchFilter\)'\)\);\n            \}/, `            } else if (type === 'text-glitch') {
                if (!svg.querySelector('#textGlitchFilter')) {
                    const filter = doc.createElementNS("http://www.w3.org/2000/svg", "filter");
                    filter.setAttribute("id", "textGlitchFilter");
                    filter.innerHTML = \`<feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="R" /><feOffset dx="-4" dy="0" in="R" result="oR"><animate attributeName="dx" values="-4;4;-2;6;-4" dur="\${duration}s" repeatCount="indefinite" calcMode="discrete"/></feOffset><feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="B" /><feOffset dx="4" dy="0" in="B" result="oB"><animate attributeName="dx" values="4;-4;2;-6;4" dur="\${duration}s" repeatCount="indefinite" calcMode="discrete"/></feOffset><feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="G" /><feMerge><feMergeNode in="oR"/><feMergeNode in="G"/><feMergeNode in="oB"/></feMerge>\`;
                    svg.insertBefore(filter, svg.firstChild);
                }
                applyClassToTargets('', el => el.setAttribute('filter', 'url(#textGlitchFilter)'));
${newAnims}            }`);

fs.writeFileSync('svgviewer.html', html);
