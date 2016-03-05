const logger = require('./lib/logger');

module.exports = async () => {
  logger.log('build');
  await require('./clean')();
  await require('./copy')();
  await require('./bundle')();
};
