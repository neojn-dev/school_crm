const fs = require('fs');

const files = [
  'app/api/engineers/[id]/route.ts',
  'app/api/lawyers/[id]/route.ts',
  'app/api/master-data/[id]/route.ts',
  'app/api/roles/[id]/route.ts',
  'app/api/teachers/[id]/route.ts',
  'app/api/users/[id]/route.ts',
  'app/api/upload/[id]/route.ts'
];

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the main syntax issues
    content = content.replace(
      /const resolvedParams = await params \{/g,
      'const resolvedParams = await params'
    );
    
    // Fix any remaining malformed patterns
    content = content.replace(
      /const resolvedParams = resolvedParams \{/g,
      'const resolvedParams = await params'
    );
    
    // Replace all instances of 'await params' with 'resolvedParams' except the declaration
    const lines = content.split('\n');
    let inFunction = false;
    let hasDeclaration = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if we're starting a new function
      if (line.includes('export async function')) {
        inFunction = true;
        hasDeclaration = false;
        continue;
      }
      
      // Check if we have the resolvedParams declaration
      if (inFunction && line.includes('const resolvedParams = await params')) {
        hasDeclaration = true;
        continue;
      }
      
      // Replace other instances of await params
      if (inFunction && hasDeclaration && line.includes('await params')) {
        lines[i] = line.replace(/await params/g, 'resolvedParams');
      }
      
      // Reset when function ends
      if (line.trim() === '}' && inFunction) {
        inFunction = false;
        hasDeclaration = false;
      }
    }
    
    content = lines.join('\n');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  } else {
    console.log(`File ${filePath} not found`);
  }
});

console.log('All files processed!');
