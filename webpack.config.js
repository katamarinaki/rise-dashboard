const webpack = require('webpack')
const path = require('path')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const env = process.env.NODE_ENV || 'production'
const isDev = process.env.NODE_ENV === 'development'
const baseUrl = process.env.BASE_URL

module.exports = {
  mode: env,

  entry: [...(isDev ? ['react-hot-loader/patch'] : []), './src/index.tsx'],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isDev ? '[name].[hash].js' : '[name].[contenthash].js',
    pathinfo: isDev,
    publicPath: baseUrl || '/',
  },

  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },

  context: path.resolve(__dirname),

  devtool: isDev ? 'eval-source-map' : false,

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json', '.svg'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: isDev ? { 'react-dom': '@hot-loader/react-dom' } : {},
  },

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new WebpackBar({
      name: 'React SPA Template',
      color: '#fca903',
      compiledIn: false,
    }),
    new CaseSensitivePathsPlugin(),
    new Dotenv({ path: path.resolve(__dirname, '.env') }),
    new ForkTsCheckerWebpackPlugin({
      formatter: 'codeframe',
      useTypescriptIncrementalApi: true,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      eslint: true,
      tslintAutoFix: true,
      async: false,
      silent: false,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      appMountId: 'app',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[hash:8].css',
      chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[hash:8].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],

  optimization: {
    minimize: !isDev,
    minimizer: !isDev
      ? [new OptimizeCSSAssetsPlugin({}), new TerserPlugin()]
      : undefined,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader', 'astroturf/loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev },
          },
          'astroturf/css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => {
                const cssVars = require.resolve(
                  path.resolve(__dirname, 'src') + '/styles/vars.json',
                )
                loader.addDependency(cssVars)
                delete require.cache[cssVars]
                return [
                  require('autoprefixer'),
                  require('postcss-simple-vars')({
                    variables: () => require(cssVars),
                  }),
                ]
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: { hmr: isDev },
          },
          'css-loader',
        ],
      },
      {
        test: /\.svg(\?.*)?$/,
        use: {
          loader: 'svg-react-loader',
          query: {
            classIdPrefix: '[hash:8]__',
          },
        },
      },

      {
        test: /\.(png|jpg|gif|bin|glb|mp3)$/,
        use: ['file-loader'],
      },
    ],
  },
}
