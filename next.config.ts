import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wonderappliances.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
