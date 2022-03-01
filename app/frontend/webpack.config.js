const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  plugins: [new Dotenv()],
  // experiments: {
  //   topLevelAwait: true,
  // },
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
