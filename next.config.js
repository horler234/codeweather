/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/edge/api/authentication/:path*",
        destination: "/api/auth/:path*",
      },
    ];
  },
};
