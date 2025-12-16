#!/bin/bash

# Cloudflare Pages deployment script
echo "Starting Cloudflare Pages deployment..."

# Ensure we're in the right directory
cd "${1:-.}"

# Deploy using wrangler pages deploy command
echo "Deploying with wrangler pages deploy..."
npx wrangler pages deploy .vercel/output/static --project-name=chicagoamp

echo "Deployment finished!"