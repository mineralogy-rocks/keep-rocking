/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // publicRuntimeConfig: {
  //   API_KEY: process.env.API_KEY,
  // },
}

const env = {
  API_KEY: process.env.API_KEY,
}

module.exports = () => {
  return {
    ...nextConfig,
    env,
  }
}
