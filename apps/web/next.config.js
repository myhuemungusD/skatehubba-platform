const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* === Core Settings === */
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {
      resolveAlias: {
        // Support pnpm workspace symlinks
        "@skatehubba/ui": require.resolve("@skatehubba/ui"),
        "@skatehubba/utils": require.resolve("@skatehubba/utils"),
        "@skatehubba/types": require.resolve("@skatehubba/types")
      }
    },

    serverActions: {
      allowedOrigins: ["https://skatehubba.com", "http://localhost:3000"]
    }
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },

  /* === Transpile Shared Workspace Packages === */
  transpilePackages: [
    "@skatehubba/ui",
    "@skatehubba/utils",
    "@skatehubba/types",
    "expo",
    "expo-av",
    "expo-modules-core",
    "react-native-reanimated",
    "react-native-web",
    "nativewind"
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

module.exports = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "skatehubba",
  project: "web",
}, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
