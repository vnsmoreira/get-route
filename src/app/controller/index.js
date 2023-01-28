const cache = require('../../config/cache');
const getRoute = require('get-route');
const getCepsInfo = require('../../services/viacep');

const getDistanceResponse = async ({ addresses: ceps, mode }) => {
  const promisesArray = await Promise.allSettled([getRoute(ceps, mode), getCepsInfo(ceps)]);

  const [route, cepsInfo] = promisesArray.map(promise => promise.value);

  return route.ok && cepsInfo ? { ...route, cepsInfo } : null;
};

const distanceController = async (req, res) => {
  try {
    const distanceResponse = await getDistanceResponse(req.routeParameters);

    if (!distanceResponse) {
      return res.status(400).send({ error: 'Could not retrieve the distance. Be sure to check the postcodes.' });
    }

    res.send(distanceResponse);

    return cache.set(req.routeKey, distanceResponse);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

module.exports = distanceController;
