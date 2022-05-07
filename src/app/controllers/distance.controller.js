const { getCluster } = require('../../config/puppeteer');
const getCepsInfo = require('../../services/viacep');
const cache = require('../../config/cache');
const _ = require('../utils');

const controller = {};

const cluster = getCluster();
const getDistance = async (addresses, mode) => await cluster.execute({ addresses, mode });

controller.getDistance_POST = async (req, res) => {
  try {
    const { addresses, mode } = req.body;

    const routeKey = addresses.map(_.formatPostCode).join('/');
    const isCached = await cache.get(routeKey);

    if (isCached) {
      const { distance, cepsInfo } = isCached;

      return res.send({ distance, cepsInfo });
    }

    const promisesArray = await Promise.allSettled([
      getDistance(addresses, mode),
      getCepsInfo(addresses),
    ]);

    const [{ distance }, cepsInfo] = promisesArray.map(promise => promise.value);

    if (!distance) {
      return res
        .status(400)
        .send({ error: 'Could not get the distance, be sure to check the postcodes.' });
    }

    res.send({ distance, cepsInfo });

    return cache.set(routeKey, { distance, cepsInfo }, 86400);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

controller.getDistance_GET = async (req, res) => {
  try {
    let { addressA, addressB } = req.params;
    const { mode } = req.query;

    const addresses = [addressA, addressB];

    const routeKey = addresses.map(_.formatPostCode).join('/');
    const isCached = await cache.get(routeKey);

    if (isCached) {
      const { distance, cepsInfo } = isCached;

      return res.send({ distance, cepsInfo });
    }

    const promisesArray = await Promise.allSettled([
      getDistance(addresses, mode),
      getCepsInfo(addresses),
    ]);

    const [{ distance }, cepsInfo] = promisesArray.map(promise => promise.value);

    if (!distance) {
      return res
        .status(400)
        .send({ error: 'Could not get the distance, be sure to check the postcodes.' });
    }

    res.send({ distance, cepsInfo });

    return cache.set(routeKey, { distance, cepsInfo }, 86400);
  } catch (err) {
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

module.exports = controller;
