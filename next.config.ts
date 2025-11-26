import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.hankyung.com',
      },
      {
        protocol: 'https',
        hostname: 'www.boannews.com',
      },
      {
        protocol: 'https',
        hostname: 'aet4p1ka2mfpbmiq.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
