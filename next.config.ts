/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: false,


  webpack(config: { module: { rules: { test: RegExp; use: string[]; }[]; }; }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = config;
