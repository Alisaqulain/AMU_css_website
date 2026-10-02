import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.amu.ac.in",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
