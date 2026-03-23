const fs = require('fs');

function fixFiles() {
    // 1. Fix js/app.js
    let appJs = fs.readFileSync('js/app.js', 'utf-8');

    // Add comments and fix null check in app.js resizer
    const oldResizerAppJs = `        let isResizing = false;
        let resizerRAF = null;
        resizer.addEventListener('mousedown', (e) => { isResizing = true; resizer.classList.add('active'); document.body.style.cursor = 'col-resize'; e.preventDefault(); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            if (resizerRAF) return;
            resizerRAF = requestAnimationFrame(() => {
                let newWidth = (e.clientX / document.body.clientWidth) * 100;
                editorSection.style.flex = \`0 0 \${Math.max(20, Math.min(newWidth, 80))}%\`;
                resizerRAF = null;
            });
        });`;

    const newResizerAppJs = `        let isResizing = false;
        let resizerRAF = null;
        resizer.addEventListener('mousedown', (e) => { isResizing = true; resizer.classList.add('active'); document.body.style.cursor = 'col-resize'; e.preventDefault(); });
        // ⚡ Bolt Optimization: Throttled resizer layout reads/writes to RAF to prevent layout thrashing and high frame computation times.
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            if (resizerRAF) return;
            resizerRAF = requestAnimationFrame(() => {
                let newWidth = (e.clientX / document.body.clientWidth) * 100;
                editorSection.style.flex = \`0 0 \${Math.max(20, Math.min(newWidth, 80))}%\`;
                resizerRAF = null;
            });
        });`;

    if (appJs.includes(oldResizerAppJs)) {
        appJs = appJs.replace(oldResizerAppJs, newResizerAppJs);
        console.log("Fixed resizer in js/app.js");
    }

    // Fix null check and add comments to app.js marquee
    const oldMarqueeAppJs = `        let marqueeRAF = null;
        svgPreviewContainer.addEventListener('mousemove', (e) => {
            if (!isMarquee || !marqueeContainerRect) return;
            if (marqueeRAF) return;
            marqueeRAF = requestAnimationFrame(() => {
                const currentX = e.clientX - marqueeContainerRect.left;
                const currentY = e.clientY - marqueeContainerRect.top;

                const x = Math.min(marqueeStart.x, currentX);
                const y = Math.min(marqueeStart.y, currentY);
                const w = Math.abs(currentX - marqueeStart.x);
                const h = Math.abs(currentY - marqueeStart.y);

                marqueeBox.style.left = x + 'px';
                marqueeBox.style.top = y + 'px';
                marqueeBox.style.width = w + 'px';
                marqueeBox.style.height = h + 'px';
                marqueeRAF = null;
            });
        });`;

    const newMarqueeAppJs = `        let marqueeRAF = null;
        // ⚡ Bolt Optimization: Throttled marquee layout reads/writes to RAF to prevent layout thrashing and high frame computation times.
        svgPreviewContainer.addEventListener('mousemove', (e) => {
            if (!isMarquee || !marqueeContainerRect) return;
            if (marqueeRAF) return;
            marqueeRAF = requestAnimationFrame(() => {
                if (marqueeContainerRect) {
                    const currentX = e.clientX - marqueeContainerRect.left;
                    const currentY = e.clientY - marqueeContainerRect.top;

                    const x = Math.min(marqueeStart.x, currentX);
                    const y = Math.min(marqueeStart.y, currentY);
                    const w = Math.abs(currentX - marqueeStart.x);
                    const h = Math.abs(currentY - marqueeStart.y);

                    marqueeBox.style.left = x + 'px';
                    marqueeBox.style.top = y + 'px';
                    marqueeBox.style.width = w + 'px';
                    marqueeBox.style.height = h + 'px';
                }
                marqueeRAF = null;
            });
        });`;

    if (appJs.includes(oldMarqueeAppJs)) {
        appJs = appJs.replace(oldMarqueeAppJs, newMarqueeAppJs);
        console.log("Fixed marquee in js/app.js");
    }

    fs.writeFileSync('js/app.js', appJs);


    // 2. Fix svgviewer.html
    let svgViewer = fs.readFileSync('svgviewer.html', 'utf-8');

    // Add comments to svgviewer.html resizer
    const oldResizerSvg = `        let isResizing = false;
        let resizerRAF = null;
        resizer.addEventListener('mousedown', (e) => { isResizing = true; resizer.classList.add('active'); document.body.style.cursor = 'col-resize'; e.preventDefault(); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            if (resizerRAF) return;
            resizerRAF = requestAnimationFrame(() => {
                let newWidth = (e.clientX / document.body.clientWidth) * 100;
                editorSection.style.flex = \`0 0 \${Math.max(20, Math.min(newWidth, 80))}%\`;
                resizerRAF = null;
            });
        });`;

    const newResizerSvg = `        let isResizing = false;
        let resizerRAF = null;
        resizer.addEventListener('mousedown', (e) => { isResizing = true; resizer.classList.add('active'); document.body.style.cursor = 'col-resize'; e.preventDefault(); });
        // ⚡ Bolt Optimization: Throttled resizer layout reads/writes to RAF to prevent layout thrashing and high frame computation times.
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            if (resizerRAF) return;
            resizerRAF = requestAnimationFrame(() => {
                let newWidth = (e.clientX / document.body.clientWidth) * 100;
                editorSection.style.flex = \`0 0 \${Math.max(20, Math.min(newWidth, 80))}%\`;
                resizerRAF = null;
            });
        });`;

    if (svgViewer.includes(oldResizerSvg)) {
        svgViewer = svgViewer.replace(oldResizerSvg, newResizerSvg);
        console.log("Fixed resizer in svgviewer.html");
    }

    // Add comments to svgviewer.html pointermove
    const oldPointerMoveSvg = `        let pointerRAF = null;
        window.addEventListener('pointermove', (e) => {
            if (interactionMode === 'none') return;`;

    const newPointerMoveSvg = `        let pointerRAF = null;
        // ⚡ Bolt Optimization: Throttled multiple pointermove interactions (marquee, drag, pan) to RAF to prevent layout thrashing.
        window.addEventListener('pointermove', (e) => {
            if (interactionMode === 'none') return;`;

    if (svgViewer.includes(oldPointerMoveSvg)) {
        svgViewer = svgViewer.replace(oldPointerMoveSvg, newPointerMoveSvg);
        console.log("Fixed pointermove in svgviewer.html");
    }

    fs.writeFileSync('svgviewer.html', svgViewer);
}

fixFiles();
