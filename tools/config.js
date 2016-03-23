const path = require('path');
const webpack = require('webpack');
const merge = require('lodash/object/merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const util = require('util');

const DEBUG = process.env.NODE_ENV !== 'production';
const WATCH = global.WATCH === undefined ? false : global.WATCH;
const VERBOSE = process.argv.includes('--verbose');
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
  test: /\.scss$/,
  exclude: pathStr => pathStr.startsWith(path.resolve(__dirname, '..'))
      && ! pathStr.startsWith(path.resolve(__dirname, '../src/styles/global')),
  loader: ExtractTextPlugin.extract(`${STYLE_LOADER}`, [
    `${GLOBAL_CSS_LOADER}`,
    'resolve-url',
    'sass?sourceMap&outputStyle=expanded'
  ].join('!'))
};

const moduleStyleLoader = {
  test: /\.scss$/,
  include: pathStr => pathStr.startsWith(path.resolve(__dirname, '../src')),
  exclude: pathStr => pathStr.startsWith(path.resolve(__dirname, '../src/styles/global')),
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
    path.resolve(__dirname, '../src'),
  ],
  loader: 'babel',
  query: {
    cacheDirectory: true,
    presets: ['es2015', 'stage-0', 'react'],
    plugins: ['transform-decorators-legacy']
  }
};

// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

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
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
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
    }]
  },

  postcss: [
    require('postcss-nested')(),
    require('cssnext')(),
    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
  ]
};

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

const jsBundleName = DEBUG ? 'app.js' : util.format('app.%s.js', pkg.version);
const styleBundleName = DEBUG ? 'styles.css' : util.format('styles.%s.css', pkg.version);

const appConfig = merge({}, config, {
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: jsBundleName
  },
  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
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
      WATCH ? {
        ...JS_LOADER,
        query: {
          plugins: [
            // must be an array with options object as second item
            ['react-transform', {
              // must be an array of objects
              transforms: [{
                // can be an NPM module name or a local path
                transform: 'react-transform-hmr',
                // see transform docs for "imports" and "locals" dependencies
                imports: ['react'],
                locals: ['module']
              }]
              // by default we only look for `React.createClass` (and ES6 classes)
              // but you can tell the plugin to look for different component factories:
              // factoryMethods: ["React.createClass", "createClass"]
            }]
          ]
          // Wraps all React components into arbitrary transforms
          // https://github.com/gaearon/babel-plugin-react-transform
        },
      } : JS_LOADER,
      ...config.module.loaders,
      globalStyleLoader,
      moduleStyleLoader,
      { test: /\.(ttf|eot)$/, loader: 'file' }
    ]
  },
  sassResources: [
    './src/styles/variables.scss',
    './src/styles/global.scss'
  ],
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = merge({}, config, {
  entry: './src/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: [
    (context, request, cb) => {
      const isExternal =
        request.match(/^[a-z][a-z\/\.\-0-9]*$/i);
      cb(null, Boolean(isExternal));
    }
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  devtool: 'source-map',
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin(merge({}, GLOBALS, { __SERVER__: true })),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
    new ExtractTextPlugin(styleBundleName)
  ],
  module: {
    loaders: [
      JS_LOADER,
      ...config.module.loaders,
      globalStyleLoader,
      moduleStyleLoader
    ]
  },
  sassResources: [
    './src/styles/variables.scss',
    './src/styles/global.scss'
  ],
});

module.exports = [appConfig, serverConfig];
