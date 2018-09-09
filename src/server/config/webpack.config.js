const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

dotenvExpand(dotenv.config());

const enableHMR = (process.env.ENABLE_WEBPACK_HMR === 'true');
const envVars = ['NODE_ENV', 'ENABLE_WEBPACK_HMR'];

let outputFilename = 'js/[name].min.js';

const hmrLibs = [
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  'react-hot-loader/patch',
];

const entry = {
  app: [],
};

const babelPlugins = [
  'transform-react-jsx',
  'transform-runtime',
  'transform-es2015-spread',
  'transform-object-rest-spread',
];

let plugins = [
  new webpack.EnvironmentPlugin(envVars),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new MinifyPlugin(),
  new CompressionPlugin(),
];

if (enableHMR) {
  outputFilename = 'js/[name].js';

  entry.app = entry.app.concat(hmrLibs);

  babelPlugins.push('react-hot-loader/babel');

  plugins = [
    new webpack.EnvironmentPlugin(envVars),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ];
}

entry.app.push('./src/client/AppWrapper.js');

const clientConfig = {
  target: 'web',
  entry,
  output: {
    path: path.resolve(__dirname, './dist/app'),
    filename: outputFilename,
    publicPath: '/app/',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', {
              targets: {
                browsers: [
                  'last 2 versions',
                ],
              },
              modules: false,
            }],
            'react',
          ],
          plugins: babelPlugins,
        },
      },
    }],
  },
  plugins,
};

module.exports = [clientConfig];
