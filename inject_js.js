const fs = require('fs');

let html = fs.readFileSync('svgviewer.html', 'utf8');

const newJS = `
        // --- CUSTOM DROPDOWN LOGIC ---
        const easingOptions = [
            { group: 'Basic' },
            { value: 'linear', label: 'LINEAR', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 L 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'ease-in-out', label: 'EASE-IO', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 C 50 100, 50 0, 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'ease-in', label: 'EASE-IN', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 C 50 100, 100 100, 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'ease-out', label: 'EASE-OUT', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 C 0 0, 50 0, 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { group: 'GSAP Advanced' },
            { value: 'power2.out', label: 'SMOOTH OUT', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 Q 0 0, 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'power4.inOut', label: 'CINEMATIC', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 C 80 100, 20 0, 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'back.out(1.7)', label: 'OVERSHOOT', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 C 0 0, 40 -30, 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'elastic.out(1, 0.3)', label: 'SPRING', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 C 0 0, 10 -50, 20 20 C 30 -20, 40 10, 50 -5 C 60 5, 70 -2, 80 1 L 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'bounce.out', label: 'BOUNCE', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 L 20 0 L 40 40 L 60 0 L 75 20 L 85 0 L 95 10 L 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { value: 'expo.inOut', label: 'SHARP RAMP', icon: '<svg viewBox="-10 -10 120 120" width="100%" height="100%"><path d="M 0 100 C 90 100, 10 0, 100 0" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
        ];

        const dirOptions = [
            { value: 'normal', label: 'NORM', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' },
            { value: 'alternate', label: 'ALT', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16M16 4l4 4-4 4M20 16H4M8 20l-4-4 4-4"/></svg>' },
            { value: 'reverse', label: 'REV', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>' }
        ];

        function setupCustomDropdown(containerId, inputId, displayId, optionsData) {
            const container = document.getElementById(containerId);
            if(!container) return;
            const input = document.getElementById(inputId);
            const display = document.getElementById(displayId);
            const optionsList = container.querySelector('.custom-select-options');
            const iconSpan = display.querySelector('[class$="-icon"]');
            const textSpan = display.querySelector('[class$="-text"]');

            let optionsHtml = '';
            optionsData.forEach(opt => {
                if (opt.group) {
                    optionsHtml += \`<div class="px-2 py-1 text-[10px] text-muted bg-bg uppercase tracking-wider sticky top-0 opacity-50 pointer-events-none border-b border-border/50">\${opt.group}</div>\`;
                } else {
                    optionsHtml += \`<div class="custom-option px-2 py-1.5 hover:bg-accent/20 cursor-pointer flex items-center gap-2 transition-colors \${input.value === opt.value ? 'bg-accent/10 text-accent' : ''}" data-value="\${opt.value}">
                        <div class="w-5 h-5 opacity-70 flex items-center justify-center">\${opt.icon}</div>
                        <span>\${opt.label}</span>
                    </div>\`;
                }
            });
            optionsList.innerHTML = optionsHtml;

            const updateDisplay = (val) => {
                const opt = optionsData.find(o => o.value === val);
                if (opt) {
                    iconSpan.innerHTML = opt.icon;
                    textSpan.textContent = opt.label;
                    input.value = val;
                }
            };

            // Set initial state
            updateDisplay(input.value);

            display.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close others
                document.querySelectorAll('.custom-select-options').forEach(el => {
                    if (el !== optionsList) el.classList.add('hidden');
                });
                optionsList.classList.toggle('hidden');
            });

            optionsList.addEventListener('click', (e) => {
                const optEl = e.target.closest('.custom-option');
                if (optEl) {
                    const val = optEl.dataset.value;
                    updateDisplay(val);

                    // Update active class
                    optionsList.querySelectorAll('.custom-option').forEach(el => {
                        el.classList.remove('bg-accent/10', 'text-accent');
                    });
                    optEl.classList.add('bg-accent/10', 'text-accent');
                    optionsList.classList.add('hidden');

                    // Trigger manual change event
                    input.dispatchEvent(new Event('change'));
                }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            setupCustomDropdown('customEasingDropdown', 'animEasing', 'animEasingDisplay', easingOptions);
            setupCustomDropdown('customDirDropdown', 'animDir', 'animDirDisplay', dirOptions);

            // Close dropdowns on outside click
            document.addEventListener('click', () => {
                document.querySelectorAll('.custom-select-options').forEach(el => el.classList.add('hidden'));
            });
        });
        // --- END CUSTOM DROPDOWN LOGIC ---

        function applyLiveAnimation() {`;

html = html.replace(/        function applyLiveAnimation\(\) \{/, newJS);

fs.writeFileSync('svgviewer.html', html);
