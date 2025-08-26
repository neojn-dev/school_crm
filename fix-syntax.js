const fs = require('fs');
const path = require('path');

const files = [
  'app/api/users/[id]/route.ts',
  'app/api/roles/[id]/route.ts', 
  'app/api/upload/[id]/route.ts',
  'app/api/teachers/[id]/route.ts',
  'app/api/master-data/[id]/route.ts',
  'app/api/lawyers/[id]/route.ts',
  'app/api/engineers/[id]/route.ts',
  'app/api/doctors/[id]/route.ts'
];

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the broken syntax pattern
    content = content.replace(
      /{ params }: { params: Promise<{ id: string }> }\s*const resolvedParams = await params\)/g,
      '{ params }: { params: Promise<{ id: string }> }\n) {\n  const resolvedParams = await params'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  } else {
    console.log(`File ${filePath} not found`);
  }
});

console.log('All files processed!');
