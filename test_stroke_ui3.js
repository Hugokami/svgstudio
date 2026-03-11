const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/svgviewer.html', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.id = "testcircle";
      circle.setAttribute('cx', "50");
      circle.setAttribute('cy', "50");
      circle.setAttribute('r', "40");
      circle.setAttribute('fill', "none");
      circle.setAttribute('stroke', "red");
      circle.setAttribute('stroke-width', "2");
      circle.setAttribute('stroke-dasharray', "10 5");
      circle.setAttribute('stroke-linecap', "round");
      circle.setAttribute('stroke-linejoin', "bevel");
      circle.setAttribute('stroke-dashoffset', "15");
      circle.classList.add('selectable-element');

      svg.appendChild(circle);
      document.getElementById('svgTransformWrapper').appendChild(svg);

      // Simulate click
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      circle.dispatchEvent(event);
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
