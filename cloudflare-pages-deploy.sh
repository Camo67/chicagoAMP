#!/bin/bash

# Cloudflare Pages deployment script
echo "Starting Cloudflare Pages deployment..."

# Ensure we're in the right directory
cd "${1:-.}"

# Build the Next.js application
echo "Building Next.js application..."
pnpm run build

# Check if .next/export directory exists
if [ ! -d ".next/export" ]; then
  echo "Warning: '.next/export' directory not found"
  # Try to see what's in .next directory
  if [ -d ".next" ]; then
    echo "Contents of .next directory:"
    ls -la .next
  fi
fi

# Deploy using wrangler pages deploy command
echo "Deploying with wrangler pages deploy..."
npx wrangler pages deploy .next/export --project-name=chicagoamp

echo "Deployment finished!"