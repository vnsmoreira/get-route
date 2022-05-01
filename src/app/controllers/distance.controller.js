const { getCluster } = require('../../config/puppeteer');
const getCepsInfo = require('../../services/viacep');

const controller = {};

const cluster = getCluster();
const getDistance = async (addresses, mode) => await cluster.execute({ addresses, mode });

controller.getDistance_POST = async (req, res) => {
  try {
    const { addresses, mode } = req.body;

    const promisesArray = await Promise.allSettled([
      getDistance(addresses, mode),
      getCepsInfo(addresses),
    ]);

    const [distance, cepsInfo] = promisesArray.map(promise => promise.value);

    return res.send({ distance, cepsInfo });
  } catch (err) {
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

controller.getDistance_GET = async (req, res) => {
  try {
    let { addressA, addressB } = req.params;
    const { mode } = req.query;

    const addresses = [addressA, addressB];

    const promisesArray = await Promise.allSettled([
      getDistance(addresses, mode),
      getCepsInfo(addresses),
    ]);

    const [distance, cepsInfo] = promisesArray.map(promise => promise.value);

    return res.send({ distance, cepsInfo });
  } catch (err) {
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

module.exports = controller;
