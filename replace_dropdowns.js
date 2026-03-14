const fs = require('fs');

let html = fs.readFileSync('svgviewer.html', 'utf8');

const easingHTML = `
                                <div class="flex-1 relative" id="customEasingDropdown">
                                    <label class="block text-[10px] text-muted mb-1.5 uppercase tracking-wider font-tech">Easing</label>
                                    <div class="custom-select w-full bg-bg border border-border hover:border-accent/50 p-1.5 text-xs text-gray-200 outline-none transition-colors font-tech cursor-pointer flex items-center justify-between" id="animEasingDisplay" tabindex="0">
                                        <div class="flex items-center gap-2">
                                            <span class="easing-icon w-4 h-4 flex items-center"></span>
                                            <span class="easing-text">EASE-IO</span>
                                        </div>
                                        <span class="text-[8px] opacity-50">▼</span>
                                    </div>
                                    <div class="custom-select-options hidden absolute left-0 right-0 top-full mt-1 bg-bg border border-border z-50 max-h-48 overflow-y-auto font-tech text-xs shadow-xl">
                                        <!-- Options injected by JS -->
                                    </div>
                                    <input type="hidden" id="animEasing" value="ease-in-out">
                                </div>`;

const dirHTML = `
                                <div class="flex-1 relative" id="customDirDropdown">
                                    <label class="block text-[10px] text-muted mb-1.5 uppercase tracking-wider font-tech">Dir</label>
                                    <div class="custom-select w-full bg-bg border border-border hover:border-accent/50 p-1.5 text-xs text-gray-200 outline-none transition-colors font-tech cursor-pointer flex items-center justify-between" id="animDirDisplay" tabindex="0">
                                        <div class="flex items-center gap-2">
                                            <span class="dir-icon w-4 h-4 flex items-center"></span>
                                            <span class="dir-text">NORM</span>
                                        </div>
                                        <span class="text-[8px] opacity-50">▼</span>
                                    </div>
                                    <div class="custom-select-options hidden absolute left-0 right-0 top-full mt-1 bg-bg border border-border z-50 max-h-32 overflow-y-auto font-tech text-xs shadow-xl">
                                        <!-- Options injected by JS -->
                                    </div>
                                    <input type="hidden" id="animDir" value="normal">
                                </div>`;

// Replace <div class="flex-1">...Easing select...</div>
html = html.replace(/<div class="flex-1">[\s\S]*?<label[\s\S]*?Easing<\/label>[\s\S]*?<select id="animEasing"[\s\S]*?<\/select>[\s\S]*?<\/div>/, easingHTML);

// Replace <div class="flex-1">...Dir select...</div>
html = html.replace(/<div class="flex-1">[\s\S]*?<label[\s\S]*?Dir<\/label>[\s\S]*?<select id="animDir"[\s\S]*?<\/select>[\s\S]*?<\/div>/, dirHTML);


const newJS = `
        // --- CUSTOM DROPDOWN LOGIC ---
        const easingOptions = [
            { group: 'Basic' },
            { value: 'linear', label: 'LINEAR', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20L20 4"/></svg>' },
            { value: 'ease-in-out', label: 'EASE-IO', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20C12 20 12 4 20 4"/></svg>' },
            { value: 'ease-in', label: 'EASE-IN', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20C12 20 20 20 20 4"/></svg>' },
            { value: 'ease-out', label: 'EASE-OUT', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20C4 4 12 4 20 4"/></svg>' },
            { group: 'GSAP Advanced' },
            { value: 'power2.out', label: 'SMOOTH OUT', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20Q4 4 20 4"/></svg>' },
            { value: 'power4.inOut', label: 'CINEMATIC', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20C16 20 8 4 20 4"/></svg>' },
            { value: 'back.out(1.7)', label: 'OVERSHOOT', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20C4 4 14 -4 20 4"/></svg>' },
            { value: 'elastic.out(1, 0.3)', label: 'SPRING', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20C4 4 6 -2 8 8C10 -2 12 6 14 3C16 6 18 3 20 4"/></svg>' },
            { value: 'bounce.out', label: 'BOUNCE', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20L8 4L12 12L15 4L18 8L20 4"/></svg>' },
            { value: 'expo.inOut', label: 'SHARP RAMP', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20C18 20 6 4 20 4"/></svg>' }
        ];

        const dirOptions = [
            { value: 'normal', label: 'NORM', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M16 6l6 6-6 6"/></svg>' },
            { value: 'alternate', label: 'ALT', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h16M16 4l4 4-4 4M20 16H4M8 20l-4-4 4-4"/></svg>' },
            { value: 'reverse', label: 'REV', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12H4M8 6l-6 6 6 6"/></svg>' },
            { value: 'alternate-reverse', label: 'ALT-REV', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 8H4M8 4l-4 4 4 4M4 16h16M16 20l4-4-4-4"/></svg>' }
        ];

        function setupCustomDropdown(containerId, inputId, displayId, optionsData) {
            const container = document.getElementById(containerId);
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
                        <div class="w-5 h-5 opacity-70">\${opt.icon}</div>
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
                    // Trigger change event manually
                    input.dispatchEvent(new Event('change'));
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
`;

// Inject the JS logic before the closing body tag or near applyLiveAnimation
html = html.replace(/\/\/ ═══ GSAP TIMELINE & WAAPI SYNC ═══/, newJS + '\n\n        // ═══ GSAP TIMELINE & WAAPI SYNC ═══');


fs.writeFileSync('svgviewer.html', html);
