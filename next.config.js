const { withFaust } = require("@faustjs/next");
/**
 * @type {import('next').NextConfig}
 **/

const prod = process.env.NODE_ENV === 'production'
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    disable: prod ? false : true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
});

module.exports = withFaust( withPWA({
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  staticPageGenerationTimeout: 5000,
  images: {
    domains: ["localhost", "devcans.wpengine.com"],
    optimized: true,
    allowFutureImage: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}));
