import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to treat Prisma as a standard server-side package
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
