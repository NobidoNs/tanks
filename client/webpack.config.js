
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/client.js',
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
      jquery: require.resolve('jquery'),
      lib: path.resolve(__dirname, 'lib'),
      less: path.resolve(__dirname, './less')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
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
