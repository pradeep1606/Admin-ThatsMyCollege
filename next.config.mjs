/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dcgre5gxz/image/upload/**",
      },
    ],
  },
  env: {
    SERVICE_BASE_URL: process.env.SERVICE_BASE_URL,
    SERVICE_API_KEY: process.env.SERVICE_API_KEY,
    SERVICE_API_KEY_VALUE: process.env.SERVICE_API_KEY_VALUE,
  },
};

export default nextConfig;
