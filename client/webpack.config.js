const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const config = isProd => ({
  context: path.resolve(__dirname, './src'),

  entry: {
    app: './index.tsx',
  },

  output: {
    filename: isProd ? '[name]-[hash].js' : '[name].js',
    chunkFilename: isProd ? '[name]-[hash].js' : '[name].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|firebase)/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff2?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isProd ? '[name]-[hash].[ext]' : '[name].[ext]',
              publicPath: '/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },

  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    isProd ? null : new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: isProd,
      alwaysWriteToDisk: true,
    }),

    new HtmlWebpackHarddiskPlugin(),

    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
    }),
  ].filter(plugin => !!plugin),

  devServer: {
    compress: true,
    contentBase: path.join(__dirname, '../public'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    port: 8000,
    watchOptions: {
      ignored: /node_modules/,
    },
    host: '0.0.0.0',
  },
});

module.exports = (_command, { mode }) => config(mode === 'production');
