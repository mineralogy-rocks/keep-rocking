/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,

    SENTRY_DSN: process.env.SENTRY_DSN,

    MINDAT_API_KEY: process.env.MINDAT_API_KEY,
    MINDAT_API_URL: process.env.MINDAT_API_URL,
  }
};


module.exports = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "mineralogy-rocks",
    project: "keep-rocking",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },
  {
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
  }
);
