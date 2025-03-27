/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable compression
  images: {
    domains: ['images.unsplash.com'], // Add your image domains here
    formats: ['image/avif', 'image/webp'], // Enable modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Optimize image sizes
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Configure security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  },
  // Configure redirects and rewrites
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
  // Configure webpack for bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Only apply optimizations in production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      }
    }
    return config
  },
}

module.exports = nextConfig 