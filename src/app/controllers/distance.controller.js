const controller = {};
const { getCluster } = require('../../config/puppeteer');

const cluster = getCluster();

controller.getDistance_POST = async (req, res) => {
  try {
    const { addresses } = req.body;

    const isNotArrayOfStrings = addresses
      .map(address => typeof address)
      .some(type => type !== 'string');

    if (!Array.isArray(addresses) || isNotArrayOfStrings) {
      return res.status(400).send({ error: '"addresses" must be an array of strings' });
    }

    let response = await cluster.execute({ addresses });

    return res.send(response);
  } catch (err) {
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

controller.getDistance_GET = async (req, res) => {
  try {
    let { addressA, addressB } = req.params;

    let response = await cluster.execute({ addresses: [addressA, addressB] });

    return res.send(response);
  } catch (err) {
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

module.exports = controller;
