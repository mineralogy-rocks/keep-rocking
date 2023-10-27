/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sentry: {
    hideSourceMaps: true,
  }
}

const env = {
  API_KEY: process.env.API_KEY,
  API_URL: process.env.API_URL,

  SENTRY_DSN: process.env.SENTRY_DSN,

  MINDAT_API_KEY: process.env.MINDAT_API_KEY,
  MINDAT_API_URL: process.env.MINDAT_API_URL,
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: "mineralogy-rocks",
  project: "keep-rocking",

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
module.exports = withSentryConfig({ ...nextConfig, env}, sentryWebpackPluginOptions);
