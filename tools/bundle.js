const webpack = require('webpack');
const config = require('./config');
const logger = require('./lib/logger');

/**
 * Bundles JavaScript, CSS and images into one or more packages
 * ready to be used in a browser.
 */
module.exports = async () => new Promise((resolve, reject) => {
  logger.log('bundle');
  const bundler = webpack(config);
  let bundlerRunCount = 0;

  function bundle(err, stats) {
    if (err) {
      return reject(err);
    }

    logger.log(stats.toString(config[0].stats));

    if (++bundlerRunCount === (global.watch ? config.length : 1)) {
      return resolve();
    }
  }

  if (global.WATCH) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});
