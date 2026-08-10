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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },

      // ✅ Optional: Block API routes from indexing
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            //value: "beasconsultancy.com", // non-www
            value: "beta.beasconsultancy.com", // non-www
          },
        ],
        destination: "https://www.beta.beasconsultancy.com/:path*",
        //destination: "https://www.beasconsultancy.com/:path*",
        permanent: true, // 301 redirect (SEO best)
      },
    ];
  },
};

export default nextConfig;