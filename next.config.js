// next.config.js
const webpack = require("webpack");

module.exports = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /useSearchParams/,
        contextRegExp: /node_modules/,
      })
    );

    return config;
  },
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASS: process.env.USER_PASS,
    FROM_EMAIL: process.env.FROM_EMAIL,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASS: process.env.GMAIL_PASS,
  },
  images: {
    domains: ["localhost"],
  },
};
