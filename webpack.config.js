var webpack = require('webpack')

module.exports = {
  entry: ['./src/index.js'],

  output: {
    path:       'app/',
    filename:   'app.js',
    publicPath: '/'
  },

  target: 'node',
  devtool: 'eval-source-map',
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings:     false,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ] : [],

  externals: {
    'config': JSON.stringify(
                process.env.NODE_ENV === 'production'
                ? require('./config/production.json')
                : require('./config/development.json'))
  },

  module: {
    loaders: [{
      test:    /\.js$/,
      exclude: /node_modules/,
      loader:  'babel-loader'
    },
    {
      test:   /\.json/,
      loader: 'json-loader'
    },
    { test:   require.resolve('react-addons-perf'),
      loader: 'expose?Perf'
    }]
  }
}
