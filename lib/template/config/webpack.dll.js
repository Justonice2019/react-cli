const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    react:['react', 'react-dom', 'react-router-dom'],
    antd:['antd'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../../dll'),
    library: '[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../../dll/[name].manifest.json'),
      name: '[name]',
    })
  ],
  performance: false
}
