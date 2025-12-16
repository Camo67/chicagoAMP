/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow development access from the LAN IP used in your logs.
  allowedDevOrigins: ["http://192.168.18.5:3000"],
  
  // Enable static export
  output: 'export',
  distDir: '.next/export',
}

export default nextConfig