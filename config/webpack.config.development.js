const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dxMock = require('dx-mock')

const rules = require('./webpack.rules')
module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    modules: ['node_modules', 'lib']
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
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
          'style-loader',
          'css-loader',
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
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'url-loader?limit=8192&name=image/[hash].[ext]'
      }
    ])
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html'
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({})
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '../dist'),
      path.join(__dirname, '..')
    ],
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    before(app){
      dxMock(app, { root: path.join(__dirname, '../api')})
    }
  }
}
