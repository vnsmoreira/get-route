// npm i ioredis
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

const cache = {};

cache.set = (key, value, expirationMs = 5 * 60 * 1000) => {
  return redis.set(key, JSON.stringify(value), 'EX', expirationMs);
};

cache.get = async key => {
  const value = await redis.get(key);

  return value ? JSON.parse(value) : null;
};

module.exports = cache;
