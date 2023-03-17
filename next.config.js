/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/chat',
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/waj',
        destination: 'http://localhost:8888/isTokenValid',
        basePath: false,
      },
      {
        source: '/wak_sse',
        destination: 'http://localhost:8888/sse',
        basePath: false,
      },
      {
        source: '/wak_sse_get',
        destination: 'http://localhost:8888/wak_sse_get',
        basePath: false,
      },
    ]
  },
}

module.exports = nextConfig
