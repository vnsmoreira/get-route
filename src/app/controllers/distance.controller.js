const { getCluster } = require('../../config/puppeteer');

const controller = {};

const cluster = getCluster();

controller.getDistance_POST = async (req, res) => {
  try {
    const { addresses, mode } = req.body;

    const isNotArrayOfStrings = addresses
      .map(address => typeof address)
      .some(type => type !== 'string');

    if (!Array.isArray(addresses) || isNotArrayOfStrings) {
      return res.status(400).send({ error: '"addresses" must be an array of strings' });
    }

    if (mode !== 'driving' && mode !== 'walking' && mode !== undefined) {
      return res
        .status(400)
        .send({ error: '"mode" option should be either "driving" or "walking"' });
    }

    let response = await cluster.execute({ addresses, mode });

    return res.send(response);
  } catch (err) {
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

controller.getDistance_GET = async (req, res) => {
  try {
    let { addressA, addressB } = req.params;
    const { mode } = req.query;

    const addresses = [addressA, addressB];

    const isNotArrayOfStrings = addresses
      .map(address => typeof address)
      .some(type => type !== 'string');

    if (!Array.isArray(addresses) || isNotArrayOfStrings) {
      return res.status(400).send({ error: '"addresses" must be an array of strings' });
    }

    if (mode !== 'driving' && mode !== 'walking' && mode !== undefined) {
      return res
        .status(400)
        .send({ error: '"mode" option should be either "driving" or "walking"' });
    }

    let response = await cluster.execute({ addresses, mode });

    return res.send(response);
  } catch (err) {
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

module.exports = controller;
