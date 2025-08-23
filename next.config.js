/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Removed deprecated serverComponentsExternalPackages
  },
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    domains: ['localhost'],
  },
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
