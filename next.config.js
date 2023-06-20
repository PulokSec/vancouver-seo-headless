const { withFaust } = require('@faustjs/next');
/**
 * @type {import('next').NextConfig}
 **/


module.exports =  withFaust ({
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  staticPageGenerationTimeout: 5000,
  experimental: {
    images: {
      optimized: true,
      allowFutureImage: true
    }
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: 'public, s-maxage=10, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
    eslint: {
      ignoreDuringBuilds: true,
    }
});


