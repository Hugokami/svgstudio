const fs = require('fs');

const curves = {
  'linear': 'M 0 100 L 100 0',
  'ease-in-out': 'M 0 100 C 50 100, 50 0, 100 0',
  'ease-in': 'M 0 100 C 50 100, 100 100, 100 0',
  'ease-out': 'M 0 100 C 0 0, 50 0, 100 0',
  'power2.out': 'M 0 100 Q 0 0, 100 0',
  'power4.inOut': 'M 0 100 C 80 100, 20 0, 100 0',
  'back.out(1.7)': 'M 0 100 C 0 0, 40 -30, 100 0', // Overshoot
  'elastic.out(1, 0.3)': 'M 0 100 C 0 0, 10 -50, 20 20 C 30 -20, 40 10, 50 -5 C 60 5, 70 -2, 80 1 L 100 0',
  'bounce.out': 'M 0 100 L 20 0 L 40 40 L 60 0 L 75 20 L 85 0 L 95 10 L 100 0',
  'expo.inOut': 'M 0 100 C 90 100, 10 0, 100 0'
};

for (const [name, d] of Object.entries(curves)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="100%" height="100%"><path d="${d}" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  console.log(`"${name}": \`${svg}\`,`);
}
