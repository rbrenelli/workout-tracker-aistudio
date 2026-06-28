const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Regex to match images array with 3 elements and replace it with 2 elements
const regex = /images:\s*\[\s*('[^']+'|"[^"]+")\s*,\s*('[^']+'|"[^"]+")\s*,\s*('[^']+'|"[^"]+")\s*\]/g;

content = content.replace(regex, 'images: [$1, $2]');

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Successfully trimmed images in data.ts to maximum 2 per exercise.');
