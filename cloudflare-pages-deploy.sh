#!/bin/bash

# Cloudflare Pages deployment script
echo "Starting Cloudflare Pages deployment..."

# Ensure we're in the right directory
cd "${1:-.}"

# Build the Next.js application
echo "Building Next.js application..."
pnpm run build

# Export the static site
echo "Exporting static site..."
pnpm run export

# Check if out directory exists
if [ ! -d "out" ]; then
  echo "Error: 'out' directory not found after export"
  exit 1
fi

# Deploy using wrangler pages deploy command
echo "Deploying with wrangler pages deploy..."
npx wrangler pages deploy out --project-name=chicagoamp

echo "Deployment finished!"