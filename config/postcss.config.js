const AUTOPREFIXER_BROWSERS = [
  "> 1%",
  "last 2 versions"
]

module.exports = {
  plugins: [
    require('autoprefixer')({browsers: AUTOPREFIXER_BROWSERS})
  ]
}
