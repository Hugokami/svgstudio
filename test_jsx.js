const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/svgviewer.html', { waitUntil: 'networkidle' });

  const hasButton = await page.evaluate(() => !!document.getElementById('exportReactBtn'));
  console.log('JSX Button present:', hasButton);

  if (hasButton) {
      await page.evaluate(() => {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.innerHTML = '<circle id="c1" cx="50" cy="50" r="40" fill="red" />';
          document.getElementById('svgTransformWrapper').appendChild(svg);

          window.animations = [{
              elementId: 'c1',
              type: 'to',
              props: { x: 100 },
              startTime: 0,
              duration: 1
          }];
      });

      await page.click('#exportReactBtn');
      await page.waitForTimeout(500); // Give modal time to render

      const hasModal = await page.evaluate(() => {
          return document.body.innerHTML.includes('React JSX Component');
      });
      console.log('Modal opened:', hasModal);

      const textAreaVal = await page.evaluate(() => {
          const ta = document.getElementById('jsxTextArea');
          return ta ? ta.value : null;
      });

      if (textAreaVal) {
          console.log('Generated code length:', textAreaVal.length);
          console.log('Contains React import:', textAreaVal.includes("import React"));
          console.log('Contains GSAP import:', textAreaVal.includes("import gsap"));
      } else {
          console.log('Could not find textarea');
      }
  }

  await browser.close();
})();
