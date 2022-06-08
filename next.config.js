/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'raw2002',
        mongodb_password: 'soxaOFaVBk5IWsWj',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'food-online',
        JWT_SECRET: 'sdjhfdknadsvcbuijknqefjdaysuhkjbhadfsuiaasjkbdhafjyßb',
        NEXTAUTH_URL: 'http://localhost:3000',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'raw2002',
      mongodb_password: 'soxaOFaVBk5IWsWj',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'food-online',
      JWT_SECRET: 'sdjhfdknadsvcbuijknqefjdaysuhkjbhadfsuiaasjkbdhafjyßb',
      NEXTAUTH_URL: 'http://localhost:3000',
    },
  };
};
