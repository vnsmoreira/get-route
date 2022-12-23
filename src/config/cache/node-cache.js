import NodeCache from 'node-cache';
const nodeCache = new NodeCache();

const cache = {};

cache.set = (key, value, expirationMs = 86400) => {
  return nodeCache.set(key, JSON.stringify(value), expirationMs);
};

cache.get = async key => {
  const value = await nodeCache.get(key);

  return value ? JSON.parse(value) : null;
};

export default cache;
