const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
};

module.exports = withPlugins([[withOptimizedImages]], nextConfig);
