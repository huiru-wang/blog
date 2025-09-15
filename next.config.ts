import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false, // 禁用实验性的服务器源映射
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // 禁用图片优化以减少构建时内存占用
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 优化构建
  compress: true,
  // 减少内存使用
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 服务器端优化
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
  // 静态优化
  output: 'standalone',
  // 如果需要CDN或子路径，取消注释下面这行
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.robinverse.me' : '',
  // 减少运行时内存
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
