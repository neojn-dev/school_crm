#!/bin/bash

# Fix Next.js 15 API route params for all dynamic routes

files=(
  "app/api/cms/pages/[id]/route.ts"
  "app/api/users/[id]/route.ts"
  "app/api/roles/[id]/route.ts"
  "app/api/upload/[id]/route.ts"
  "app/api/teachers/[id]/route.ts"
  "app/api/master-data/[id]/route.ts"
  "app/api/lawyers/[id]/route.ts"
  "app/api/engineers/[id]/route.ts"
  "app/api/doctors/[id]/route.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Fix function signatures
    sed -i '' 's/{ params }: { params: { id: string } }/{ params }: { params: Promise<{ id: string }> }/g' "$file"
    
    # Add resolvedParams line after function declaration
    sed -i '' '/{ params }: { params: Promise<{ id: string }> }/a\
  const resolvedParams = await params' "$file"
    
    # Replace params.id with resolvedParams.id
    sed -i '' 's/params\.id/resolvedParams.id/g' "$file"
    
    echo "Fixed $file"
  else
    echo "File $file not found, skipping..."
  fi
done

echo "All API routes fixed!"
