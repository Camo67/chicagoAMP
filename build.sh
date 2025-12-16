#!/bin/bash

# Build script for Cloudflare Pages
echo "Starting build process..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  pnpm install
fi

# Run the build script
echo "Running build..."
pnpm run build

echo "Build completed!"