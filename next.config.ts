import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.anvara.com",
      },
      {
        protocol: "https",
        hostname: "www.anvara.com",
      },
      {
        protocol: "https",
        hostname: "anvara.com",
      },
    ],
  },
};

export default nextConfig;
