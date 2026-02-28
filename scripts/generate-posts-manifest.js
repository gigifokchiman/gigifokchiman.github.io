const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'public', 'blog-post');
const outputFile = path.join(blogDir, 'posts.json');

const files = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.md'))
  .sort()
  .map(file => ({ file }));

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2) + '\n');
console.log(`Generated posts.json with ${files.length} posts`);
