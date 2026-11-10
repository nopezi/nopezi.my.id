import type { NextConfig } from "next";

const PORT = process.env.PORT || 3222;
const nextConfig: NextConfig = {
  // output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    CUSTOM_PORT: String(PORT),
  },
};

export default nextConfig;
