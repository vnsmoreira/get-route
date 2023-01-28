const cache = require('../../config/cache');
const getRoute = require('get-route');
const getCepsInfo = require('../../services/viacep');

const getRouteResponse = async ({ ceps, mode }) => {
  const promisesArray = await Promise.allSettled([getRoute(ceps, mode), getCepsInfo(ceps)]);

  const [route, info] = promisesArray.map(promise => promise.value);

  return route.ok && info ? { ...route, info } : null;
};

const routeController = async (req, res) => {
  try {
    const routeResponse = await getRouteResponse(req.routeParameters);

    if (!routeResponse) throw new Error();

    res.send(routeResponse);

    return cache.set(req.routeKey, routeResponse);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Não foi possível obter a rota! \nVerifique se os CEPs são válidos.' });
  }
};

module.exports = routeController;
