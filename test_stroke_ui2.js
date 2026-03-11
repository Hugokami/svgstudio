const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/svgviewer.html', { waitUntil: 'networkidle' });

  // Add an SVG element to select
  await page.evaluate(() => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.innerHTML = '<circle id="testcircle" cx="50" cy="50" r="40" fill="none" stroke="red" stroke-width="2" stroke-dasharray="10 5" stroke-linecap="round" stroke-linejoin="bevel" stroke-dashoffset="15"/>';
      document.getElementById('svgTransformWrapper').appendChild(svg);
  });

  await page.evaluate(() => {
      selectElement(document.getElementById('testcircle'));
  });

  await page.waitForTimeout(500);

  // Check inputs
  const inputs = await page.evaluate(() => {
      return {
          dash: document.getElementById('ecpStrokeDash') ? document.getElementById('ecpStrokeDash').value : null,
          offset: document.getElementById('ecpStrokeOffset') ? document.getElementById('ecpStrokeOffset').value : null,
          linecap: document.getElementById('ecpStrokeLinecap') ? document.getElementById('ecpStrokeLinecap').value : null,
          linejoin: document.getElementById('ecpStrokeLinejoin') ? document.getElementById('ecpStrokeLinejoin').value : null
      };
  });

  console.log('Inputs after selection:', inputs);

  // Test modifying value
  await page.fill('#ecpStrokeDash', '20 10');

  const attr = await page.evaluate(() => {
      return document.getElementById('testcircle').getAttribute('stroke-dasharray');
  });
  console.log('Circle stroke-dasharray after modifying input:', attr);

  await browser.close();
})();
