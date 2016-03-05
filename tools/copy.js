const path = require('path');
const replace = require('replace');
const copy = require('./lib/copy');
const watch = require('./lib/watch');
const logger = require('./lib/logger');

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
module.exports = async () => {
  logger.log('copy');
  await Promise.all([
    // Static files
    copy('src/public', 'build/public'),

    // Website and email templates
    // copy('src/templates', 'build/templates'),

    copy('package.json', 'build/package.json')
  ])
  .catch(e => logger.log(e));

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false
  });

  if (global.WATCH) {
    const watcher = await watch('src/content/**/*.*');
    watcher.on('changed', async (file) => {
      const _file = file.substr(path.join(__dirname, '../src/content/').length);
      await copy(`src/content/${_file}`, `build/content/${_file}`);
    });
  }
};
