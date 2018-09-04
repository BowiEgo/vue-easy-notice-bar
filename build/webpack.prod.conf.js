const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'vue-easy-notice-bar.js',
    library: 'vue-easy-notice-bar',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
})

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
  module.exports.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      })
    ]
  }
}
