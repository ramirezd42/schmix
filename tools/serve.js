/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const path = require('path');
const cp = require('child_process');
const watch = require('./lib/watch');
const logger = require('./lib/logger');

/**
 * Launches Node.js/Express web server in a separate (forked) process.
 */
module.exports = () => new Promise((resolve, reject) => {
  logger.log('serve');

  function start() {
    const server = cp.fork(path.join(__dirname, '../build/server.js'), {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false
    });

    server.once('message', message => {
      if (message.match(/^online$/)) {
        resolve();
      }
    });
    server.once('error', err => reject(err));
    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  }

  let server = start();

  if (global.WATCH) {
    watch('build/server.js').then(watcher => {
      watcher.on('changed', () => {
        server.kill('SIGTERM');
        server = start();
      });
    });
  }
});
