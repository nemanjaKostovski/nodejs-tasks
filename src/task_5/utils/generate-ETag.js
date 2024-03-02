const crypto = require('crypto');

module.exports = function generateETag(data) {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
};
