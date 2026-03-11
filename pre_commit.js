const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err));
  page.on('console', msg => {
      if (msg.type() === 'error') {
          pageErrors.push(`Console error: ${msg.text()}`);
      }
  });

  console.log('Navigating to svgviewer.html...');
  await page.goto('http://localhost:3000/svgviewer.html', { waitUntil: 'networkidle' });

  console.log('Page loaded. Checking for errors...');
  if (pageErrors.length > 0) {
      console.error('Errors found during load:');
      for (const err of pageErrors) {
          console.error('-', err.message || err);
      }
      process.exit(1);
  } else {
      console.log('No JS errors detected on load. Pre-commit check passed.');
  }

  await browser.close();
})();
