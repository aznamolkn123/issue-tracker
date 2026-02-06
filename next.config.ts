import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to treat Prisma as a standard server-side package
  serverExternalPackages: ['@prisma/client'],
  async headers() {
    return [{
      source: '/:path*',
      headers: [{
        key: 'Referrer-Policy', value: 'no-referrer'
      }]
    }]
  }
};

export default nextConfig;
