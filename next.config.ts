import type { NextConfig } from "next";


const nextConfig:NextConfig = {
  images: {
    // Add the domain(s) you want to allow
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all domains (not recommended for production)
      },
    ],
  },
};

module.exports = nextConfig;
