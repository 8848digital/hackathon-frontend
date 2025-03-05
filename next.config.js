// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.BASE_URL,
      ENV: process.env.ENV,
    },
  }
  
  module.exports = nextConfig