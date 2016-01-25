import logger from './lib/logger';

export default async () => {
  logger.log('build');
  await require('./clean')();
  await require('./copy')();
  await require('./bundle')();
};
