/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://10.0.0.20:3000'
  ],
  outputFileTracingRoot: path.resolve(__dirname), // Explicitly set workspace root
};

module.exports = nextConfig;
