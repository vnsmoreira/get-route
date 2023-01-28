const cache = require('.././../config/cache');
const { isArrayOfCeps, isModeValid } = require('../../validation');

module.exports = async (req, res, next) => {
  const dataExtractor = {
    GET: ({ query: { origin, destination, mode } }) => {
      return { ceps: [origin, destination], mode: mode || 'driving' };
    },
    POST: ({ body: { ceps, mode } }) => {
      return { ceps, mode: mode || 'driving' };
    },
  };

  const { ceps, mode } = dataExtractor[req.method](req);

  if (!isArrayOfCeps(ceps)) {
    return res.status(400).send({ error: 'Array de CEPs inválido! \nLembre-se de passar uma lista (Array) de CEPs (string).' });
  }

  if (!isModeValid(mode)) {
    return res.status(400).send({ error: 'Modo inválido! \nModos válidos: "driving" ou "walking".' });
  }

  const cepsArray = ceps.map(cep => cep.replace('-', ''));

  //cache
  const routeKey = cepsArray.join('/').concat('-', mode);
  const isCached = await cache.get(routeKey);

  if (isCached) {
    const cachedResponse = isCached;

    return res.send(cachedResponse);
  }

  req.routeKey = routeKey;
  req.routeParameters = { ceps: cepsArray, mode };

  next();
};
