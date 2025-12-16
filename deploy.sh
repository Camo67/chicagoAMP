#!/bin/bash

# Deployment script for Cloudflare Pages
echo "Starting Cloudflare Pages deployment..."

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
npx wrangler pages deploy

echo "Deployment completed!"