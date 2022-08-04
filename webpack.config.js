const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/bundle/'),
    publicPath: '/public/bundle/',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          typescript: true
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env',
      safe: true
    })
  ]
};
