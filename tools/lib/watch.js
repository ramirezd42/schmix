const gaze = require('gaze');

module.exports = (pattern) => new Promise((resolve, reject) => {
  gaze(pattern, (err, watcher) => err ? reject(err) : resolve(watcher));
});
