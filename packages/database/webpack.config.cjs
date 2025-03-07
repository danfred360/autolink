/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'swc-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
};