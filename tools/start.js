global.WATCH = true;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */

module.exports = async () => {
  await require('./build')();
  await require('./serve')();

  if (process.env.NODE_ENV !== 'production') {
    require('./browsersync')();
  }
};
