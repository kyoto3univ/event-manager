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
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](@material-ui[\//]|react)/,
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
              publicPath: '/dist/',
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
    noParse: /browserfs\.js/,
  },

  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      fs: 'browserfs/dist/shims/fs.js',
      buffer: 'browserfs/dist/shims/buffer.js',
      path: 'browserfs/dist/shims/path.js',
      processGlobal: 'browserfs/dist/shims/process.js',
      bufferGlobal: 'browserfs/dist/shims/bufferGlobal.js',
      bfsGlobal: require.resolve('browserfs'),
    },
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

    new webpack.ProvidePlugin({
      BrowserFS: 'bfsGlobal',
      process: 'processGlobal',
      Buffer: 'bufferGlobal',
    }),

    new HtmlWebpackHarddiskPlugin(),

    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
    }),
  ].filter(plugin => !!plugin),

  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    port: 8000,
    watchOptions: {
      ignored: /node_modules/,
    },
    host: '0.0.0.0',
  },

  node: {
    process: false,
    Buffer: false,
  },
});

module.exports = (_command, { mode }) => config(mode === 'production');
