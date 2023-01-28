const NodeCache = require('node-cache');
const nodeCache = new NodeCache();

const cache = {};

cache.set = (key, value, expirationMs = 5*60*1000) => {
  return nodeCache.set(key, JSON.stringify(value), expirationMs);
};

cache.get = async key => {
  const value = await nodeCache.get(key);

  return value ? JSON.parse(value) : null;
};

module.exports = cache;
