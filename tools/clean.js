const del = require('del');
const fs = require('./lib/fs');

/**
 * Cleans up the output (build) directory.
 */
module.exports = async () => {
  await del(['.tmp', 'build/*', '!build/.git'], { dot: true });
  await fs.makeDir('build/public');
};
