/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'es',
    localeDetection: false,
    locales: ['es', 'en']
  },
  publicRuntimeConfig: {
    CF_DELIVERY_ACCESS_TOKEN: process.env.CF_DELIVERY_ACCESS_TOKEN,
    CF_ENVIRONMENT: process.env.CF_ENVIRONMENT,
    CF_SPACE_ID: process.env.CF_SPACE_ID
  },
  reactStrictMode: false
};

module.exports = nextConfig;
