import webpack from 'webpack';

module.exports = {
  entry: [
    './client/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/app`,
        exclude: /bundle\.js$/,
      },
    ],
    // 優化並使用 HotModuleReplacement
    // plugins: [
    //   new webpack.optimize.OccurrenceOrderPlugin(),
    //   new webpack.HotModuleReplacementPlugin()
    // ],    
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'react-hmre'],
      },
    }],
  },
};
