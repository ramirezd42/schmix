'use strict'; // eslint-disable-line strict

const webpack = require('webpack');
const merge = require('lodash/object/merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = process.env.NODE_ENV !== 'production';
const WATCH = global.WATCH === undefined ? false : global.WATCH;
const VERBOSE = true;
const STYLE_LOADER = 'style-loader/useable';

let BASE_CSS_LOADER = 'css-loader';
if (!DEBUG) {
  BASE_CSS_LOADER += 'css-loader?minimize';
}


let GLOBAL_CSS_LOADER = 'css-loader';
let MODULE_CSS_LOADER =
  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

if (!DEBUG) {
  GLOBAL_CSS_LOADER = `${GLOBAL_CSS_LOADER}?minimize`;
  MODULE_CSS_LOADER = `${MODULE_CSS_LOADER}&minimize`;
}

const globalStyleLoader = {
  test: /\.s?css$/,
  exclude: pathStr => pathStr.startsWith(__dirname)
      && ! pathStr.startsWith(`${__dirname}/src/styles/global`),
  loader: ExtractTextPlugin.extract(`${STYLE_LOADER}`, [
    `${GLOBAL_CSS_LOADER}`,
    'resolve-url',
    'sass?sourceMap&outputStyle=expanded'
  ].join('!'))
};

const moduleStyleLoader = {
  test: /\.s?css$/,
  include: pathStr => pathStr.startsWith(`${__dirname}/src`),
  exclude: pathStr => pathStr.startsWith(`${__dirname}/src/styles/global`),
  loader: ExtractTextPlugin.extract(`${STYLE_LOADER}`, [
    `${MODULE_CSS_LOADER}`,
    'resolve-url',
    'sass?sourceMap&outputStyle=expanded'
  ].join('!'))
};

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG
};
const JS_LOADER = {
  test: /\.jsx?$/,
  include: [
    `${__dirname}/src`,
  ],
  loader: 'babel',
  query: {
    cacheDirectory: true,
    presets: ['es2015', 'stage-0', 'react'],
    plugins: ['transform-decorators-legacy',
      ['react-transform', {
        // must be an array of objects
        transforms: [{
          // can be an NPM module name or a local path
          transform: 'react-transform-hmr',
          // see transform docs for "imports" and "locals" dependencies
          imports: ['react'],
          locals: ['module']
        }]
      }]
    ]
  }
};

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    root: [
      `${__dirname}/src`,
      `${__dirname}/node_modules`
    ]
  },

  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.txt$/,
      loader: 'raw-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.(ttf|eot|wav|mp3)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]',
    }]
  },

  postcss: [
    require('postcss-nested')(),
    require('cssnext')(),
    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
  ]
};

const jsBundleName = 'app.js';
const styleBundleName = 'styles.css';

const appConfig = merge({}, config, {
  context: __dirname,
  entry: [
    './src/app.js',
  ],
  output: {
    path: `${__dirname}/build`,
    filename: jsBundleName
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  devServer: {
    contentBase: './build'
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin(merge({}, GLOBALS, { __SERVER__: false })),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
    new ExtractTextPlugin(styleBundleName),
  ],
  module: {
    loaders: [
      JS_LOADER,
      ...config.module.loaders,
      globalStyleLoader,
      moduleStyleLoader,
      { test: /\.(ttf|eot)$/, loader: 'file' }
    ]
  },
});

module.exports = appConfig;
