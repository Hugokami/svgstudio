const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf-8');

// I need to find the `getCommonAttr` definition to see if it works as I assumed it did
console.log("Found getCommonAttr:", js.includes('function getCommonAttr(') || js.includes('const getCommonAttr ='));
