// next.config.js
module.exports = {
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
  },
  images: {
    domains: ["localhost"],
  },
};
