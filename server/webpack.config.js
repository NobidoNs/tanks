/**
 * @fileoverview Webpack configuration file for client side scripts.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: '../client/src/client.js',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery',
      lib: path.resolve(__dirname, 'lib'),
      less: path.resolve(__dirname, '../client/less')
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  devtool: 'eval-cheap-source-map',
  mode: 'development'
}
