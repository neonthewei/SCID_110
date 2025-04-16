#!/bin/bash

cd /Users/mac/Documents/SCID_110/public/preview

# Fix the filename with missing underscore
if [ -f "a109130009work2preview.webp" ]; then
  mv "a109130009work2preview.webp" "a109130009_work2_preview.webp"
  echo "Fixed: a109130009work2preview.webp -> a109130009_work2_preview.webp"
fi 