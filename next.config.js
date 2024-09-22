/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", 
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
