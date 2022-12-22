/* import cache from '#cache'; */

export default async (req, res, next) => {
  const dataExtractor = {
    GET: ({ query }) => ({ addresses: [query.addressA, query.addressB], mode: query.mode }),
    POST: ({ body }) => ({ addresses: body.addresses, mode: body.mode }),
  };

  const extractedData = dataExtractor[req.method](req);
  const { addresses, mode } = extractedData;

  const isArrayOfStrings = addresses.every(address => typeof address == 'string');

  if (!Array.isArray(addresses) || !isArrayOfStrings) {
    return res.status(400).send({ error: '"addresses" must be an array of strings' });
  }

  if (mode !== 'driving' && mode !== 'walking' && mode !== undefined) {
    return res.status(400).send({ error: '"mode" option should be either "driving" or "walking"' });
  }
  
  //cache
  /* const formatPostCode = postcode => postcode.replaceAll('-', '');
  const routeKey = addresses.map(formatPostCode).join('/');
  const isCached = await cache.get(routeKey);

  if (isCached) {
    const { distance, cepsInfo } = isCached;

    return res.send({ distance, cepsInfo });
  } 

  req.routeKey = routeKey; */

  req.routeParameters = extractedData;

  next();
};
