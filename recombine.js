const fs = require('fs');

let html = fs.readFileSync('svgviewer.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const js = fs.readFileSync('js/app.js', 'utf8');

// Replace CSS link with inline style
html = html.replace(
  '<link href="/css/style.css" rel="stylesheet"/>',
  `<style>\n${css}\n</style>`
);

// Replace JS script tag with inline script
html = html.replace(
  '<script src="/js/app.js"></script>',
  `<script>\n${js}\n</script>`
);

fs.writeFileSync('svgviewer.html', html, 'utf8');
console.log('Recombined successfully!');
