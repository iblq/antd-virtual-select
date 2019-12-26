/**
 * 公用规则
 */
module.exports = [
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: 'url-loader?limit=10000&name=font/[hash].[ext]'
  }
]
