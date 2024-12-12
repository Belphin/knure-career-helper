const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  basePath: "",
  trailingSlash: true,
  assetPrefix: "./",
};

module.exports = withMDX(nextConfig);
