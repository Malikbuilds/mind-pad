import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "files.edgestore.dev"
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
      },
};

export default nextConfig;