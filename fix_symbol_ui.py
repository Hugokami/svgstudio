import re

with open('svgviewer.html', 'r') as f:
    content = f.read()

# Add Symbol controls to the ECP
symbol_html = """
                        <div class="ecp-section-title" style="margin-top: 8px;">Components & Instances</div>
                        <div class="ecp-row" style="justify-content: space-between; gap: 6px;">
                            <button id="ecpConvertToSymbolBtn" class="ecp-btn accent" style="flex:1;" title="Wrap in <symbol> and create a <use> instance">Convert to Symbol</button>
                            <button id="ecpDuplicateInstanceBtn" class="ecp-btn" style="flex:1; display: none;" title="Duplicate selected <use> instance">Duplicate Instance</button>
                        </div>
                        <div class="ecp-section-title" style="margin-top: 8px;">Align & Distribute</div>
"""

content = content.replace('<div class="ecp-section-title" style="margin-top: 8px;">Align & Distribute</div>', symbol_html)

# Ensure the new buttons are hooked up in the JS
symbol_js = """
        // --- Symbol & Instance Manager ---
        const ecpConvertToSymbolBtn = document.getElementById('ecpConvertToSymbolBtn');
        const ecpDuplicateInstanceBtn = document.getElementById('ecpDuplicateInstanceBtn');

        // Update ECP visibility based on selection type
        const originalUpdateECP = updateECP;
        updateECP = function() {
            originalUpdateECP();
            if (selectedElements.length > 0) {
                // If every selected element is already a <use>, we can't convert to symbol (it's already instanced)
                // But we CAN duplicate instances
                const allUses = selectedElements.every(el => el.tagName.toLowerCase() === 'use');
                if (allUses) {
                    ecpConvertToSymbolBtn.style.display = 'none';
                    ecpDuplicateInstanceBtn.style.display = 'block';
                } else {
                    ecpConvertToSymbolBtn.style.display = 'block';
                    ecpDuplicateInstanceBtn.style.display = 'none';
                }
            }
        };

        ecpConvertToSymbolBtn?.addEventListener('click', () => {
            if (selectedElements.length === 0) return;
            const svgNode = svgTransformWrapper.querySelector('svg');
            if (!svgNode) return;

            let defs = svgNode.querySelector('defs');
            if (!defs) {
                defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                svgNode.insertBefore(defs, svgNode.firstChild);
            }

            const symbolId = 'sym-' + Math.random().toString(36).substr(2, 6);
            const symbol = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
            symbol.id = symbolId;

            // To properly convert to symbol and maintain visual position, we need to calculate bounding box
            // and set a viewBox on the symbol, OR we just group them, put the group in the symbol, and use
            // x/y offsets. The cleanest standard way for SVG Studio is to just wrap them in a symbol directly
            // and use x="0" y="0" so they retain their original coordinates within the SVG canvas.

            // Create a wrapper group for the symbol contents to maintain any relative transforms
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

            // We need to operate on the elements in the DOM to maintain their visual order
            // Sort by DOM order
            const sortedElements = [...selectedElements].sort((a, b) => {
                if (a === b) return 0;
                if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
                return 1;
            });

            // Insert a placeholder where the first element was
            const placeholder = document.createElementNS("http://www.w3.org/2000/svg", "g");
            sortedElements[0].parentNode.insertBefore(placeholder, sortedElements[0]);

            sortedElements.forEach(el => {
                g.appendChild(el);
            });

            symbol.appendChild(g);
            defs.appendChild(symbol);

            // Create the <use> instance
            const useEl = document.createElementNS("http://www.w3.org/2000/svg", "use");
            useEl.setAttribute('href', `#${symbolId}`);

            placeholder.parentNode.replaceChild(useEl, placeholder);

            // Deselect old elements, select the new use instance
            deselectElement();
            selectElement(useEl);
            updateEditorFromPreview();
            showToast('Converted to Symbol');
        });

        ecpDuplicateInstanceBtn?.addEventListener('click', () => {
            if (selectedElements.length === 0) return;
            const newInstances = [];

            selectedElements.forEach(el => {
                if (el.tagName.toLowerCase() === 'use') {
                    const clone = el.cloneNode(true);

                    // Offset the clone slightly so the user sees it
                    const currentTransform = clone.getAttribute('transform') || '';
                    clone.setAttribute('transform', currentTransform + ' translate(20, 20)');

                    el.parentNode.insertBefore(clone, el.nextSibling);
                    newInstances.push(clone);
                }
            });

            if (newInstances.length > 0) {
                deselectElement();
                newInstances.forEach(el => selectElement(el, true));
                updateEditorFromPreview();
                showToast(`Duplicated ${newInstances.length} instance(s)`);
            }
        });

        // --- Alignment & Distribution Logic ---
"""

content = content.replace('// --- Alignment & Distribution Logic ---', symbol_js)

with open('svgviewer.html', 'w') as f:
    f.write(content)

print("Symbol UI added")
