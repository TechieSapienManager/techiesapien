import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  experimental: {
    optimizePackageImports: ["three", "@react-three/fiber", "@react-three/drei", "framer-motion", "lucide-react"],
  },
};

export default nextConfig;
