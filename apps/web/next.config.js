/** @type {import('next').NextConfig} */
const nextConfig = {
  /* === Core Settings === */
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {
      resolveAlias: {
        // Support pnpm workspace symlinks
        "@repo/ui": require.resolve("@repo/ui"),
        "@repo/utils": require.resolve("@repo/utils"),
        "@repo/types": require.resolve("@repo/types"),
        "@repo/store": require.resolve("@repo/store")
      }
    },

    serverActions: {
      allowedOrigins: ["https://skatehubba.com", "http://localhost:3000"]
    }
  },

  /* === Transpile Shared Workspace Packages === */
  transpilePackages: [
    "@repo/ui",
    "@repo/utils",
    "@repo/types",
    "@repo/store"
  ],

  /* === Image Optimization === */
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com"
    ],
    formats: ["image/avif", "image/webp"]
  },

  /* === Security Headers === */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  },

  /* === URL Rewrites (Future API Gateway) === */
  async rewrites() {
    return [
      {
        source: "/api/functions/:path*",
        destination: "https://us-central1-sk8hub-d7806.cloudfunctions.net/:path*"
      }
    ];
  },

  /* === Bundle Analyzer (Optional) === */
  // analyze with: ANALYZE=true pnpm web build
  webpack(config) {
    if (process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  }
};

module.exports = nextConfig;
