#!/bin/bash

# Setup script to ensure local binaries are available
export PATH="./bin:./node_modules/.bin:$PATH"

echo "Updated PATH: $PATH"

# Verify next is available
if command -v next &> /dev/null
then
    echo "Next.js CLI is available"
    next --version
else
    echo "Next.js CLI is not available"
fi