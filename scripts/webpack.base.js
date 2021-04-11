const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const HappyPack = require('happypack')
const WebpackBar = require('webpackbar')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = path => resolve(__dirname, `../${path}`)

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    main: './src/core/index.js',
  },
  moduleRules: [
    {
      test: /\.jsx?$/,
      include: root('src'),
      use: 'happypack/loader?id=jsx',
    },
    {
      test: /\.svg$/,
      issuer: { test: /\.jsx?$/ },
      use: [
        { loader: '@svgr/webpack', options: { icon: true } },
      ],
    },
    {
      test: /\.(jpg|png|svg)(\?.+)?$/,
      include: root('src/assets'),
      use: 'url-loader?limit=100000',
    },
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', 'png'],
    symlinks: false,
    modules: [root('src'), root('src/pages'), 'node_modules'],
    alias: {
      '@': root('src'),
      src: root('src'),
      assets: root('src/assets'),
      components: root('src/components'),
      pages: root('src/pages'),
      utils: root('src/utils'),
      stores: root('src/stores'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root('src/assets/index.html'),
      filename: root('dist/index.html'),
    }),
    new HappyPack({
      id: 'jsx',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
          },
        },
      ],
    }),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      output: '../dist/manifest.json',
    }),
    new WebpackBar(),
  ],
  postCssOptions: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
    ],
  },
}
