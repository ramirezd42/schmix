import path from 'path';
import replace from 'replace';
import copy from './lib/copy';
import watch from './lib/watch';
import logger from './lib/logger';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
export default async () => {
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
