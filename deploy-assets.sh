#!/bin/bash

# Asset deployment script for Cloudflare
echo "Starting asset deployment..."

# Ensure we're in the right directory
cd "${1:-.}"

# Build the Next.js application
echo "Building Next.js application..."
pnpm run build

# Check if .next/export directory exists
if [ ! -d ".next/export" ]; then
  echo "Error: '.next/export' directory not found after build"
  exit 1
fi

echo "Found export directory with the following files:"
ls -la .next/export

# Deploy using wrangler deploy with assets flag
echo "Deploying assets with wrangler deploy..."
npx wrangler deploy --assets=.next/export

echo "Asset deployment finished!"