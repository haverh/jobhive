/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
      {
        protocol: 'https', // Specifies the protocol (usually https)
        hostname: 'img.freepik.com', // The domain you want to allow
        // You can optionally add 'port' or 'pathname' for stricter controls
      },
    ],
};

export default nextConfig;
