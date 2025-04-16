#!/bin/bash

cd /Users/mac/Documents/SCID_110/public/preview

for file in *; do
  # Skip if not a file
  [ -f "$file" ] || continue
  
  # Convert filename to lowercase
  newname=$(echo "$file" | tr '[:upper:]' '[:lower:]')
  
  # Replace main or detail with preview@preview
  newname=$(echo "$newname" | sed -E 's/(_main|_detail[0-9]?)/_preview@preview/g')
  
  # Remove spaces
  newname=$(echo "$newname" | sed 's/ //g')
  
  # Rename the file if the name changed
  if [ "$file" != "$newname" ]; then
    mv "$file" "$newname"
    echo "Renamed: $file -> $newname"
  fi
done 