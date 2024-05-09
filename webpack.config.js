const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {

  const isDev = env.mode === 'dev';
  const mode = env.mode === 'prod' ? 'production' : 'development';
  const devtool = isDev ? 'inline-source-map' : false

  return {
    mode,
    devtool,
    devServer: {
      static: './dist',
      hot: true,
    },
    entry: {
      index: './src/index.js',
    },
    output: {
      filename: 'js/[name]-[hash:8].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      runtimeChunk: 'single',
    },
    module: {
      rules: [
        {
          test:/\.(s*)css$/,
          use: [
            miniCss.loader,
            'css-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: isDev ? 'img/[name]-[hash:4][ext]' : 'img/[hash:8][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: isDev ? 'fonts/[name]-[hash:4][ext]' : 'fonts/[hash:8][ext]'
          }
        },
        {
          test: /\.html$/i,
          use: [
            'html-loader',
            {
              loader: 'posthtml-loader',
              options: {
                ident: 'posthtml',
                config: {
                  path: 'src/pages/components'
                },
                plugins: [
                  require('posthtml-include')({ encoding: 'utf8' })
                ]
              }
            }
          ]
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        },
        /*{ // replace paths in php file
          test: /\.js$/,
          loader: 'string-replace-loader',
          options: {
            search: '/src/js/formActions/sendToTelegram.php',
            replace: '/php/sendToTelegram.php',
          }
        }*/
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/pages/mainPage.html',
        filename: 'index.html',
        chunks: ['index']
      }),
      /*new HtmlWebpackPlugin({
        template: 'src/pages/page2.html',
        filename: 'pages/page2.html',
        chunks: ['page2']
      }),*/
      new miniCss({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      /*new CopyWebpackPlugin({
        patterns: [
          { from: 'src/js/formActions/sendToTelegram.php', to: 'php/sendToTelegram.php' },
          { from: '.htaccess', to: '.' },
        ],
      }),*/
    ]
  }
};
