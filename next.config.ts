import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "d3ctxlq1ktw2nl.cloudfront.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
