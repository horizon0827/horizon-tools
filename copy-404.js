const fs = require('fs');
const path = require('path');

// Copy index.html to 404.html
fs.copyFileSync(
  path.join(__dirname, 'build', 'index.html'),
  path.join(__dirname, 'build', '404.html')
); 