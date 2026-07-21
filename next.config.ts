import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/navigator",
        destination: "/",
        permanent: false,
      },
      {
        source: "/navigator/",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
