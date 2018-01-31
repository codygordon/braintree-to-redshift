const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const UglifyJS = require('uglifyjs-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './lib/index.js'],
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-2'],
      },
    }],
  },
  plugins: [
    new CleanWebpack(['dist']),
    new Dotenv({
      path: '.env',
      safe: true,
    }),
    new UglifyJS(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
