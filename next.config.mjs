/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.beasconsultancy.com',
      },
    ],
  },
};

export default nextConfig;