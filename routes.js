const express = require('express');
const router = express.Router();
const { Cluster } = require('puppeteer-cluster');
const { puppeteerOptions } = require('./puppeteer-utils');
const distance = require('./utils');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4,
    puppeteerOptions,
  });

  router.get('/', (req, res) => {
    res.send(
      `<h1>How to use it: <a href="https://github.com/vnsmoreira/api-get-distance">API Documentation</a></h1>`
    );
  });

  router.post('/', async (req, res) => {
    try {
      let { origins, destinations, region } = req.body;

      let response = await cluster.execute(
        { origins, destinations, region },
        distance.distanceBetweenMultipleAdressess
      );

      res.send(response);
    } catch (err) {
      res.send({ distance: `${err}` });
    }
  });

  router.get('/:origin/:destination', async (req, res) => {
    try {
      let { origin, destination } = req.params;
      let response = await cluster.execute(
        { origin, destination },
        distance.distanceBetweenTwoAdressess
      );

      res.send(response);
    } catch (err) {
      res.send({ distance: `${err}` });
    }
  });
})();

module.exports = router;
