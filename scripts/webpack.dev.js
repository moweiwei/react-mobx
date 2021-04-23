

const { resolve } = require('path')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const baseConfig = require('./webpack.base')

const root = path => resolve(__dirname, `../${path}`)

const config = {
  mode: 'development',
  entry: baseConfig.entry,
  output: {
    filename: '[name].js',
    path: root('dist/'),
    publicPath: '/',
    pathinfo: false,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      ...baseConfig.moduleRules,
      {
        test: /\.less$/i,
        include: root('src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]',
              modules: true,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.less$/i,
        include: root('node_modules'),
        loader: [ 
          "style-loader",
          "css-loader",
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 2,
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        include: root('src/assets'),
        use: {
          loader: 'file-loader',
          // options: {
          //   outputPath: '/src/assets',
          // },
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
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
  resolve: baseConfig.resolve,
  plugins: [
    ...baseConfig.plugins,
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({ overlay: false }),
    new webpack.WatchIgnorePlugin([
      root('node_modules'),
      root('build'),
      root('dist'),
    ]),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devServer: {
    publicPath: '/',
    compress: true,
    noInfo: false,
    quiet: false,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/252252',
        changeOrigin: true,
      }
    }
  },
}

module.exports = config
