const path = require('path');
const webpack = require('webpack');

const build = path.join(__dirname, './build');

module.exports = {
  entry: {
    index: './src/index.js',
    page: './src/page.js',
  },

  output: {
    path: build,
    filename: '[name].bundle.js',
  },

  resolve: {
    modules: ['node_modules'],
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'css-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },

  devtool: 'source-map',
};
