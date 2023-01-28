const cache = require('.././../config/cache');

module.exports = async (req, res, next) => {
  const dataExtractor = {
    GET: ({ query: { origin, destination, mode } }) => {
      return { addresses: [origin, destination], mode: mode || 'driving' };
    },
    POST: ({ body: { addresses, mode } }) => {
      return { addresses, mode: mode || 'driving' };
    },
  };

  const { addresses, mode } = dataExtractor[req.method](req);

  const isAddressesAnArrayOfStrings = Array.isArray(addresses) && addresses.every(address => typeof address == 'string');

  if (!isAddressesAnArrayOfStrings) {
    return res.status(400).send({ error: '"addresses" must be an array of strings' });
  }

  const validModes = ['driving', 'walking'];

  if (!validModes.includes(mode)) {
    return res.status(400).send({ error: '"mode" option should be either "driving" or "walking"' });
  }

  //cache
  const formatPostCode = postcode => postcode.replaceAll('-', '');
  const routeKey = addresses.map(formatPostCode).join('/').concat(mode);
  const isCached = await cache.get(routeKey);

  if (isCached) {
    const cachedResponse = isCached;

    return res.send(cachedResponse);
  }

  req.routeKey = routeKey;
  req.routeParameters = { addresses, mode };

  next();
};
