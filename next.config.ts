import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.openweathermap.org',
        pathname: '/img/wn/**',
      },
    ],
  },
};

export default nextConfig;
