/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    secret: "97IoST9Ec8s5scvy49AMzT0TYArIInGZ",
    env: process.env.ENV,
    isDBSync: false,
    // Make sure to false this after true
    // This must be true if we want to generate the table / if the table is generated at once, then make this true for once and then make it false.
    // this is related to only DB or Backend changes.
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
  },
  reactStrictMode: true,
  images: {
    domains: ['www.shutterstock.com', 'cdn3.vectorstock.com'],
  },
};

module.exports = nextConfig;