/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
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
    env : process.env.ENV,
    isDBSync: true
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
  },
};

module.exports = nextConfig;
