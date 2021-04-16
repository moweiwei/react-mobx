

const { resolve } = require('path')
const merge = require('lodash/merge')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const root = path => resolve(__dirname, `../${path}`)

const baseConfig = require('./webpack.base')

const smp = new SpeedMeasurePlugin()

const config = smp.wrap({
  mode: 'production',
  entry: baseConfig.entry,
  output: {
    filename: '[name].[chunkhash].js',
    path: root('dist/'),
    publicPath: '/dist/',
    chunkFilename: '[id].[chunkhash].js',
  },
  module: {
    rules: [
      ...baseConfig.moduleRules,
      {
        test: /\.less$/i,
        include: root('src'),
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: baseConfig.postCssOptions,
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.less$/i,
        include: root('node_modules'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: baseConfig.postCssOptions,
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          }
        ],
      },
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        include: root('src/assets'),
        use: {
          loader: 'file-loader',
          options: {
            outputPath: '/assets/',
          },
        },
      },
    ],
  },
  optimization: {
    flagIncludedChunks: true,
    occurrenceOrder: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](?!(ace-builds|react-ace|xterm)).*.jsx?$/,
          name: 'vendor',
          priority: 10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
        },
      },
    },
  },
  resolve: merge({}, baseConfig.resolve, {
    alias: { lodash: root('node_modules/lodash') },
  }),
  plugins: [
    ...baseConfig.plugins,
    new CopyPlugin([{ from: root('src/assets/images'), to: root('dist/assets/images') }]),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
})

module.exports = config
