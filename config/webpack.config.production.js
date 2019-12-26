// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const rules = require('./webpack.rules')
module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
    chunkFilename: '[name].[hash].js',
    library: 'someLibName',
    libraryTarget: 'umd'
  },
  externals : {
    react: 'react',
    'react-dom': 'react-dom',
    'prop-types': 'prop-types',
    antd: 'antd'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            ascii_only: true
          },
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({}),
      new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    ]
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  module: {
    rules: rules.concat([{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: 'config/postcss.config.js'
            }
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: 'config/postcss.config.js'
            }
          }
        },
        {
          loader: 'less-loader',
          options: {
            relativeUrls: false,
            javascriptEnabled: true
          }
        }
      ]
    },
    {
      test: /\.(jpe?g|png|gif)$/,
      loader: 'url-loader',
      options: {
        // Inline files smaller than 10 kB (10240 bytes)
        limit: 10 * 1024,
        name: 'image/[hash].[ext]'
      }
    },
    {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        // Inline files smaller than 10 kB (10240 bytes)
        limit: 10 * 1024,
        name: 'image/[hash].[ext]',
        // Remove the quotes from the url
        // (they’re unnecessary in most cases)
        noquotes: true
      }
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          quality: 80
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        }
      },
      // This will apply the loader before the other ones
      enforce: 'pre'
    }])
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({}),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[hash].css',
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      hash: true
    })
  ]
}
