const path = require('path');

const result = path.extname('public/page.html');

const pathToFile = path.format({
  dir: 'src/helpers',
  base: 'index.js',
});

console.log(pathToFile);
