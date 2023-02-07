/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
    };
    experiments: {
      topLevelAwait: true
    }
    return config;
  },
};
module.exports = nextConfig;
