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
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
    eslint: {
      ignoreDuringBuilds: true,
    }
});


