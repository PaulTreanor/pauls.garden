/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Ensure public files are properly copied to output
  async rewrites() {
    return [
      {
        source: '/rss.xml',
        destination: '/rss.xml',
      },
    ];
  },
}

export default nextConfig
