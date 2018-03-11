const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC = path.resolve(__dirname, 'src/app.js');

config = {
  entry: SRC,
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    index: 'index.html'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.(scss)$/i,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ]
    }, {
      test: /\.(woff2?|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
      loader: 'url-loader?limit=100000'
    }]
  }
};

module.exports = config;
