const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx and .ts files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Get all TypeScript/React files
const files = findFiles('./app');

let totalFixed = 0;

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix unescaped single quotes in JSX
    const singleQuoteRegex = /(\w)'(\w)/g;
    if (content.match(singleQuoteRegex)) {
      content = content.replace(singleQuoteRegex, '$1&apos;$2');
      modified = true;
    }
    
    // Fix unescaped quotes in strings within JSX
    const jsxQuoteRegex = /(>|\s+)([^<]*?)'([^<]*?)</g;
    if (content.match(jsxQuoteRegex)) {
      content = content.replace(jsxQuoteRegex, '$1$2&apos;$3<');
      modified = true;
    }
    
    // Fix unescaped double quotes in JSX
    const doubleQuoteRegex = /(>|\s+)([^<]*?)"([^<]*?)"([^<]*?)</g;
    if (content.match(doubleQuoteRegex)) {
      content = content.replace(doubleQuoteRegex, '$1$2&quot;$3&quot;$4<');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed quotes in: ${filePath}`);
      totalFixed++;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);
